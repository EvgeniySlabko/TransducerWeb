import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISensorIOWorker } from "./ISensorIOWorker";

export class UsbSensorIOWorker implements ISensorIOWorker {
    protected _disconnect = new SimpleEventDispatcher<UsbSensorIOWorker>();
    private readonly device: USBDevice;
    constructor(device: USBDevice) {
        this.device = device;
        this.OnDisconnect = this._disconnect.asEvent();
        navigator.usb.addEventListener('disconnect', (event: USBConnectionEvent) => {
            //To do other comairs.
            if (event.device.deviceClass === this.device.deviceClass &&
                event.device.productId === this.device.productId)
                {
                    this._disconnect.dispatch(this);
                }
          });
    }

    async Close(): Promise<void> {
        await this.device.close();
        this._disconnect.dispatch(this);
    }

    public OnDisconnect: ISimpleEvent<UsbSensorIOWorker>;
}