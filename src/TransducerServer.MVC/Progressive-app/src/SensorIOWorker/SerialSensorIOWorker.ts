import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { SerialWorker } from "../IO/SerialWorker";
import { ISensorIOWorker } from "./ISensorIOWorker";

export class SerialSensorIOWorker implements ISensorIOWorker {
    protected _disconnect = new SimpleEventDispatcher<SerialSensorIOWorker>();
    private serialWorker: SerialWorker;
    constructor(serialWorker: SerialWorker) {
        this.serialWorker = serialWorker;
        serialWorker.onDisconnect.sub(() => this._disconnect.dispatchAsync(this));
        this.OnDisconnect = this._disconnect.asEvent();
    }

    async Close(): Promise<void> {
        await this.serialWorker.Close();
    }

    public OnDisconnect: ISimpleEvent<SerialSensorIOWorker>;
}
