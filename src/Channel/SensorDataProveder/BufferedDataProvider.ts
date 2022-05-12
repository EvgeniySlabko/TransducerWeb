import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные

export class BufferedSensorDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
    
    private bufferSize: number;
    private dataCount: number = 0;
    private dataBuffer: number[];
    private timeBuffer: number[];

    constructor(sensor: ISingleComponentSensor,
        bufferSize: number)
    {
        this.bufferSize = bufferSize;
        this.dataBuffer = new Array(this.bufferSize);
        this.timeBuffer = new Array(this.bufferSize);

        sensor.onClose.sub((sensor, msg) => 
        {
            this.dataCount = 0;
            this._onClose.dispatch(sensor, msg);
        });

        sensor.onMessage.sub((sensor, args) =>
        {
            this.dataCount = 0;
            this._onMessage.dispatch(sensor, args);
        });

        //messageSource?.onError?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
        sensor.onData.sub((sensor, data) => {

            for (let i = 0; i < data.time.length; i++) {
                this.dataBuffer[this.dataCount] = data.data[i];
                this.timeBuffer[this.dataCount] = data.time[i];

                this.dataCount++;
                if (this.dataCount == this.bufferSize)
                {
                    var args: dataEventArgs = {
                        data: this.dataBuffer,
                        time: this.timeBuffer,
                    }

                    this._onData.dispatch(sensor, args)
                    this.dataCount = 0;
                }
            }
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
}