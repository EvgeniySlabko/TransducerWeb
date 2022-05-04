import { EventDispatcher, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export interface ISensorDataProvider
{
    get onData() : EventDispatcher<ISingleComponentSensor, dataEventArgs>;

    get onClose() : EventDispatcher<ISingleComponentSensor, string>;

    get onMessage() : EventDispatcher<ISingleComponentSensor, string>;
}