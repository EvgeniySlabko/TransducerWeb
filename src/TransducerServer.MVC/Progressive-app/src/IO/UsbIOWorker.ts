import { IReaderWriter } from "./IReaderWriter";

export class UsbWorker implements IReaderWriter {
    private readonly device: USBDevice;

    constructor(device: USBDevice) {
        this.device = device;
    }

    public async Read(count: number): Promise<Uint8Array> {
        let result = await this.device.transferIn(1, count);
        if (result.status == "ok")
        {
            let data = new Uint8Array(count);
            for (let i = 0; i < result.data?.buffer.byteLength!; i++) {
                data[i] = result.data!.getInt8(i);
            }
            return data;
        }else
        {
            throw "Reading error."
        }
    }

    public async Write(data: Uint8Array) {
        await this.device.transferOut(1, data);
    }

    public async Close(): Promise<void> {
        await this.device.close();
    }
}