import * as Defs from './SensorDefinitions'; 
import { SimpleEventDispatcher } from "strongly-typed-events";
import SerialBufferedWorker from "../IO/serialBuffer";
import { SensorSK } from './SensorDefinitions';


class Command
{
    public command: number = 0;
    public address: number | undefined = 0;
    public value: number | undefined = 0;
}

export class Sensor {

    public serialWorker: SerialBufferedWorker;

    private _onTorqueData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onSpeedData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onTmpData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onReadingError = new SimpleEventDispatcher<string>();

    private baseTime: number | undefined = undefined;

    private commandHandlers : Map<number, any> = new Map();

    private timeout: number = 10000; // Максимальное время ожидание ответа на командуж
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
        var command = new Command();
        command.command = Defs.READ_HOLDING_REGISTERS;
        command.address = Defs.TIME_LOW;
        command.value = 2;
        var regs = await this.SendRequesAndWaitResponse<number[]>(command);
        if (regs.length != 2)
        {
            throw "Invalid time synchronize";
        }
        
        this.baseTime = this.CalculateTime(regs[0], regs[1]);
    }

    public async GetHoldingRegisters() : Promise<Defs.HoldingRegisters>
    {
        //await this.SendMessage(Defs.READ_HOLDING_REGISTERS, 0, 5);
        var command = new Command();
        command.command = Defs.READ_HOLDING_REGISTERS;
        command.address = 0;
        command.value = 5;
        var registers = await this.SendRequesAndWaitResponse<number[]>(command);
        var holdingRegisters = new Defs.HoldingRegisters(registers);
        return holdingRegisters;
    }

    public async GetSkInfo() : Promise<SensorSK>
    {
        var command = new Command();
        command.command = Defs.REPORT_SLAVE_ID;
        command.address = undefined;
        command.value = undefined;

        var data = await this.SendRequesAndWaitResponse<Uint8Array>(command);

        var idView = new DataView(data.buffer);
        var sk = new SensorSK()
        Object.assign(sk.ID, data.slice(0, 3));
        sk.Temperature = idView.getUint8(3);
        sk.Korrect = idView.getUint8(4);
        sk.NumberOfTeeth = idView.getInt16(5, true);
        sk.MaxSpeed = idView.getUint8(7);
        Object.assign(sk.DateOfVerification, data.slice(8, 3));
        Object.assign(sk.SKInfo, data.slice(11));

        return sk;
    }

    public async Initialize() {
        if (!this.serialWorker.baseWorker.IsConnected)
            await this.serialWorker.baseWorker.OpenPort();

        this.processbytes();

        var command = new Command();
        command.command = Defs.FORCE_SINGLE_COIL;
        command.address = Defs.START_MEASURING;
        command.value = Defs.COIL_ON_VALUE;
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async StartStreaming() {
        var command = new Command();
        command.command = Defs.FORCE_SINGLE_COIL;
        command.address = Defs.START_STREAMING;
        command.value = Defs.COIL_ON_VALUE;

        await this.SendRequesAndWaitResponse<void>(command);
    }

    private async processbytes() {
        try
        {
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
        catch{
            console.log("re11d");
        }
    }

    // Регистрируем обработчи. Задаем время ожидания команды. Если ответ пришел в течении этого времени - resolve
    private async SendRequesAndWaitResponse<T>(command: Command) : Promise<T>
    {
        return new Promise<T>(async (resolve, reject) => {
    
            this.commandHandlers.set(command.command, (data: T) =>
            {
                clearInterval(interval);
                resolve(data);
            });

            var interval = setTimeout(function() {
                reject("Timeout Error. There is no data from sensor!");
                }, this.timeout);

            try
            {
                await this.SendMessage(command);
            }
            catch(ex)
            {
                clearInterval(interval);
                reject(ex);
            }
        });
    }
    
    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case Defs.FORCE_SINGLE_COIL:
                {
                    var data = await this.serialWorker.Read(4);
                    this.DispatchCommandListener(Defs.FORCE_SINGLE_COIL, data);
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
                    return true;
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
        var command = new Command();
        command.command = Defs.FORCE_SINGLE_COIL;
        command.address = Defs.START_STREAMING;
        command.value = Defs.COIL_OFF_VALUE;

        await this.SendRequesAndWaitResponse<void>(command);
    }

    private async SendMessage(command: Command) {

        //var length : number = 1 + ((command.address == undefined && command.value == undefined) ? 0 : 4);

        if (command.address != undefined && command.value != undefined)
        {
            let reqest: Uint8Array = new Uint8Array(5);
            reqest[0] = command.command;
            reqest[1] = (command.address & 0xFF);
            reqest[2] = ((command.address >> 8) & 0xFF);
            reqest[3] = (command.value & 0xFF);
            reqest[4] = ((command.value >> 8) & 0xFF);
            await this.serialWorker.Write(reqest);
        }
        else
        {
            let reqest: Uint8Array = new Uint8Array(1);
            reqest[0] = command.command;
            await this.serialWorker.Write(reqest);
        }
        //console.log("reqest: ", reqest);
    }
}

export default Sensor;

