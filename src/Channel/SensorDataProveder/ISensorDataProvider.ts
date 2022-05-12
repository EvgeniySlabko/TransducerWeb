import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export interface ISensorDataProvider
{
    get onData() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onClose() : IEvent<ISingleComponentSensor, string>;

    get onMessage() : IEvent<ISingleComponentSensor, SensorMessageEventArgs>;
}

export enum DataSourseType{
    MainValue,
    Temperature,
    Speed,
}