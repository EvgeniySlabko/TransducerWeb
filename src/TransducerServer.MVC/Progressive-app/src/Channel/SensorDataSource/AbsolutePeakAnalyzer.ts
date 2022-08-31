import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export declare class PeakEventArgs {
    peakValue: number;
    time: number;
}

export class AbsolutePeakAnalyzer {
    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();
    private _onPeakDetected = new EventDispatcher<AbsolutePeakAnalyzer, PeakEventArgs>();

    private absMaxValue: number = 0;
    private enabled: boolean = false;
    constructor(baseSource: ISensorDataProvider) {
        baseSource.onData.sub(this.relativeHandler);
    }

    private relativeHandler = (sensor: ISingleComponentSensorBase, data: SensorData) => {
        if (!this.enabled) return;
        let args: PeakEventArgs | null;
        args = null;

        for (let i = 0; i < data.data.length; i++) {
            if (Math.abs(data.data[i]) > this.absMaxValue) {
                args = {
                    peakValue: data.data[i],
                    time: data.time[i],
                };

                this.absMaxValue = Math.abs(data.data[i]);
            }
        }

        if (args) this._onPeakDetected.dispatch(this, args);
    };

    public Reset = () => {
        this.absMaxValue = 0;
    };

    public set Enabled(enabled: boolean) {
        this.enabled = enabled;
    }

    public get Enabled() {
        return this.enabled;
    }

    get onPeakDetected(): IEvent<ISensorDataProvider, PeakEventArgs> {
        return this._onPeakDetected.asEvent();
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
