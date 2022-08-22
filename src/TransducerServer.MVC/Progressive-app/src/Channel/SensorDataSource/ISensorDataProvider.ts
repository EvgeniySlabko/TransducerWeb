import { IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";

export interface ISensorDataProvider {
    get onData(): IEvent<ISingleComponentSensorBase, SensorData>;

    get onClose(): IEvent<ISingleComponentSensorBase, string>;

    get onMessage(): IEvent<ISingleComponentSensorBase, SensorMessageEventArgs>;
}

export enum DataSourseType {
    MainValue,
    Temperature,
    Speed,
}
