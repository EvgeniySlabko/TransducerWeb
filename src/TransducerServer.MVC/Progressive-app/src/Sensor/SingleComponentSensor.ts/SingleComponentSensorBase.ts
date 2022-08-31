import { EventDispatcher } from "strongly-typed-events";
import { sleep } from "../../Common/Common";
import { ISensorConnector } from "../../IO/Connector/ISensorConnector";
import { ISensorCommand } from "../SensorCommand/DefaultSensorCommands";
import { ISensorCommandFacory } from "../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../SensorCommandWriter/SensorCommandWriter";
import { ISensorDataCommandEncoder } from "../SensorDataEncoder/ISensorDataEncoder";
import { FlagRegistersAddresses, HoldingRegisters, InputComplex, InputRegistersAddresses, SensorCoilValue, SensorCommand, SensorData, SensorMessage, SensorMessageEventArgs, SensorSK, SetAvgEventArgs, StorageRegistersAddresses } from "../SensorDefinitions";
import { ISingleComponentSensorBase } from "./ISingleComponentSensorBase";

export const ADCFrequency = 5000;   //Частота Ацп
export const DecoderClockFrequency: number = 62500;    //Частота часов декодера
export const Timeout = 200;   // Максимальное время ожидание ответа на командуж

export class SingleComponentSensorBase implements ISingleComponentSensorBase {
    public readonly id: string;

    protected avgRatio?: number;
    protected speedPeriod?: number;

    private sensorDataCommandReceiver: ISensorDataCommandEncoder;

    protected _onTorqueData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    protected _onSpeedData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    protected _onTmpData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    protected _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    protected _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    protected commandHandlers: Map<number, any> = new Map();
    protected commandFactory: ISensorCommandFacory;
    protected sensorCommandWriter: ISensorCommandWriter;
    protected sensorIOWorker: ISensorConnector;

    constructor(sensorIOWorker: ISensorConnector, commandFactory: ISensorCommandFacory, seensorDataCommandReceiver: ISensorDataCommandEncoder, sensorCommandWriter: ISensorCommandWriter, id: string) {
        this.id = id;
        this.sensorIOWorker = sensorIOWorker;
        this.sensorDataCommandReceiver = seensorDataCommandReceiver;
        this.commandFactory = commandFactory;
        this.sensorCommandWriter = sensorCommandWriter;

        sensorIOWorker.OnDisconnect.sub(() => 
        {
            console.debug(this.id, "Close event ocured.");
            this._onClose.dispatch(this, "ConnectionClosed");
        });
    }

    //Events
    public get onData() {
        return this._onTorqueData.asEvent();
    }

    public get onTmp() {
        return this._onTmpData.asEvent();
    }

    public get onSpeed() {
        return this._onSpeedData.asEvent();
    }

    public get onClose() {
        return this._onClose.asEvent();
    }

    public get onMessage() {
        return this._onMessage.asEvent();
    }

    public async Initialize() : Promise<void> {
        
        console.debug(this.id, "Begining reading.");

        this.processbytes().then((args) => {
            console.debug(this.id, "Reading stream finished: ", args);
        }).catch(ex =>{
            console.warn(this.id, "Error while reading. Stream finished: ", ex);
        });
        let holdingRegisters = await this.GetHoldingRegisters();
        this.avgRatio = holdingRegisters.AverageRatio;
    }

    public async ReadInputComplex(): Promise<InputComplex> {
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.READ_INPUT_REGISTERS, InputRegistersAddresses.MainValue, 5);
        let registers = await this.SendRequesAndWaitResponse<number[]>(command);
        let mainValueBytes = new Uint8Array(4);
        mainValueBytes[0] = registers[0] & 0xff;
        mainValueBytes[1] = (registers[0] >> 8) & 0xff;
        mainValueBytes[2] = registers[1] & 0xff;
        mainValueBytes[3] = (registers[1] >> 8) & 0xff;
        let mainView = new DataView(mainValueBytes.buffer);

        let speedValueBytes = new Uint8Array(4);
        speedValueBytes[0] = registers[2] & 0xff;
        speedValueBytes[1] = (registers[2] >> 8) & 0xff;
        speedValueBytes[2] = registers[3] & 0xff;
        speedValueBytes[3] = (registers[3] >> 8) & 0xff;
        let speedView = new DataView(speedValueBytes.buffer);

        return {
            mainValue: mainView.getFloat32(0, true),
            speed: speedView.getFloat32(0, true),
            temperature: registers[4] / 10,
        };
    }

    public async GetHoldingRegisters(): Promise<HoldingRegisters> {
        console.debug(this.id, "Getting holding registers.");
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.READ_HOLDING_REGISTERS, StorageRegistersAddresses.FLAGS, 5);
        let registers = await this.SendRequesAndWaitResponse<number[]>(command);
        let holdingRegisters = new HoldingRegisters(registers);
        return holdingRegisters;
    }

    public async SetExternalSensorState(state: boolean): Promise<void> {
        console.debug(this.id, "Seting external sensor state: ", state);
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.EXTERNAL_SPEED_SENSOR, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async SetUsingFloatState(state: boolean): Promise<void> {
        console.debug(this.id, "Seting using floating point state: ", state);
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.IS_FLOAT_USING, state ? SensorCoilValue.COIL_ON_VALUE : SensorCoilValue.COIL_OFF_VALUE));
    }

    public async GetSkInfo(): Promise<SensorSK> {
        console.debug(this.id, "Getting sensor sk: ");
        let command = this.commandFactory.CreateSingleCommand(SensorCommand.REPORT_SLAVE_ID);
        let sensorSk = await this.SendRequesAndWaitResponse<SensorSK>(command);
        console.debug(this.id, "Sensor sk: ", sensorSk);
        return sensorSk;
    }

    public StartStreaming = async () => {
        console.debug(this.id, "Starting streaming");
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming,
        });

        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_ON_VALUE));
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming,
        });
    };

    public async StopStreaming() {
        console.debug(this.id, "Stop streaming.");
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_STREAMING, SensorCoilValue.COIL_OFF_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);

        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StopStreaming,
        });
    }

    public async SetAvgRatio(avgRatio: number) {
        console.debug(this.id, "Setting avg ratio: ", avgRatio);
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.AVG_RATIO, avgRatio));
        let eventArgs: SetAvgEventArgs = {
            avg: avgRatio,
            msgType: SensorMessage.SetAvg,
        };

        this._onMessage.dispatch(this, eventArgs);
        this.avgRatio = avgRatio;
    }

    public SetComputerConnection = async () => await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_ON_VALUE));
    public UnsetComputerConnection = async () => this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.COMPUTER_CONNECTION, SensorCoilValue.COIL_OFF_VALUE));
    public async SetT0() {
        console.debug(this.id, "Setting time 0: ");
        // TO DO не работает запись времени в память декодера
        //await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(Defs.PRESET_SINGLE_REGISTER, 3, 0));
        //await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(Defs.PRESET_SINGLE_REGISTER, 4, 0));
        // let holdingRegisters = await this.GetHoldingRegisters();
        this._onMessage.dispatch(this, { msgType: SensorMessage.SetTime0 });
    }

    public SetSpeedPeriod = async (speedPerion: number) => {
        console.debug(this.id, "Setting speed period: ", speedPerion);
        await this.SendRequesAndWaitResponse<void>(this.commandFactory.CreateDefaultCommand(SensorCommand.PRESET_SINGLE_REGISTER, StorageRegistersAddresses.SPEED_PERIOD, speedPerion));
        this.speedPeriod = speedPerion;
    };

    public async CloseConnection() {
        try {
            console.debug(this.id, "Closing connection: ");
            await this.sensorIOWorker.Close();
        } catch (ex) {
            console.warn("Error while closing: ", ex);
            throw ex;
        }
    }

    public async StopMeasuring() {
        console.debug(this.id, "Stop measuring.");
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_OFF_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    public async StartMeasuring() {
        console.debug(this.id, "Start measuring.");
        let command = this.commandFactory.CreateDefaultCommand(SensorCommand.FORCE_SINGLE_COIL, FlagRegistersAddresses.START_MEASURING, SensorCoilValue.COIL_ON_VALUE);
        await this.SendRequesAndWaitResponse<void>(command);
    }

    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case SensorCommand.FORCE_SINGLE_COIL: {
                let registers = await this.sensorDataCommandReceiver.GetSingleCoilAnswer();
                //console.log(registers);
                this.DispatchCommandListener(SensorCommand.FORCE_SINGLE_COIL, registers);
                return true;
            }
            case SensorCommand.PRESET_SINGLE_REGISTER: {
                let registers = await this.sensorDataCommandReceiver.GetPresetSingleRegisterAnswer();
                //console.log(registers);
                this.DispatchCommandListener(SensorCommand.PRESET_SINGLE_REGISTER, registers);
                return true;
            }
            case SensorCommand.PRESET_MULTIPLE_REGISTERS: {
                let registers = await this.sensorDataCommandReceiver.GetPresetMultipleRegisterAnswer();
                //console.log(registers);
                this.DispatchCommandListener(SensorCommand.PRESET_MULTIPLE_REGISTERS, registers);
                return true;
            }
            case SensorCommand.READ_INPUT_REGISTERS: {
                let registers = await this.sensorDataCommandReceiver.GetInputRegistersAnswer();
                this.DispatchCommandListener(SensorCommand.READ_INPUT_REGISTERS, registers);
                return true;
            }
            case SensorCommand.READ_HOLDING_REGISTERS: {
                let registers = await this.sensorDataCommandReceiver.GetHoldingRegistersAnswer();
                this.DispatchCommandListener(SensorCommand.READ_HOLDING_REGISTERS, registers);
                return true;
            }
            case SensorCommand.REPORT_SLAVE_ID: {
                let sensorId = await this.sensorDataCommandReceiver.GetID();
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

            let interval = setTimeout(() => {
                console.warn("Timeout Error. There is no data from sensor! Command: " + SensorCommand[command.Command]);
                reject(Error("Timeout Error"));
            }, Timeout);

            try {
                // console.debug("Sending command: " + SensorCommand[command.Command]);
                await this.sensorCommandWriter.Write(command);
            } catch (ex) {
                clearInterval(interval);
                console.warn("Sending command error: ", SensorCommand[command.Command], ": ", ex);
                reject(ex);
            }
        });
    }

    private async processbytes() {
        let dataType: number;
        while (true) {
            dataType = await this.sensorDataCommandReceiver.GetCommand();

            //console.log("Type : ", dataType);
            let handeled = await this.ProcessDecoderCommands(dataType);
            if (handeled) {
                continue;
            }

            handeled = await this.ProcessCommand(dataType);
            if (!handeled) {
                console.warn("Data were not handled. Stop reading.");
                return;
            }
        }
    }

    protected ProcessCommand(command: number): Promise<boolean> {
        // переопределить в наследнике для обработки других команд декодера.
        return new Promise((resolve, reject) => {
            resolve(false);
        });
    }

    private DispatchCommandListener(command: number, data: any): void {
        if (this.commandHandlers.has(command)) {
            this.commandHandlers.get(command)(data);
            this.commandHandlers.delete(command);
        }
    }
}
