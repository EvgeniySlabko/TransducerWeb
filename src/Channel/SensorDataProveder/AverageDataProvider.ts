import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные
export class AverageSensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,string>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private averageRatio: number;

    private averageCount: number = 0;
    private averageValue: number = 0;
    private t0: number = 0;
    private th: number = 0;

    constructor(baseSource: ISensorDataProvider,
                clearBufferTrigger: IEvent<ISingleComponentSensor,string> | null, 
                averageRatio: number)
    {
        this.averageRatio = averageRatio;

        clearBufferTrigger?.sub(() => {
            this.reset();
        });
        
        baseSource.onClose.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        baseSource.onMessage.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
        baseSource.onData.sub((sensor, data) => {

            if (this.averageCount == 0) this.t0 = data.time[0];

            data.data.forEach((v, i) =>{
                this.averageValue += v;
                this.averageCount++;
                if (this.averageCount == this.averageRatio)
                {
                    this.th = data.time[i];
                    var curVal = this.averageValue / this.averageCount;
                    var curTime = (this.th + this.t0) / 2;
                    this._onData.dispatch(sensor, {
                        data: [curVal],
                        time: [curTime],
                    } as dataEventArgs);

                    this.reset();
                }
            })
        });
    }

    private reset = () =>
    {
        this.averageCount = 0;
        this.averageValue = 0;
    }

    get onData(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, string> {
        return this._onMessage.asEvent();
    }
}