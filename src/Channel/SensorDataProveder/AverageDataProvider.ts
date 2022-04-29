import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import Sensor from "../../Sensor/sensor";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные
export class AverageSensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<Sensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<Sensor,string>();
    private _onClose = new EventDispatcher<Sensor, string>();

    private averageRatio: number;

    private averageCount: number = 0;
    private averageValue: number = 0;
    private t0: number = 0;
    private th: number = 0;

    constructor(dataSource: IEvent<Sensor, dataEventArgs> | null, 
                messageSource: IEvent<Sensor, string> | null, 
                closeSource: IEvent<Sensor, string> | null, averageRatio: number)
    {
        this.averageRatio = averageRatio;

        closeSource?.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        messageSource?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
        dataSource?.sub((sensor, data) => {

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

                    this.averageCount = 0;
                    this.averageValue = 0;
                }
            })
        });
    }
    get onData(): EventDispatcher<Sensor, dataEventArgs> {
        return this._onData;
    }
    get onClose(): EventDispatcher<Sensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<Sensor, string> {
        return this._onMessage;
    }
}