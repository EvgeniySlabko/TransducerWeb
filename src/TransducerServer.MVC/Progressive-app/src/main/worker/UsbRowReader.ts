import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { sleep } from '../Common/Common';
export class UsbRowReader{
    private readonly device: USBDevice;
    private buffer: Uint8Array[] = [];
    private _error = new SimpleEventDispatcher<Error>();

    constructor(device: USBDevice) {
        this.device = device;
        this.Reading().catch(e =>{
            console.log(3);
        });
    }

    public async Read(): Promise<Uint8Array[]> {
        while(true)
        {
            //console.log(this.ringBuffer.getBufferLength());
            let bufferLength = this.buffer.length;
            if (bufferLength > 0){
                let data = this.buffer;
                this.buffer =[];
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
            result = await this.device.transferIn(1, 1);
            if (result.status === "ok"){
                if (result.data?.byteLength != 0){
                    this.buffer.push(new Uint8Array(result.data?.buffer!));
                }
            }
            sleep(100);
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