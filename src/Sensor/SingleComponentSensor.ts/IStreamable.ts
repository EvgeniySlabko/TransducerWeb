import { IEvent } from "strongly-typed-events";
import { SensorData, SensorMessageEventArgs } from "../SensorDefinitions";
import { ISingleComponentSensorBase } from "./ISingleComponentSensorBase";

export interface IStreamable
{
    get onData(): IEvent<ISingleComponentSensorBase, SensorData>;

    get onTmp(): IEvent<ISingleComponentSensorBase, SensorData>;

    get onSpeed(): IEvent<ISingleComponentSensorBase, SensorData>;

    get onMessage(): IEvent<ISingleComponentSensorBase, SensorMessageEventArgs>;
}