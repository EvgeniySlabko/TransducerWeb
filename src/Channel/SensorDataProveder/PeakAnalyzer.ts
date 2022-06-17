import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные
export declare class PeakEventArgs 
{
    peakValue: number;
    time: number;
}

export class PeakAnalizer
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    private _onPeakDetected = new EventDispatcher<PeakAnalizer, PeakEventArgs>();

    private allowDispatch: boolean = true;

    private threshold: number; //порог срабатывания

    private thresholdCrossed: boolean = false;

    private currentMaxAbsPeakValue: number = 0;
    private currentMaxPeakValue: number = 0;
    private currentMaxTimeValue: number = 0;

    private prevPeak: boolean = false;

    constructor(baseSource: ISensorDataProvider, threshold : number)
    {
        this.threshold = threshold;

        baseSource.onData.sub((sensor, data) => {
            
            for (let i = 0; i < data.data.length; i++) {
                let absValue = Math.abs(data.data[i]);

                if (this.thresholdCrossed)
                {
                    if (absValue > this.currentMaxAbsPeakValue)
                    {
                        this.currentMaxPeakValue = data.data[i];
                        this.currentMaxTimeValue = data.time[i];
                        this.currentMaxAbsPeakValue = absValue;
                    }
                    else
                    {
                        //пик закончился
                        if (absValue < this.threshold)
                        {
                            this.thresholdCrossed = false;
                            if (this.currentMaxAbsPeakValue)
                            {
                                this._onPeakDetected.dispatch(this, {
                                    peakValue: this.currentMaxPeakValue,
                                    time: this.currentMaxTimeValue
                                })
                            }
                        }
                    }
                }
                else
                {
                    if (absValue > this.threshold)
                    {
                        this.thresholdCrossed = true;
                        this.currentMaxPeakValue = data.data[i];
                        this.currentMaxAbsPeakValue = absValue;
                        this.currentMaxTimeValue = data.time[i];
                    }
                }
            }
        });
    }

    public SetThreshold = (threshold: number) =>
    {
        this.threshold = threshold;
    }

    get onPeakDetected(): IEvent<ISensorDataProvider, PeakEventArgs> {
        return this._onPeakDetected.asEvent();
    }

    get onData(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();
    }
}