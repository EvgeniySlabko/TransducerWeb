import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ComputeDenCoeffs, ComputeNumCoeffs, filter } from "../../Other/Filter";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные

export class FilterDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private coefA: number[] = [];
    private coefB: number[] = [];
    private samplingRate: number;

    private f1: number;
    private f2: number;
    private FiltOrd = 4;
    constructor(sensor: ISensorDataProvider, samplingRate: number, fs: number)
    {
        this.samplingRate = samplingRate;
        this.f1 = 0.1;
        this.f2 = 0.2;
        this.recalc();
        sensor.onClose.sub((sensor, msg) => 
        {
            this._onClose.dispatch(sensor, msg);
        });

        sensor.onMessage.sub((sensor, args) =>
        {
            this._onMessage.dispatch(sensor, args);
        });

        //messageSource?.onError?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
        sensor.onData.sub((sensor, data) => {

           let filtered = this.Filter(data);
           this._onData.dispatch(sensor, filtered);
        });
    }

    get onData(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onData.asEvent();;
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();;
    }


    Filter = (data: dataEventArgs) : dataEventArgs =>
    {
        let f = filter(data.data, this.coefB, this.coefA);
        return  {
            data: f,
            time: data.time,
        }
    } 
    
    public SetF1 = (f1: number) =>
    {
       this.f1 = f1;
       this.recalc();
    }

    public SetF2 = (f2: number) =>
    {
       this.f2 = f2;
       this.recalc();
    }

    private recalc = () =>
    {
        let FrequencyBands= [ this.f1, this.f2 ];
        this.coefA = ComputeDenCoeffs(this.FiltOrd, FrequencyBands[0], FrequencyBands[1]);
        for (let k = 0; k < this.coefA.length; k++)
        {
            // console.log("DenC is: ", this.coefA[k]);
        }

        this.coefB = ComputeNumCoeffs(this.FiltOrd, FrequencyBands[0], FrequencyBands[1], this.coefA);
        for (let k = 0; k < this.coefB.length; k++)
        {
            // console.log("NumC is: ", this.coefB[k]);
        }
    }
}