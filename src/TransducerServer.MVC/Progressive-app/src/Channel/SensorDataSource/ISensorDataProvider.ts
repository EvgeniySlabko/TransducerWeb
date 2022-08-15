import { IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import {
  SensorData,
  SensorMessageEventArgs,
} from "../../Sensor/SensorDefinitions";

export interface ISensorDataProvider {
  get onData(): IEvent<ISingleComponentSensor, SensorData>;

  get onClose(): IEvent<ISingleComponentSensor, string>;

  get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs>;
}

export enum DataSourseType {
  MainValue,
  Temperature,
  Speed,
}
