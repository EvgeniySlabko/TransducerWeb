import { EventDispatcher, IEvent } from "strongly-typed-events";
import { PeackMode } from "../../Components/CellsGroup";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные
export declare class PeakEventArgs {
    peakValue: number;
    time: number;
}

export class PeakAnalizer {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    private _onPeakDetected = new EventDispatcher<PeakAnalizer, PeakEventArgs>();

    private allowDispatch: boolean = true;

    private threshold: number; //порог срабатывания

    private thresholdCrossed: boolean = false;

    private currentMaxAbsPeakValue: number = 0;
    private currentMaxPeakValue: number = 0;
    private currentMaxTimeValue: number = 0;

    private shmithValue: number;
    private mode: PeackMode = "none";

    private absoluteModeMaxValue: number = 0;

    constructor(baseSource: ISensorDataProvider, threshold: number, shmithValue: number) {
        this.threshold = threshold;
        this.shmithValue = shmithValue;
        baseSource.onData.sub(this.relativeHandler);
    }

    private relativeHandler = (sensor: ISingleComponentSensor, data: SensorData) => {
        let args: PeakEventArgs | null;
        args = null;

        for (let i = 0; i < data.data.length; i++) {
            let absValue = Math.abs(data.data[i]);

            if (this.thresholdCrossed) {
                if (absValue > this.currentMaxAbsPeakValue) {
                    this.currentMaxPeakValue = data.data[i];
                    this.currentMaxTimeValue = data.time[i];
                    this.currentMaxAbsPeakValue = absValue;
                }
                else {
                    //пик закончился
                    if (absValue < this.shmithValue && this.thresholdCrossed) {
                        this.thresholdCrossed = false;
                        if (this.currentMaxAbsPeakValue) {
                            args = {
                                peakValue: this.currentMaxPeakValue,
                                time: this.currentMaxTimeValue
                            }
                        }
                    }
                }
            }
            else {
                if (absValue > this.threshold) {
                    this.thresholdCrossed = true;
                    this.currentMaxPeakValue = data.data[i];
                    this.currentMaxAbsPeakValue = absValue;
                    this.currentMaxTimeValue = data.time[i];
                }
            }
        }

        if (args)
            this._onPeakDetected.dispatch(this, args);
    }

    public SetThreshold = (upperdorger: number, lowerBorder: number) => {
        this.threshold = upperdorger;
        this.shmithValue = lowerBorder
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