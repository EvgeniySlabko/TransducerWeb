import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class InvertorDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private enabled: boolean = false;
    constructor(baseSource: ISensorDataProvider) {
        baseSource.onClose.sub((sensor, msg) => {
            this._onClose.dispatch(sensor, msg);
        });

        baseSource.onMessage.sub((sensor, args) => {
            this._onMessage.dispatch(sensor, args);
        });

        baseSource.onData.sub((sensor, data) => {

            if (this.enabled)
            {
                this._onData.dispatch(sensor, {
                    data: data.data.map(value => value * -1),
                    time: data.time,
                });
            }
            else
            {
                this._onData.dispatch(sensor, {
                    data: data.data,
                    time: data.time,
                });
            }
        });
    }

    get onData(): IEvent<ISingleComponentSensor, SensorData> {
        return this._onData.asEvent();;
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();;
    }

    public get Enabled() {
        return this.enabled;
    }

    public set Enabled(enabled: boolean) {
        this.enabled = enabled;
    }
}