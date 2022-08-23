import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class AverageDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private averageRatio: number;

    private averageCount: number = 0;
    private averageValue: number = 0;
    private t0: number = 0;
    private th: number = 0;

    constructor(baseSource: ISensorDataProvider, averageRatio: number) {
        this.averageRatio = averageRatio;

        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            if (args.msgType === SensorMessage.StopStreaming) this.reset();
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => {
            data.data.forEach((value, i) => {
                if (this.averageCount === 0) this.t0 = data.time[0];
                this.averageValue += value;
                this.averageCount++;
                if (this.averageCount === this.averageRatio) {
                    this.th = data.time[i];
                    let curVal = this.averageValue / this.averageCount;

                    let dt = (this.th - this.t0) / 2;
                    let curTime = this.th - dt;
                    this._onData.dispatch(sensor, {
                        data: [curVal],
                        time: [curTime],
                    });

                    this.reset();
                }
            });
        });
    }

    private reset = () => {
        this.averageCount = 0;
        this.t0 = 0;
        this.th = 0;
        this.averageValue = 0;
    };

    public set(avgRatio: number) {
        this.averageRatio = avgRatio;
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
