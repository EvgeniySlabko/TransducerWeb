import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";

export interface ISensorDataProvider
{
    get onData() : SimpleEventDispatcher<dataEventArgs>;

    get onClose() : SimpleEventDispatcher<string>;

    get onMessage() : SimpleEventDispatcher<string>;
}