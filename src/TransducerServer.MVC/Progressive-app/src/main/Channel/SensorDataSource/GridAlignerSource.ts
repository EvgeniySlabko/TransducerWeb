import { EventDispatcher, IEvent } from "strongly-typed-events";
import { Equals } from "../../Common/Common";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class GridAlignerSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private dt: number = 0.02;

    private currentGridTime = 0;
    private currentAvgValue = 0;
    private currentAvgCount = 0;

    constructor(baseSource: ISensorDataProvider) {
        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            if (args.msgType === SensorMessage.StopStreaming) this.reset();
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => {
            let sensorData: SensorData = {
                data: [],
                time: [],
            };

            for (let i = 0; i < data.time.length; i++) {
                let gridTime = this.toGridTime(data.time[i]);
                if (!Equals(gridTime, this.currentGridTime)) {
                    if (this.currentAvgCount !== 0) {
                        let avgValue = this.currentAvgValue / this.currentAvgCount;
                        sensorData.data.push(avgValue), sensorData.time.push(this.currentGridTime);
                    }

                    this.reset();
                    this.currentGridTime = gridTime;
                }

                this.currentAvgValue += data.data[i];
                this.currentAvgCount++;
            }

            if (sensorData.time.length !== 0) this._onData.dispatch(sensor, sensorData);
        });
    }

    toGridTime = (time: number) => {
        let index = Math.trunc(time / this.dt);
        return index * this.dt;
    };

    public set Dt(dt: number) {
        this.dt = dt;
        this.reset();
    }

    private reset = () => {
        this.currentGridTime = 0;
        this.currentAvgValue = 0;
        this.currentAvgCount = 0;
    };

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
