import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class ScaledDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    private ratio = 1;

    constructor(baseSource: ISensorDataProvider, ratio: number) {
        this.ratio = ratio;
        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => {
            if (this.ratio === 1) {
                this._onData.dispatch(sensor, data);
                return;
            }

            this._onData.dispatch(sensor, {
                data: data.data.map((v) => v * this.ratio),
                time: data.time,
            } as SensorData);
        });
    }

    get onData(): IEvent<ISingleComponentSensor, SensorData> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();
    }
}
