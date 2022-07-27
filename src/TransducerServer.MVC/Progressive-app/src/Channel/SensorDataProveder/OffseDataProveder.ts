import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class OffsetDataProvider implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

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

    get onData(): IEvent<ISingleComponentSensor, SensorData> {
        return this._onData.asEvent();;
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();;
    }

    public SetOffset = (offset: number) => {
        this.offset = offset;
    }

    public SetCurrentOffset = (): number => {
        this.offset = this.currentValue;
        return this.offset;
    }
}