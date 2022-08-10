import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//выдает данные не чаще fps.
export class DisplayValueDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private interval: NodeJS.Timer;
    
    private lastValue: number | undefined;
    private lastTime: number | undefined;
    private sender: ISingleComponentSensor | undefined;
    private wasData: boolean = false;

    constructor(baseSource: ISensorDataProvider, fps: number) {

        baseSource.onClose.sub((sender, args) => {
            clearInterval(this.interval);
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sensor, data) => {
            this.lastValue = data.data[data.data.length - 1];
            this.lastTime = data.time[data.data.length - 1];
            this.sender = sensor;
            this.wasData = true;
        });

        let delay = 1000 / fps;
        this.interval = setInterval(() => {
            if (this.wasData){
                this._onData.dispatch(this.sender as ISingleComponentSensor, {
                    data: [this.lastValue as number],
                    time: [this.lastTime as number]
                });

                this.wasData = false;
            }
        }, delay);
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