import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { CalculatePower } from "../../Common/Common";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class PowerDataProvider implements ISensorDataProvider
{
    private _onData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor,string>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private lastMainValue: number | undefined;
    private lastMainTime: number | undefined;

    constructor(speedSource: IEvent<ISingleComponentSensor, dataEventArgs>, 
                mainValueSource: IEvent<ISingleComponentSensor, dataEventArgs>, 
                messageSource: IEvent<ISingleComponentSensor,string> | null, 
                closeSource: IEvent<ISingleComponentSensor,string> | null)
    {
        closeSource?.sub((sensor, msg) => this._onClose.dispatch(sensor, msg));
        messageSource?.sub((sensor, msg) => this._onMessage.dispatch(sensor, msg));
        mainValueSource?.sub((sensor, args) =>{
            this.lastMainValue = args.data[args.data.length - 1];
            this.lastMainTime = args.time[args.time.length - 1];
        });

        speedSource?.sub((sensor, args) =>{
            if (this.lastMainValue && this.lastMainTime)
            {
                let power = CalculatePower(args.data[0], this.lastMainValue); 
                this._onData.dispatch(sensor, {
                    data: [power],
                    time: [args.time[0]],
                })

            }
        });
    }
    
    get onData(): EventDispatcher<ISingleComponentSensor, dataEventArgs> {
        return this._onData;
    }
    get onClose(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onClose;
    }
    get onMessage(): EventDispatcher<ISingleComponentSensor, string> {
        return this._onMessage;
    }
}