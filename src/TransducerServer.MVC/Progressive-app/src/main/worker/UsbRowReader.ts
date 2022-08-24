import { RingBuffer } from 'ring-buffer-ts';
import { sleep } from '../Common/Common';
export class UsbRowReader{
    private readonly device: USBDevice;
    private ringBuffer = new RingBuffer<Uint8Array>(20000);

    constructor(device: USBDevice) {
        this.device = device;
        this.Reading().then();
    }

    public async Read(): Promise<Uint8Array[]> {
        while(true)
        {
            console.log(this.ringBuffer.getBufferLength());
            let bufferLength = this.ringBuffer.getBufferLength();
            if (bufferLength > 0){
                 let data = this.ringBuffer.toArray();
                 let s = this.ringBuffer.getBufferLength();
                 this.ringBuffer.clear();
                 return data;
            }

            await sleep(100);
        }
    }

    public async Write(data: Uint8Array) : Promise<void> {
        let result = await this.device.transferOut(1, data);
        if (result.status != "ok") {
            console.warn("Usb wrete result status: ", result.status);
            throw "Reading error."
        }
    }
    
    private async Reading(){
        let result : USBInTransferResult = await this.device.transferIn(1, 1000);
            if (result.status === "ok"){
                let buffersize = result.data!.byteLength;
                if (result.data?.byteLength != 0){
                    this.ringBuffer.add(new Uint8Array(result.data?.buffer!));
                }

            sleep(100);
            await this.Reading();
        }else{
            return;
        }
    }
}