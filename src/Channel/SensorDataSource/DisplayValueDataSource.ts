import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//выдает данные не чаще fps.
export class DisplayValueDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private interval: NodeJS.Timeout;

    private lastValue: number | undefined;
    private lastTime: number | undefined;
    private sender: ISingleComponentSensorBase | undefined;
    private wasData: boolean = false;

    constructor(baseSource: ISensorDataProvider, fps: number) {
        baseSource.onClose.sub((sender, args) => {
            clearInterval(this.interval);
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => {
            this.lastValue = data.data[data.data.length - 1];
            this.lastTime = data.time[data.data.length - 1];
            this.sender = sensor;
            this.wasData = true;
        });

        let delay = 1000 / fps;
        this.interval = setInterval(() => {
            if (this.wasData) {
                this._onData.dispatch(this.sender as ISingleComponentSensorBase, {
                    data: [this.lastValue as number],
                    time: [this.lastTime as number],
                });

                this.wasData = false;
            }
        }, delay);
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
}
