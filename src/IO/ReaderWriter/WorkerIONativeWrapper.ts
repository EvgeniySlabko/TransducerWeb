import { IReaderWriter } from "./IReaderWriter";

export class WorkerIONativeWrapper implements IReaderWriter {
    private buffer: Uint8Array[] = [];
    private currentbyteIndex = 1;
    private currentFrameIndex = 1;
    private vendorId: number;
    private productId: number;

    constructor(vendorId: number, productId: number) { 
        this.vendorId = vendorId;
        this.productId = productId;
    }

    public async Read(count: number): Promise<Uint8Array> {
        let data = new Uint8Array(count);
        let index = 0;

        while(true){
            if (index >= count)
                return data;

            if (this.currentFrameIndex >= this.buffer.length){
                try
                {
                    this.buffer = await this.LoadData();
                    this.currentFrameIndex = 0;
                    this.currentbyteIndex = 0;
                }
                catch(ex)
                {
                    console.log(ex);
                }
            }
            
            let existedBytes = this.buffer[this.currentFrameIndex].length - this.currentbyteIndex;
            let existetFill = count - index;
            if (existedBytes >= existetFill)
            {
                for (let j = 0; j < existetFill; j++) {
                    data[index++] = this.buffer[this.currentFrameIndex][this.currentbyteIndex++]
                }

                return data;
            }
            else
            {
                for (let j = 0; j < existedBytes; j++) {
                    data[index++] = this.buffer[this.currentFrameIndex][this.currentbyteIndex++]
                }
            }

            if (this.currentbyteIndex >= this.buffer[this.currentFrameIndex].length)
            {
                this.currentFrameIndex++;
                this.currentbyteIndex = 0;
            }
        }
    }

    private async LoadData() : Promise<Uint8Array[]> {
        const result = await window.electronApi.transferIn(this.vendorId, this.productId, 1, 1000);
        return result;
    }

    public async Write(data: Uint8Array) : Promise<void>{
        const result = await window.electronApi.transferOut(this.vendorId, this.productId, 1, data);
    }
}