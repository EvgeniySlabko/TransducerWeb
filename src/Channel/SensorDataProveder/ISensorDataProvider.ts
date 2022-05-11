import { type } from "jquery";
import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export interface ISensorDataProvider
{
    get onData() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onClose() : IEvent<ISingleComponentSensor, string>;

    get onMessage() : IEvent<ISingleComponentSensor, string>;
}


export type ISensorDataProviderBaseArgs =
{
    onData : IEvent<ISingleComponentSensor, dataEventArgs>;

    onClose : IEvent<ISingleComponentSensor, string>;

    onMessage : IEvent<ISingleComponentSensor, string> | null;
}

export type IBufferedDataProviderArgs = ISensorDataProvider | ISensorDataProviderBaseArgs;