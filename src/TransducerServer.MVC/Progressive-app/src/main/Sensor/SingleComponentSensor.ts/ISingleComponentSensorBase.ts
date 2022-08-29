import { IEvent } from "strongly-typed-events";
import { HoldingRegisters, InputComplex, SensorSK } from "../SensorDefinitions";



export interface ISingleComponentSensorBase {

    get onClose(): IEvent<ISingleComponentSensorBase, string>;

    Initialize(): Promise<void>;
    ReadInputComplex(): Promise<InputComplex>;
    GetHoldingRegisters(): Promise<HoldingRegisters>;
    GetSkInfo(): Promise<SensorSK>;
    StartStreaming(): Promise<void>;
    StopStreaming(): Promise<void>;
    SetAvgRatio(avgRatio: number): Promise<void>;
    SetComputerConnection(): Promise<void>;
    UnsetComputerConnection(): Promise<void>;
    SetT0(): Promise<void>;
    CloseConnection(): Promise<void>;
    StopMeasuring(waitAnswer: boolean): Promise<void>;
    StartMeasuring(waitAnswer: boolean): Promise<void>;
    SetSpeedPeriod(speedPerion: number): Promise<void>;
    SetUsingFloatState(state: boolean): Promise<void>;
    SetExternalSensorState(state: boolean): Promise<void>;
}
