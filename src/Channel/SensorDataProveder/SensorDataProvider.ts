import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

export class SensorDataProvider implements ISensorDataProvider
{
    private _onData = new SimpleEventDispatcher<dataEventArgs>();
    private _onMessage = new SimpleEventDispatcher<string>();
    private _onClose = new SimpleEventDispatcher<string>();

    constructor(dataSource: ISimpleEvent<dataEventArgs> | null, messageSource: ISimpleEvent<string> | null, closeSource: ISimpleEvent<string> | null)
    {
        closeSource?.sub((msg: string) => this._onClose.dispatch(msg));
        dataSource?.sub((data: dataEventArgs) => this._onData.dispatch(data));
        messageSource?.sub((msg: string) => this._onMessage.dispatch(msg));
    }
    get onData(): SimpleEventDispatcher<dataEventArgs> {
        return this._onData;
    }
    get onClose(): SimpleEventDispatcher<string> {
        return this._onClose;
    }
    get onMessage(): SimpleEventDispatcher<string> {
        return this._onMessage;
    }
}