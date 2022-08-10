import { EventDispatcher, IEvent } from "strongly-typed-events";
import { SensorData, HoldingRegisters, SensorMessageEventArgs, SensorSK, InputComplex } from "../SensorDefinitions";

export const ADCFrequency = 5000;

export enum SensorDateType {
  float = 1,
  integer = 0,
};

export interface ISingleComponentSensor {
  get onData(): IEvent<ISingleComponentSensor, SensorData>;

  get onTmp(): IEvent<ISingleComponentSensor, SensorData>;

  get onSpeed(): IEvent<ISingleComponentSensor, SensorData>;

  get onClose(): IEvent<ISingleComponentSensor, string>;

  get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs>;

  Initialize(): Promise<void>;

  ReadInputComplex() : Promise<InputComplex>
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
  SetExternalSensorState(state: boolean): Promise<void>
}