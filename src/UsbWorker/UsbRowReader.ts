import { RingBuffer } from 'ring-buffer-ts';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { sleep } from '../Common/Common';
export class UsbRowReader{
    private readonly device: USBDevice;
    private buffer = new RingBuffer<Uint8Array>(20000);
    private _error = new SimpleEventDispatcher<Error>();

    constructor(device: USBDevice) {
        this.device = device;
        this.Reading().then();
    }

    public async Read(): Promise<Uint8Array[]> {
        while(true)
        {
            let bufferLength = this.buffer.getBufferLength();
            if (bufferLength > 0){
                //console.log(bufferLength);
                let data = this.buffer.toArray();
                this.buffer.clear();
                return data;
            }

            await sleep(10);
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
        let result : USBInTransferResult;
        try{
            result = await this.device.transferIn(1, 10000);
            if (result.status === "ok"){
                if (result.data?.byteLength != 0){
                    this.buffer.add(new Uint8Array(result.data?.buffer!));
                }
            }
            sleep(10);
            await this.Reading();
        }
        catch(e: any)
        {
            if (e instanceof DOMException && e.code !== 20)
            {
                this._error.dispatch(e)
            }

            return;
        }
    }

    public get Error() : ISimpleEvent<Error>{
        return this._error.asEvent();
    }
}