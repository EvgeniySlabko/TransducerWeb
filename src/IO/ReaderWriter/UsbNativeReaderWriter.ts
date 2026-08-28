import { IReaderWriter } from "./IReaderWriter";

const usbEndpoint = 1;
export class UsbReaderWriter implements IReaderWriter {
    private readonly device: USBDevice;

    constructor(device: USBDevice) {
        this.device = device;
    }

    public async Read(count: number): Promise<Uint8Array> {
        let result : USBInTransferResult = await this.device.transferIn(usbEndpoint, count);
        if (result.status === "ok"){
            let data = new Uint8Array(count);
            for (let i = 0; i < result.data?.buffer.byteLength!; i++) {
                data[i] = result.data!.getInt8(i);
            }
            return data;
        }else{
            throw Error("Reading error. Usb status: " + result.status as string);
        }
    }

    public async Write(data: Uint8Array) {
        let result = await this.device.transferOut(usbEndpoint, data);
        if (result.status != "ok") {
            console.warn("Usb wrete result status: ", result.status);
            throw "Reading error."
        }
    }
}