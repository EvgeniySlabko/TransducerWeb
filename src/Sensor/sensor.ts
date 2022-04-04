import * as Defs from './SensorDefinitions'; 
import { SimpleEventDispatcher } from "strongly-typed-events";
import SerialBufferedWorker from "../serialBuffer";
import { SensorSK } from './SensorInfoParser/sensorInfoParser';
import { sorterDes } from '../../dist/bundle';

export class Sensor {

    public serialWorker: SerialBufferedWorker;

    private _onTorqueData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onSpeedData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onTmpData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onReadingError = new SimpleEventDispatcher();

    private baseTime: number | undefined = undefined;

    private commandHandlers : Map<number, any> = new Map();

    constructor(worker: SerialBufferedWorker) {
        if (worker == null) throw "Worker is null";
        this.serialWorker = worker;
    }

    //Events 
    public get onData() {return this._onTorqueData.asEvent();}

    public get onTmp() {return this._onTmpData.asEvent();}

    public get onSpeed() {return this._onSpeedData.asEvent();}

    public get onError() {return this._onReadingError.asEvent();}


    public async SynchronizeCurrentTime()
    {
        this.commandHandlers.set(Defs.READ_HOLDING_REGISTERS, (data: number[]) => 
        {
            this.baseTime = this.CalculateTime(data[0], data[1]);
        });

        this.SendMessage(Defs.READ_HOLDING_REGISTERS, Defs.TIME_LOW, 2);
    }

    public async GetSkInfo(handler: (message: SensorSK) => void) : Promise<void>
    {
        await this.SendMessage(Defs.REPORT_SLAVE_ID, 0, 0);
        this.commandHandlers.set(Defs.REPORT_SLAVE_ID, (data: Uint8Array) => {
            var idView = new DataView(data.buffer);
            var sk = new SensorSK()
            Object.assign(sk.ID, data.slice(0, 3));
            sk.Temperature = idView.getUint8(3);
            sk.Korrect = idView.getUint8(4);
            sk.NumberOfTeeth = idView.getInt16(5, true);
            sk.MaxSpeed = idView.getUint8(7);
            Object.assign(sk.DateOfVerification, data.slice(8, 3));
            Object.assign(sk.SKInfo, data.slice(11));
            handler(sk);
        });
    }

    public async StartReading() {
        if (!this.serialWorker.baseWorker.IsConnected)
            await this.serialWorker.baseWorker.OpenPort();

        this.SendMessage(Defs.FORCE_SINGLE_COIL, Defs.START_MEASURING, Defs.COIL_ON_VALUE);
        
        
    }

    public async StartStreaming() {
        await this.SendMessage(Defs.FORCE_SINGLE_COIL, Defs.START_STREAMING, Defs.COIL_ON_VALUE);
        this.processbytes();
    }

    private async processbytes() {
        var nextIteration = async () => await this.processbytes();
        let dataType: number | undefined = (await this.serialWorker.Read(1))[0];

        //console.log("Type : ", dataType);
        var handeled = await this.ProcessDecoderCommands(dataType);
        if (handeled) {
            nextIteration();
            return;
        }

        handeled = await this.ProcessStreamingData(dataType);
        if (!handeled) {
            await this.ReadingErrorHandler();
            return;
        }

        nextIteration();
    }

    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case Defs.FORCE_SINGLE_COIL:
                {
                    var data = await this.serialWorker.Read(4);
                    //console.log("Process (5): ", data);
                    return true;
                }
            case Defs.READ_HOLDING_REGISTERS:
                {
                    var bytes = (await this.serialWorker.Read(1))[0];
                    var data = await this.serialWorker.Read(bytes);
                    var view = new DataView(data.buffer);
                    var registers : number[] = [];
                    for (let i = 0; i < data.length/2; i++) {
                        registers.push(view.getUint16(i * 2, true));
                    }
                    
                    this.DispatchCommandListener(Defs.READ_HOLDING_REGISTERS, registers);
                    return true;
                }
                case Defs.REPORT_SLAVE_ID:
                {
                    var idBytes = await this.serialWorker.Read(60);
                    this.DispatchCommandListener(Defs.REPORT_SLAVE_ID, idBytes);
                }
            default:
                return false;
        }
    }

    private DispatchCommandListener(command: number, data: any) : void
    {
        if (this.commandHandlers.has(command))
        {
            this.commandHandlers.get(command)(data);
            this.commandHandlers.delete(command);
        }
    }

    private CalculateTime(timeL: number, timeH: number):  number
    {
        return (timeL + (timeH << 16)) / 62500;
    }

    private async ProcessStreamingData(command: number): Promise<boolean> {
        var size, timeL, timeH;
        let commonData = await this.serialWorker.Read(6);
        //console.log("Process C: ", commonData);
        const view = new DataView(commonData.buffer);
        size = view.getUint16(0, true);
        timeL = view.getUint16(2, true);
        timeH = view.getUint16(4, true);
        var calculatedTime = this.CalculateTime(timeL, timeH);
        switch (command) {
            case Defs.packageType.torque:
                var datatorque = await this.serialWorker.Read(size - 4);
                //console.log("seize", size);
                //console.log("Process T: ", datatorque);
                const torqView = new DataView(datatorque.buffer);
                var bufferCount = torqView.getUint8(0);
                var dataCount = torqView.getUint8(1);
                for (let i = 0; i < dataCount; i++) {
                    var value = torqView.getFloat32((2 + (i * 4)), true);
                    var dataArgs: Defs.dataEventArgs = {
                        data: value,
                        time: calculatedTime + (i * 0.16),
                    }
                    if (this.baseTime != undefined) this._onTorqueData.dispatch(dataArgs);
                }

                break;

            case Defs.packageType.speed:
                var dataSpeed = await this.serialWorker.Read(size - 4);
                //console.log("Process S: ", dataSpeed);
                const speedView = new DataView(dataSpeed.buffer);
                var speed = speedView.getFloat32(0, true);
                var dataArgs: Defs.dataEventArgs = {
                    data: speed,
                    time: calculatedTime,
                }
                if (this.baseTime != undefined) this._onSpeedData.dispatch(dataArgs);
                //console.log(dataSpeed);
                break;

            case Defs.packageType.temperatue:
                var dataTemperature = await this.serialWorker.Read(size - 4);
                const temperatureView = new DataView(dataTemperature.buffer);
                var temperature = temperatureView.getFloat32(0, true);
                var tmpArgs: Defs.dataEventArgs = {
                    data: temperature,
                    time: calculatedTime,
                }
                if (this.baseTime != undefined) this._onTmpData.dispatch(tmpArgs);
                break;

            case Defs.packageType.msg:
                var dataMsg = await this.serialWorker.Read(size - 4);
                const msgView = new DataView(dataMsg.buffer);
                var msgCount = msgView.getUint16(0, true);
                //console.log("Process M: ",dataMsg);
                for (let i = 0; i < msgCount; i++) {
                    var msg = msgView.getUint16(2 + (i * 2));
                }
                break;

            default:
                return false;
        }

        return true;
    }

    public async ReadingErrorHandler() {
        console.log('Sensor reading error');
        await this.serialWorker.Close();
        this._onReadingError.dispatch("Reading error");
    }

    public async StopStreaming() {
        await this.SendMessage(Defs.FORCE_SINGLE_COIL, Defs.START_STREAMING, Defs.COIL_OFF_VALUE);
    }

    private async SendMessage(command: number, addres: number, value: number) {
        var reqest = new Uint8Array(5);
        reqest[0] = command;
        reqest[1] = addres & 0xFF;
        reqest[2] = (addres >> 8) & 0xFF;
        reqest[3] = value & 0xFF;
        reqest[4] = (value >> 8) & 0xFF;

        await this.serialWorker.Write(reqest);
        //console.log("reqest: ", reqest);
    }
}

export default Sensor;

