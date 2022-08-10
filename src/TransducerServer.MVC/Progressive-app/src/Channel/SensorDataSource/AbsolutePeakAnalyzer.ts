import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export declare class PeakEventArgs {
    peakValue: number;
    time: number;
}

export class AbsolutePeakAnalyzer {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    private _onPeakDetected = new EventDispatcher<AbsolutePeakAnalyzer, PeakEventArgs>();

    private absMaxValue: number = 0;
    private enabled: boolean = false;
    constructor(baseSource: ISensorDataProvider) {
        baseSource.onData.sub(this.relativeHandler);
    }

    private relativeHandler = (sensor: ISingleComponentSensor, data: SensorData) => {
        if (!this.enabled) return;
        let args: PeakEventArgs | null;
        args = null;

        for (let i = 0; i < data.data.length; i++) {
            if (Math.abs(data.data[i]) > this.absMaxValue) {
                args = {
                    peakValue: data.data[i],
                    time: data.time[i]
                }

                this.absMaxValue = Math.abs(data.data[i]);
            }
        }

        if (args)
            this._onPeakDetected.dispatch(this, args);
    }

    public Reset = () => {
        this.absMaxValue = 0;
    }

    public set Enabled(enabled: boolean){
        this.enabled = enabled;
    }

    public get Enabled() {
        return this.enabled
    }

    get onPeakDetected(): IEvent<ISensorDataProvider, PeakEventArgs> {
        return this._onPeakDetected.asEvent();
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