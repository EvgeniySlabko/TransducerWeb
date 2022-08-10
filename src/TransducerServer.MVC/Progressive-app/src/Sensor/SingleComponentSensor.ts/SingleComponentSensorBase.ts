import { EventDispatcher } from "strongly-typed-events";
import { ISensorCommand } from '../SensorCommand/DefaultSensorCommands';
import { ISensorCommandFacory } from "../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../SensorCommandWriter/SensorCommandWriter";
import { ISensorDataCommandEncoder } from "../SensorDataEncoder/ISensorDataEncoder";
import { FlagRegistersAddresses, HoldingRegisters, InputComplex, InputRegistersAddresses, SensorCoilValue, SensorCommand, SensorData, SensorMessage, SensorMessageEventArgs, SensorSK, SetAvgEventArgs, StorageRegistersAddresses } from '../SensorDefinitions';
import { ISingleComponentSensor } from './ISingleComponentSensor';

export class SingleComponentSensorBase implements ISingleComponentSensor {

    protected readonly baseFrequency: number = 5000;
    protected readonly decoderClock: number = 62500;
    protected readonly timeout: number = 500;             // Максимальное время ожидание ответа на командуж

    protected avgRatio?: number;
    protected speedPeriod?: number;

    private sensorDataCommandReceiver: ISensorDataCommandEncoder;

    protected _onTorqueData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    protected _onSpeedData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    protected _onTmpData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    protected _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    protected _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    
    protected commandHandlers: Map<number, any> = new Map();
    protected commandFactory: ISensorCommandFacory;
    protected sensorCommandWriter: ISensorCommandWriter;
    constructor(commandFactory: ISensorCommandFacory,
                seensorDataCommandReceiver: ISensorDataCommandEncoder,
                sensorCommandWriter: ISensorCommandWriter) 
    {
        this.sensorDataCommandReceiver = seensorDataCommandReceiver;
        this.commandFactory = commandFactory;
        this.sensorCommandWriter = sensorCommandWriter;
    }

    //Events 
    public get onData() { return this._onTorqueData.asEvent(); }

    public get onTmp() { return this._onTmpData.asEvent(); }

    public get onSpeed() { return this._onSpeedData.asEvent(); }

    public get onClose() { return this._onClose.asEvent(); }

    public get onMessage() { return this._onMessage.asEvent(); }

    public async Initialize() {
        this.processbytes();
        let holdingRegisters = await this.GetHoldingRegisters();
        this.avgRatio = holdingRegisters.AverageRatio;
    }

    public async ReadInputComplex() : Promise<InputComplex>
    {
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.READ_INPUT_REGISTERS, InputRegistersAddresses.MainValue, 5);
        let registers = await this.SendRequesAndWaitResponse<number[]>(command);
        let mainValueBytes = new Uint8Array(4);
        mainValueBytes[0] = registers[0] & 0XFF;
        mainValueBytes[1] = (registers[0] >> 8) & 0XFF;
        mainValueBytes[2] = registers[1] & 0XFF;
        mainValueBytes[3] = (registers[1] >> 8) & 0XFF;
        let mainView = new DataView(mainValueBytes.buffer);

        let speedValueBytes = new Uint8Array(4);
        speedValueBytes[0] = registers[2] & 0XFF;
        speedValueBytes[1] = (registers[2] >> 8) & 0XFF;
        speedValueBytes[2] = registers[3] & 0XFF;
        speedValueBytes[3] = (registers[3] >> 8) & 0XFF;
        let speedView = new DataView(mainValueBytes.buffer);
        
        return {
            mainValue: mainView.getFloat32(0, true),
            speed: speedView.getFloat32(0, true),
            temperature: registers[4] / 10,
        }
    }

    public async GetHoldingRegisters(): Promise<HoldingRegisters> {
        var command = this.commandFactory.CreateDefaultCommand(SensorCommand.READ_HOLDING_REGISTERS, StorageRegistersAddresses.FLAGS, 5);
        var registers = await this.SendRequesAndWaitResponse<number[]>(command);
        var holdingRegisters = new HoldingRegisters(registers);
        return holdingRegisters;
    }

    public async SetExternalSensorState(state: boolean): Promise<void> {
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.EXTERNAL_SPEED_SENSOR, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async SetUsingFloatState(state: boolean): Promise<void> {
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.IS_FLOAT_USING, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async GetSkInfo(): Promise<SensorSK> {
        var command = this.commandFactory.CreateSingleCommand(SensorCommand.REPORT_SLAVE_ID);
        var sensorSk = await this.SendRequesAndWaitResponse<SensorSK>(command);
        return sensorSk;
    }

    public StartStreaming = async () => {
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming
        })
        
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_ON_VALUE));
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming
        });
    }

    public async StopStreaming(waitAnswer: boolean = true) {
        var command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_OFF_VALUE);
        if (waitAnswer)
            await this.SendRequesAndWaitResponse<void>(command);
        else
            await this.sensorCommandWriter.Write(command);

        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StopStreaming
        });
    }

    public async SetAvgRatio(avgRatio: number) {
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.AVG_RATIO, avgRatio));
        let eventArgs: SetAvgEventArgs = {
            avg: avgRatio, 
            msgType: SensorMessage.SetAvg
        };

        this._onMessage.dispatch(this, eventArgs);
        this.avgRatio = avgRatio;
    }

    public SetComputerConnection = async () => await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_ON_VALUE));
    public UnsetComputerConnection = async () => this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_OFF_VALUE));
    public async SetT0() {

        // TO DO не работает запись времени в память декодера
        //await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(Defs.PRESET_SINGLE_REGISTER, 3, 0));
        //await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(Defs.PRESET_SINGLE_REGISTER, 4, 0));
        // let holdingRegisters = await this.GetHoldingRegisters();
        this._onMessage.dispatch(this, { msgType: SensorMessage.SetTime0 });
    }
    
    public SetSpeedPeriod = async (speedPerion: number) => {
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.SPEED_PERIOD, speedPerion));
        this.speedPeriod = speedPerion;
    }

    public async CloseConnection() {
        try
        {
            await this.sensorDataCommandReceiver.Close();
        }
        catch
        {
            console.warn("Error while closing.");
        }
        finally
        {
            this._onClose.dispatch(this, "Connection closed");
        }
    }

    public async StopMeasuring() {
        var command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_OFF_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async StartMeasuring() {
        var command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_ON_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case SensorCommand.FORCE_SINGLE_COIL:
                {
                    let registers = await this.sensorDataCommandReceiver.GetSingleCoilAnswer();
                    //console.log(registers);
                    this.DispatchCommandListener(SensorCommand.FORCE_SINGLE_COIL, registers);
                    return true;
                }
            case SensorCommand.PRESET_SINGLE_REGISTER:
                {
                    let registers = await this.sensorDataCommandReceiver.GetPresetSingleRegisterAnswer();;
                    //console.log(registers);
                    this.DispatchCommandListener(SensorCommand.PRESET_SINGLE_REGISTER, registers);
                    return true;
                }
            case SensorCommand.PRESET_MULTIPLE_REGISTERS:
                {
                    let registers = await this.sensorDataCommandReceiver.GetPresetMultipleRegisterAnswer();
                    //console.log(registers);
                    this.DispatchCommandListener(SensorCommand.PRESET_MULTIPLE_REGISTERS, registers);
                    return true;
                }
            case SensorCommand.READ_INPUT_REGISTERS:
                {
                    let registers = await this.sensorDataCommandReceiver.GetInputRegistersAnswer();
                    this.DispatchCommandListener(SensorCommand.READ_INPUT_REGISTERS, registers);
                    return true;
                }
            case SensorCommand.READ_HOLDING_REGISTERS:
                {
                    let registers = await this.sensorDataCommandReceiver.GetHoldingRegistersAnswer();
                    this.DispatchCommandListener(SensorCommand.READ_HOLDING_REGISTERS, registers);
                    return true;
                }
            case SensorCommand.REPORT_SLAVE_ID:
                {
                    var sensorId = await this.sensorDataCommandReceiver.GetID();
                    this.DispatchCommandListener(SensorCommand.REPORT_SLAVE_ID, sensorId);
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

            var interval = setTimeout(() => {
                console.warn("Timeout Error. There is no data from sensor! Command: " + SensorCommand[command.Command]);
                reject();
            }, this.timeout);

            try {
                // console.info("Sending command: " + SensorCommand[command.Command]);
                await this.sensorCommandWriter.Write(command);
            }
            catch (ex) {
                clearInterval(interval);
                reject(ex);
            }
        });
    }

    private async processbytes() {

        let dataType: number;
        try {
            let nextIteration = async () => await this.processbytes();
            dataType = await this.sensorDataCommandReceiver.GetCommand();

            //console.log("Type : ", dataType);
            var handeled = await this.ProcessDecoderCommands(dataType);
            if (handeled) {
                nextIteration();
                return;
            }

            handeled = await this.ProcessCommand(dataType);
            if (!handeled) {
                this.ReadingErrorHandler();
                return;
            }

            nextIteration();
        }
        catch (ex) {
            await this.ReadingErrorHandler();
        }
    }

    protected ProcessCommand(command : number) : Promise<boolean>
    {
        // переопределить в наследнике для обработки других команд декодера.
        return new Promise((resolve, reject) => {
            resolve(false);
        })
    }

    protected async ReadingErrorHandler() {
        console.log('Sensor reading error');
        //await this.CloseConnection();
        //this._onClose.dispatch(this, "Reading error");
    }

    private DispatchCommandListener(command: number, data: any): void {
        if (this.commandHandlers.has(command)) {
            this.commandHandlers.get(command)(data);
            this.commandHandlers.delete(command);
        }
    }
}

