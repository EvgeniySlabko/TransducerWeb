import { EventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { DataSourseType, ISensorDataProvider } from "./ISensorDataProvider";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";

export class SensorDataProvider implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    constructor(sensor: ISingleComponentSensor, sensorDataType: DataSourseType) {
        sensor.onClose.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        sensor.onMessage.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));

        switch (sensorDataType) {
            case DataSourseType.MainValue:
                sensor.onData.sub((sensor, data) => {
                    this._onData.dispatch(sensor, data);
                });
                break;
            case DataSourseType.Speed:
                sensor.onSpeed.sub((sensor, data) => {
                    this._onData.dispatch(sensor, data);
                });
                break;
            case DataSourseType.Temperature:
                sensor.onTmp.sub((sensor, data) => {
                    this._onData.dispatch(sensor, data);
                });
                break;
            default:
                throw new Error('Invalid Sensor data type.'); 
        }
    }

    get onData(): EventDispatcher<ISingleComponentSensorBase, SensorData> {
        return this._onData;
    }
    get onClose(): EventDispatcher<ISingleComponentSensorBase, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs> {
        return this._onMessage;
    }
}
