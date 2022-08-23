import { EventDispatcher, IEvent } from "strongly-typed-events";
import { sleep } from "../../Common/Common";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

// После в StopStreaming остаются данные во внутреннем буффере декодера.
// При следующем StartStreaming приходят старые данные с неправильным временем.
// На графике отображаются точки со старым временем.
// CutOffData отсекает эти данные.

export class CutOffDataSource implements ISensorDataProvider {
    private readonly at: number = 1; //погрешность

    private _onData = new EventDispatcher<ISingleComponentSensorBase, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensorBase, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensorBase, string>();

    private isStreaming: boolean = false;
    constructor(sensor: ISensorDataProvider) {
        sensor.onClose.sub((sensor, msg) => {
            this._onClose.dispatch(sensor, msg);
        });

        sensor.onMessage.sub((sensor, args) => {
            if (args.msgType === SensorMessage.StartStreaming) {
                sleep(30).then(() => {
                    this.isStreaming = true;
                });
            }

            if (args.msgType === SensorMessage.StopStreaming) {
                this.isStreaming = false;
            }

            this._onMessage.dispatch(sensor, args);
        });

        sensor.onData.sub((sensor, data) => {
            if (!this.isStreaming) {
                // console.debug("cutoff");
                return;
            }
            this._onData.dispatch(sensor, data);
        });
    }

    get onData(): IEvent<ISingleComponentSensorBase, SensorData> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensorBase, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensorBase, SensorMessageEventArgs> {
        return this._onMessage.asEvent();
    }
}
