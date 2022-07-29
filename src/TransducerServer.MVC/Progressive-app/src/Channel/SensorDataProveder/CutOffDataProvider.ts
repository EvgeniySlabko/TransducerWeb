import { EventDispatcher, IEvent } from "strongly-typed-events";
import { sleep } from "../../Common/Common";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

// После в StopStreaming остаются данные во внутреннем буффере декодера. 
// При следующем StartStreaming приходят старые данные с неправильным временем.
// На графике отображаются точки со старым временем.
// CutOffData отсекает эти данные.

export class CutOffDataProvider implements ISensorDataProvider {
    private readonly at: number = 1;          //погрешность

    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private isStreaming: boolean = false;
    private firstStart: boolean = false;
    constructor(sensor: ISensorDataProvider) {

        sensor.onClose.sub((sensor, msg) => {
            this._onClose.dispatch(sensor, msg);
        });

        sensor.onMessage.sub((sensor, args) => {
            if (args.msgType === SensorMessage.SetTime0){
                this.firstStart = true;
            }

            if (args.msgType === SensorMessage.StartStreaming){
                
                
                    sleep(30).then(() =>
                    {
                        this.isStreaming = true;
                        this.firstStart = false;
                    });
                
            }

            if (args.msgType === SensorMessage.StopStreaming){
                this.isStreaming = false;
            }

            this._onMessage.dispatch(sensor, args);
        });

        sensor.onData.sub((sensor, data) => {
            if (!this.isStreaming){
                console.log("cutoff");
                return;
            }
             this._onData.dispatch(sensor, data);     
        });
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