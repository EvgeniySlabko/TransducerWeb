import { EventDispatcher, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import Sensor from "../../Sensor/sensor";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";

export interface ISensorDataProvider
{
    get onData() : EventDispatcher<Sensor, dataEventArgs>;

    get onClose() : EventDispatcher<Sensor, string>;

    get onMessage() : EventDispatcher<Sensor, string>;
}