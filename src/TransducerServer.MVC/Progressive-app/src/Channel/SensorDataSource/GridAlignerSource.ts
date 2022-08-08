import { EventDispatcher, IEvent } from "strongly-typed-events";
import { Equals } from "../../Common/Common";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class GridAlignerSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private dt: number = 0.02;

    private currentGridTime = 0;
    private currentAvgValue = 0;
    private currentAvgCount = 0;

    constructor(baseSource: ISensorDataProvider) {

        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            if (args.msgType == SensorMessage.StopStreaming)
                this.reset();
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => { 
            let sensorData: SensorData = {
                data: [],
                time: [],
            }

            for (let i = 0; i < data.time.length; i++) {
                let gridTime = this.toGridTime(data.time[i]);
                if (!Equals(gridTime, this.currentGridTime)){
                    
                    if (this.currentAvgCount != 0){    
                        let avgValue = this.currentAvgValue / this.currentAvgCount;
                        sensorData.data.push(avgValue),
                        sensorData.time.push(this.currentGridTime)
                    }

                    this.reset();
                    this.currentGridTime = gridTime;
                }

                this.currentAvgValue += data.data[i];
                this.currentAvgCount++;
            }

            if (sensorData.time.length != 0)
                this._onData.dispatch(sensor, sensorData);
        });
    }

    toGridTime = (time: number) =>{
        let index = Math.trunc(time / this.dt);
        return  index * this.dt;
    }

    public set Dt(dt:  number)
    {
        this.dt = dt;
        this.reset();
    } 

    private reset = () =>{
        this.currentGridTime = 0;
        this.currentAvgValue = 0;
        this.currentAvgCount = 0;
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