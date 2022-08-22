import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class OffsetDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private offset: number;
    private currentValue: number = 0;
    constructor(baseSource: ISensorDataProvider, offset: number) {
        this.offset = offset;

        baseSource.onClose.sub((sensor, msg) => {
            this._onClose.dispatch(sensor, msg);
        });

        baseSource.onMessage.sub((sensor, args) => {
            this._onMessage.dispatch(sensor, args);
        });

        baseSource.onData.sub((sensor, data) => {
            let ofsetValues = new Array<number>(data.data.length);

            for (let i = 0; i < data.data.length; i++) {
                this.currentValue = data.data[i];
                ofsetValues[i] = data.data[i] - this.offset;
            }

            this._onData.dispatch(sensor, {
                data: ofsetValues,
                time: data.time,
            });
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

    public get Offset() {
        return this.offset;
    }

    public SetOffset = (offset: number) => {
        this.offset = offset;
    };

    public SetCurrentOffset = (): number => {
        this.offset = this.currentValue;
        return this.offset;
    };
}
