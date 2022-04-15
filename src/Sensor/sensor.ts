import * as Defs from './SensorDefinitions'; 
import { SimpleEventDispatcher } from "strongly-typed-events";
import SerialBufferedWorker from "../IO/serialBuffer";
import { SensorSK } from './SensorDefinitions';
import { DefaultCommand, ISensorCommand, MultipleCommand, SingleCommand } from './SensorCommand/SensorCommand';

export class Sensor {

    private baseFrequency: number = 5000;
    private decoderClock: number = 62500;
    public serialWorker: SerialBufferedWorker;

    private _onTorqueData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onSpeedData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onTmpData = new SimpleEventDispatcher<Defs.dataEventArgs>();
    private _onReadingError = new SimpleEventDispatcher<string>();

    private baseTime: number | undefined = undefined;

    private commandHandlers : Map<number, any> = new Map();

    private timeout: number = 1000; // Максимальное время ожидание ответа на командуж
    constructor(worker: SerialBufferedWorker) {
        if (worker == null) throw "Worker is null";
        this.serialWorker = worker;
    }

    private currentAvgFactor: number | undefined;
    private dt: number | undefined; // тиков часов декодера между 2 соседними измерениями осню изм вел.

    //Events 
    public get onData() {return this._onTorqueData.asEvent();}

    public get onTmp() {return this._onTmpData.asEvent();}

    public get onSpeed() {return this._onSpeedData.asEvent();}

    public get onError() {return this._onReadingError.asEvent();}

    public async GetHoldingRegisters() : Promise<Defs.HoldingRegisters>
    {
        var command = new DefaultCommand(Defs.READ_HOLDING_REGISTERS, 0, 5);
        var registers = await this.SendRequesAndWaitResponse<number[]>(command);
        var holdingRegisters = new Defs.HoldingRegisters(registers);
        return holdingRegisters;
    }

    public async GetSkInfo() : Promise<SensorSK>
    {
        var command = new SingleCommand(Defs.REPORT_SLAVE_ID);

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
            
    }

    public async StopMeasuring(waitAnswer: boolean = true)
    {
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL, Defs.START_MEASURING, Defs.COIL_OFF_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            await this.SendMessage(command);
        
    }

    public async StartMeasuring(waitAnswer: boolean = true)
    {
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL, Defs.START_MEASURING, Defs.COIL_ON_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            await this.SendMessage(command);
    }

    public async StartStreaming() {

        //await this.SetAvgRatio(1); //
        var holdingRegisters = await this.GetHoldingRegisters();
        this.currentAvgFactor = holdingRegisters.AverageRatio;
        this.dt = this.decoderClock / this.baseFrequency;
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL, Defs.START_STREAMING, Defs.COIL_ON_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    private async processbytes() {
        var dataType: number ;
    try
    {
        var nextIteration = async () => await this.processbytes();
        dataType = (await this.serialWorker.Read(1))[0];

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
        catch (ex){
            console.log(ex);
        }
    }

    // Регистрируем обработчи. Задаем время ожидания команды. Если ответ пришел в течении этого времени - resolve
    private async SendRequesAndWaitResponse<T>(command: ISensorCommand) : Promise<T>
    {
        return new Promise<T>(async (resolve, reject) => {
    
            this.commandHandlers.set(command.Command, (data: T) =>
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
                    //console.log(data);
                    this.DispatchCommandListener(Defs.FORCE_SINGLE_COIL, data);
                    return true;
                }
            case Defs.PRESET_SINGLE_REGISTER:
            {
                var data = await this.serialWorker.Read(4);
                //console.log(data);
                this.DispatchCommandListener(Defs.PRESET_SINGLE_REGISTER, data);
                return true;
            }
            case Defs.PRESET_MULTIPLE_REGISTERS:
            {
                var data = await this.serialWorker.Read(4);
                var view = new DataView(data.buffer);
                var registers : number[] = [];
                for (let i = 0; i < data.length/2; i++) {
                    registers.push(view.getUint16(i * 2, true));
                }
                //console.log(data);
                this.DispatchCommandListener(Defs.PRESET_MULTIPLE_REGISTERS, data);
                return true;
            }
            case Defs.READ_HOLDING_REGISTERS:
                {
                    var bytes = (await this.serialWorker.Read(1))[0];
                    var data = await this.serialWorker.Read(bytes);
                    //console.log(bytes);
                    //console.log(data);
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
        return (timeL + (timeH << 16));
    }

    private async SetAvgRatio(avgRatio: number)
    {
        var command = new DefaultCommand(Defs.PRESET_SINGLE_REGISTER, Defs.AVG_RATIO, 1);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async SetComputerConnection()
    {
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL,Defs.COMPUTER_CONNECTION, Defs.COIL_ON_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async UnsetComputerConnection()
    {
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL,Defs.COMPUTER_CONNECTION, Defs.COIL_OFF_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }
    
    public async ReadingErrorHandler() {
        console.log('Sensor reading error');
        await this.serialWorker.Close();
        this._onReadingError.dispatch("Reading error");
    }
    
    public async SetT0()
    {
        var command = new MultipleCommand(Defs.PRESET_MULTIPLE_REGISTERS, 3, new Uint8Array([0, 0]));
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async CloseConnection()
    {
        await this.serialWorker.Close();
    }

    public async StopStreaming(waitAnswer: boolean = true) {
        var command = new DefaultCommand(Defs.FORCE_SINGLE_COIL, Defs.START_STREAMING, Defs.COIL_OFF_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            this.SendMessage(command);
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
                    
                    var torqArgs: Defs.dataEventArgs = {
                        data: new Array(dataCount),
                        time: new Array(dataCount),
                    }
                    
                    for (let i = 0; i < dataCount; i++) {
                        var value = torqView.getFloat32((2 + (i * 4)), true);
                        
                        torqArgs.data[i] = value;
                        torqArgs.time[i] = calculatedTime + (i * 12.5);
                    }

                    this._onTorqueData.dispatch(torqArgs);

                    /*
                    for (let i = 0; i < dataCount; i++) {
                        var value = torqView.getFloat32((2 + (i * 4)), true);
                        if (this.baseTime == undefined) continue;
                        
                        this.values[this.count] = value;
                        this.times[this.count] = (calculatedTime - this.baseTime) + (i * 12.5);
                        this.count++
                    }
                    
                    if (this.count >= 500)
                    {
                        var valuesCopy = this.values.slice(0, this.count);
                        var timesCopy = this.times.slice(0, this.count)
                        
                        var dataArgs: Defs.dataEventArgs = {
                            data: valuesCopy,
                            time: timesCopy
                        }
                        
                        
                        this.count = 0;
                    }
                    */
                   
                    break;
    
                case Defs.packageType.speed:
                    var dataSpeed = await this.serialWorker.Read(size - 4);
                    //console.log("Process S: ", dataSpeed);
                    const speedView = new DataView(dataSpeed.buffer);
                    var speed = speedView.getFloat32(0, true);
                    if (this.baseTime == undefined) break;
                    var dataArgs: Defs.dataEventArgs = {
                        data: [speed],
                        time: [(calculatedTime - this.baseTime)],
                    }
    
                    this._onSpeedData.dispatch(dataArgs);
                    //console.log(dataSpeed);
                    break;
    
                case Defs.packageType.temperatue:
                    var dataTemperature = await this.serialWorker.Read(size - 4);
                    const temperatureView = new DataView(dataTemperature.buffer);
                    var temperature = temperatureView.getFloat32(0, true);
                    if (this.baseTime == undefined) break;
                    var tmpArgs: Defs.dataEventArgs = {
                        data: [temperature],
                        time: [calculatedTime - this.baseTime],
                    }
    
                    this._onTmpData.dispatch(tmpArgs);
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
        
    private async SendMessage(command: ISensorCommand) {
        var reqest = command.GetBytes();
        //console.log("reqest: ", reqest);
        await this.serialWorker.Write(reqest);     
    }
}

export default Sensor;

