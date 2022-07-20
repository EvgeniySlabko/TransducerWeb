import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { DataSourseType, ISensorDataProvider } from "./ISensorDataProvider";

export class SensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    constructor(sensor: ISingleComponentSensor, sensorDataType: DataSourseType)
    {
        sensor.onClose.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        sensor.onMessage.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));

        switch(sensorDataType)
            {
                case DataSourseType.MainValue:
                    sensor.onData.sub((sensor, data) => 
                    {
                        this._onData.dispatch(sensor, data);
                    });
                    break;
                case DataSourseType.Speed:
                    sensor.onSpeed.sub((sensor, data) => 
                    {
                        this._onData.dispatch(sensor, data);
                    });
                    break;
                case DataSourseType.Temperature:
                    sensor.onTmp.sub((sensor, data) => 
                    {
                        this._onData.dispatch(sensor, data);
                    });
                    break;
            }

        
    }
    
    get onData(): EventDispatcher<ISingleComponentSensor, dataEventArgs> {
        return this._onData;
    }
    get onClose(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage;
    }
}