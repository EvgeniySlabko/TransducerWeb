import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import Sensor from "../../Sensor/sensor";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class SensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<Sensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<Sensor,string>();
    private _onClose = new EventDispatcher<Sensor, string>();

    constructor(dataSource: IEvent<Sensor, dataEventArgs> | null, messageSource: IEvent<Sensor,string> | null, closeSource: IEvent<Sensor,string> | null)
    {
        closeSource?.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        dataSource?.sub((sensor, data) => this._onData.dispatch(sensor, data));
        messageSource?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
    }
    
    get onData(): EventDispatcher<Sensor, dataEventArgs> {
        return this._onData;
    }
    get onClose(): EventDispatcher<Sensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<Sensor, string> {
        return this._onMessage;
    }
}