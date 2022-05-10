import { EventDispatcher, IEvent } from "strongly-typed-events";
import SensorComponentSensor from "./sensor";
import { dataEventArgs, HoldingRegisters, SensorSK } from "./SensorDefinitions";

export interface ISingleComponentSensor {
    get onData() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onTmp() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onSpeed() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onError() : IEvent<ISingleComponentSensor, string>;

    get onClose() : IEvent<ISingleComponentSensor, string>;

    get onStopStreaming() : IEvent<ISingleComponentSensor, string>;

    Initialize(): Promise<void>;
    GetHoldingRegisters(): Promise<HoldingRegisters>;
    GetSkInfo(): Promise<SensorSK>;
    StartStreaming(): Promise<void>;
    StopStreaming(): Promise<void>;
    SetAvgRatio(avgRatio: number): Promise<void>;
    SetComputerConnection(): Promise<void>;
    UnsetComputerConnection(): Promise<void>;
    SetT0() : Promise<void>;
    CloseConnection() : Promise<void>;
    StopMeasuring(waitAnswer: boolean): Promise<void>;
    StartMeasuring(waitAnswer: boolean): Promise<void>;
  }