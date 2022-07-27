import { EventDispatcher } from "strongly-typed-events";
import { SerialBufferedWorker } from "../../IO/serialBuffer";
import { DefaultCommand, ISensorCommand, SingleCommand } from '../SensorCommand/SensorCommands';
import { ISingleComponentSensor } from './ISingleComponentSensor';
import { FlagRegistersAddresses, HoldingRegisters, SensorCoilValue, SensorCommand, SensorData, SensorMessage, SensorMessageEventArgs, SensorSK, StorageRegistersAddresses, StramingPackageType } from './SensorDefinitions';

export class SingleComponentSensor implements ISingleComponentSensor {

    private readonly baseFrequency: number = 5000;
    private readonly decoderClock: number = 62500;
    private readonly timeout: number = 200;             // Максимальное время ожидание ответа на командуж
    
    private timeBase: number = 0;
    private avgRatio: number = 1;
    
    public serialWorker: SerialBufferedWorker;
    private requiredStopStreaming: boolean = false;

    private _onTorqueData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onSpeedData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onTmpData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    
    private commandHandlers: Map<number, any> = new Map();

    constructor(worker: SerialBufferedWorker) {
        if (worker == null) throw "Worker is null";
        this.serialWorker = worker;
    }

    //Events 
    public get onData() { return this._onTorqueData.asEvent(); }

    public get onTmp() { return this._onTmpData.asEvent(); }

    public get onSpeed() { return this._onSpeedData.asEvent(); }

    public get onClose() { return this._onClose.asEvent(); }

    public get onMessage() { return this._onMessage.asEvent(); }

    public async Initialize() {
        if (!this.serialWorker.baseWorker.IsConnected)
            await this.serialWorker.baseWorker.OpenPort();
        this.processbytes();
        let holdingRegisters = await this.GetHoldingRegisters();
        this.avgRatio = holdingRegisters.AverageRatio;
    }

    public async GetHoldingRegisters(): Promise<HoldingRegisters> {
        var command = new DefaultCommand(SensorCommand.READ_HOLDING_REGISTERS, 0, 5);
        var registers = await this.SendRequesAndWaitResponse<number[]>(command);
        var holdingRegisters = new HoldingRegisters(registers);
        let th = holdingRegisters.TimeHigh;
        let tl = holdingRegisters.TimeLow;
        return holdingRegisters;
    }

    public async SetExternalSensorState(state: boolean): Promise<void> {
        await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.EXTERNAL_SPEED_SENSOR, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async SetUsingFloatState(state: boolean): Promise<void> {
        await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.IS_FLOAT_USING, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async GetSkInfo(): Promise<SensorSK> {
        var command = new SingleCommand(SensorCommand.REPORT_SLAVE_ID);

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

    public StartStreaming = async () => {
        await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_ON_VALUE));
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming
        })
    }

    public SetAvgRatio = async (avgRatio: number) => {
        await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.AVG_RATIO, avgRatio));
        this.avgRatio = avgRatio;
    }
    public SetComputerConnection = async () => await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_ON_VALUE));
    public UnsetComputerConnection = async () => this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_OFF_VALUE));
    public SetT0 = async () => {

        // TO DO не работает запись времени в память декодера
        //await this.SendRequesAndWaitResponse<void>(new DefaultCommand(Defs.PRESET_SINGLE_REGISTER, 3, 0));
        //await this.SendRequesAndWaitResponse<void>(new DefaultCommand(Defs.PRESET_SINGLE_REGISTER, 4, 0));
        
        let holdingRegisters = await this.GetHoldingRegisters();
        this.timeBase = holdingRegisters.TimeLow + (holdingRegisters.TimeHigh << 16);
    }
    public SetSpeedPeriod = async (speedPerion: number) => await this.SendRequesAndWaitResponse<void>(new DefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.SPEED_PERIOD, speedPerion));

    public CloseConnection = async () => {
        this.requiredStopStreaming  = true;
        try
        {
            await this.StopStreaming();
        }
        catch(ex)
        {
            throw ex;
        }
        finally
        {
            await this.serialWorker.Close();
            this._onClose.dispatch(this, "Connection closed");
        }
    }

    public async StopMeasuring(waitAnswer: boolean = true) {
        var command = new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_OFF_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            await this.SendMessage(command);
    }

    public async StartMeasuring(waitAnswer: boolean = true) {
        var command = new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_ON_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            await this.SendMessage(command);
    }

    public async StopStreaming(waitAnswer: boolean = true) {
        var command = new DefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_OFF_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            this.SendMessage(command);

        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StopStreaming
        });
    }

    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case SensorCommand.FORCE_SINGLE_COIL:
                {
                    var data = await this.serialWorker.Read(4);
                    //console.log(data);
                    this.DispatchCommandListener(SensorCommand.FORCE_SINGLE_COIL, data);
                    return true;
                }
            case SensorCommand.PRESET_SINGLE_REGISTER:
                {
                    var data = await this.serialWorker.Read(4);
                    //console.log(data);
                    this.DispatchCommandListener(SensorCommand.PRESET_SINGLE_REGISTER, data);
                    return true;
                }
            case SensorCommand.PRESET_MULTIPLE_REGISTERS:
                {
                    var data = await this.serialWorker.Read(4);
                    var view = new DataView(data.buffer);
                    var registers: number[] = [];
                    for (let i = 0; i < data.length / 2; i++) {
                        registers.push(view.getUint16(i * 2, true));
                    }
                    //console.log(data);
                    this.DispatchCommandListener(SensorCommand.PRESET_MULTIPLE_REGISTERS, data);
                    return true;
                }
            case SensorCommand.READ_HOLDING_REGISTERS:
                {
                    var bytes = (await this.serialWorker.Read(1))[0];
                    var data = await this.serialWorker.Read(bytes);
                    //console.log(bytes);
                    //console.log(data);
                    var view = new DataView(data.buffer);
                    var registers: number[] = [];
                    for (let i = 0; i < data.length / 2; i++) {
                        registers.push(view.getUint16(i * 2, true));
                    }

                    this.DispatchCommandListener(SensorCommand.READ_HOLDING_REGISTERS, registers);
                    return true;
                }
            case SensorCommand.REPORT_SLAVE_ID:
                {
                    var idBytes = await this.serialWorker.Read(60);
                    this.DispatchCommandListener(SensorCommand.REPORT_SLAVE_ID, idBytes);
                    return true;
                }
            default:
                return false;
        }
    }

    private async SendRequesAndWaitResponse<T>(command: ISensorCommand): Promise<T> {
        return new Promise<T>(async (resolve, reject) => {

            this.commandHandlers.set(command.Command, (data: T) => {
                clearInterval(interval);
                resolve(data);
            });

            var interval = setTimeout(function () {
                reject("Timeout Error. There is no data from sensor! Command: " + command.Command.toString());
            }, this.timeout);

            try {
                await this.SendMessage(command);
            }
            catch (ex) {
                clearInterval(interval);
                reject(ex);
            }
        });
    }

    private CalculateTime = (timeL: number, timeH: number): number => ((timeL + (timeH << 16) - this.timeBase) / this.decoderClock);


    private async ProcessStreamingData(command: number): Promise<boolean> {

        var size, timeL, timeH;
        let commonData = await this.serialWorker.Read(6);
        //console.log("Process C: ", commonData);
        const view = new DataView(commonData.buffer);
        size = view.getUint16(0, true);
        timeL = view.getUint16(2, true);
        timeH = view.getUint16(4, true);
        let calculatedTime = this.CalculateTime(timeL, timeH);

        switch (command) {
            case StramingPackageType.TORQUE:
                var datatorque = await this.serialWorker.Read(size - 4);
                //console.log("seize", size);
                //console.log("Process T: ", datatorque);
                const torqView = new DataView(datatorque.buffer);
                var bufferCount = torqView.getUint8(0);
                var dataCount = torqView.getUint8(1);

                var torqArgs: SensorData = {
                    data: new Array(dataCount),
                    time: new Array(dataCount),
                }

                let interval = 1 / (this.baseFrequency / this.avgRatio);
                for (let i = 0; i < dataCount; i++) {
                    var value = torqView.getFloat32((2 + (i * 4)), true);

                    torqArgs.data[i] = value;
                    torqArgs.time[i] = calculatedTime + (i * interval);
                }

                this._onTorqueData.dispatch(this, torqArgs);

                break;

            case StramingPackageType.SPEED:
                var dataSpeed = await this.serialWorker.Read(size - 4);
                //console.log("Process S: ", dataSpeed);
                const speedView = new DataView(dataSpeed.buffer);
                var speed = speedView.getFloat32(0, true);
                var dataArgs: SensorData = {
                    data: [speed],
                    time: [calculatedTime],
                }

                this._onSpeedData.dispatch(this, dataArgs);
                //console.log(dataSpeed);
                break;

            case StramingPackageType.TEMPERATUR:
                var dataTemperature = await this.serialWorker.Read(size - 4);
                const temperatureView = new DataView(dataTemperature.buffer);
                var temperature = temperatureView.getFloat32(0, true);
                var tmpArgs: SensorData = {
                    data: [temperature],
                    time: [calculatedTime],
                }

                this._onTmpData.dispatch(this, tmpArgs);
                break;

            case StramingPackageType.MESSAGE:
                var dataMsg = await this.serialWorker.Read(size - 4);
                const msgView = new DataView(dataMsg.buffer);
                var msgCount = msgView.getUint16(0, true);
                for (let i = 0; i < msgCount; i++) {
                    var msg = msgView.getUint16(2 + (i * 2));
                    //console.log("Message: ", msg);
                }
                break;

            default:
                return false;
        }

        return true;
    }

    private async processbytes() {

        let dataType: number;
        try {
            let nextIteration = async () => await this.processbytes();
            dataType = (await this.serialWorker.Read(1))[0];

            //console.log("Type : ", dataType);
            var handeled = await this.ProcessDecoderCommands(dataType);
            if (handeled) {
                nextIteration();
                return;
            }

            handeled = await this.ProcessStreamingData(dataType);
            if (!handeled) {
                this.ReadingErrorHandler();
                return;
            }

            nextIteration();
        }
        catch (ex) {
            this.ReadingErrorHandler();
        }
    }

    private ReadingErrorHandler() {
        if (!this.requiredStopStreaming)
        {
            console.log('Sensor reading error');
            this._onClose.dispatch(this, "Reading error");
        }
        else{
            this.requiredStopStreaming = false;
        }
    }

    private async SendMessage(command: ISensorCommand) {
        var reqest = command.GetBytes();
        //console.log("reqest: ", reqest);
        await this.serialWorker.Write(reqest);
    }

    private DispatchCommandListener(command: number, data: any): void {
        if (this.commandHandlers.has(command)) {
            this.commandHandlers.get(command)(data);
            this.commandHandlers.delete(command);
        }
    }
}

export default SingleComponentSensor;

