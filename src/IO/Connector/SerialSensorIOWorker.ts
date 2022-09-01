import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { SerialWorker } from "../ReaderWriter/SerialWorker";
import { ISensorConnector } from "./ISensorConnector";

export class SerialSensorConnector implements ISensorConnector {
    protected _disconnect = new SimpleEventDispatcher<SerialSensorConnector>();
    private serialWorker: SerialWorker;
    constructor(serialWorker: SerialWorker) {
        this.serialWorker = serialWorker;
        serialWorker.onDisconnect.sub(() => this._disconnect.dispatchAsync(this));
        this.OnDisconnect = this._disconnect.asEvent();
    }

    async Close(): Promise<void> {
        await this.serialWorker.Close();
    }

    public OnDisconnect: ISimpleEvent<SerialSensorConnector>;
}
