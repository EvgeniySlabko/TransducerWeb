import { EventDispatcher } from "strongly-typed-events";
import { CalculatePower } from "../../Common/Common";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class PowerDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private lastMainValue: number | undefined = undefined;
    private lastMainTime: number | undefined = undefined;

    constructor(toqueDataSourse: ISensorDataProvider, speedDataSourse: ISensorDataProvider) {
        speedDataSourse.onClose.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        speedDataSourse.onMessage.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));

        toqueDataSourse.onData.sub((sensor, args) => {
            this.lastMainValue = args.data[args.data.length - 1];
            this.lastMainTime = args.time[args.time.length - 1];
        });

        speedDataSourse.onData.sub((sensor, args) => {
            if (this.lastMainValue != undefined && this.lastMainTime != undefined) {
                let power = CalculatePower(args.data[0], this.lastMainValue);
                this._onData.dispatch(sensor, {
                    data: [power],
                    time: [args.time[0]],
                });
            }
        });
    }

    get onData(): EventDispatcher<ISingleComponentSensor, SensorData> {
        return this._onData;
    }
    get onClose(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage;
    }
}
