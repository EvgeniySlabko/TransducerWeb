import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISensorConnector } from "./ISensorConnector";

export class SensorConnectorNativeWorkerWrapper implements ISensorConnector {
    private readonly vendorId: number;
    private readonly productId: number;
    protected _disconnect = new SimpleEventDispatcher<SensorConnectorNativeWorkerWrapper>();
    constructor(vendorId: number, productId: number) {
        this.vendorId = vendorId;
        this.productId = productId;
        this.OnDisconnect = this._disconnect.asEvent();

        window.electronApi?.handleDeviceClosed(this.closeHandler)
    }

    async Close(): Promise<void> {
        window.electronApi?.close(this.vendorId, this.productId);
    }

    private closeHandler = (vendorId: number, productId: number) => {
        if(vendorId === this.vendorId && productId === this.productId)
            this._disconnect.dispatch(this)
    }

    public OnDisconnect: ISimpleEvent<SensorConnectorNativeWorkerWrapper>;
}