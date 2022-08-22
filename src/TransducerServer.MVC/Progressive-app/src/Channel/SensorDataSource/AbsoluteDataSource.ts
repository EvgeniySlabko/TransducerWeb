import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class AbsoluteDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private enabled: boolean = false;
    constructor(baseSource: ISensorDataProvider) {
        baseSource.onClose.sub((sensor, msg) => {
            this._onClose.dispatch(sensor, msg);
        });

        baseSource.onMessage.sub((sensor, args) => {
            this._onMessage.dispatch(sensor, args);
        });

        baseSource.onData.sub((sensor, data) => {
            if (this.enabled) {
                this._onData.dispatch(sensor, {
                    data: data.data.map((value) => Math.abs(value)),
                    time: data.time,
                });
            } else {
                this._onData.dispatch(sensor, {
                    data: data.data,
                    time: data.time,
                });
            }
        });
    }

    get onData(): IEvent<ISingleComponentSensorBase, SensorData> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensorBase, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensorBase, SensorMessageEventArgs> {
        return this._onMessage.asEvent();
    }

    public get Enabled() {
        return this.enabled;
    }

    public set Enabled(enabled: boolean) {
        this.enabled = enabled;
    }
}
