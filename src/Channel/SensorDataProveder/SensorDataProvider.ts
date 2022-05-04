import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class SensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,string>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    constructor(dataSource: IEvent<ISingleComponentSensor, dataEventArgs> | null, 
                messageSource: IEvent<ISingleComponentSensor,string> | null, 
                closeSource: IEvent<ISingleComponentSensor,string> | null)
    {
        closeSource?.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        dataSource?.sub((sensor, data) => this._onData.dispatch(sensor, data));
        messageSource?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
    }
    
    get onData(): EventDispatcher<ISingleComponentSensor, dataEventArgs> {
        return this._onData;
    }
    get onClose(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onMessage;
    }
}