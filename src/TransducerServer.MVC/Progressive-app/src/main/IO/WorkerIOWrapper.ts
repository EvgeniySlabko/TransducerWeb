import { SimpleEventDispatcher } from "strongly-typed-events";
import { DataWorkerArgs, ErrorWorkerArgs, ReadWorkerArgs, WorkerCommandType, WorkerMessage, WriteWorkerArgs } from "../worker/WorkerTypes";
import { IReaderWriter } from "./IReaderWriter";

export class ReaderWriterWorkerWrapper implements IReaderWriter {
    private worker: Worker;
    private _onReadMessage = new SimpleEventDispatcher<DataWorkerArgs>();
    private _onErrorMessage = new SimpleEventDispatcher<ErrorWorkerArgs>();
    private _onWriteMessage = new SimpleEventDispatcher<void>();

    private buffer: Uint8Array[] = [];
    private currentFrameIndex = 1;
    private currentbyteIndex = 1;

    constructor(worker: Worker) { 
        this.worker = worker;
        worker.addEventListener('message', this.messageHandler)
    }

    public async Read(count: number): Promise<Uint8Array> {
        let data = new Uint8Array(count);
        let index = 0;

        while(true){
            if (index >= count)
                return data;

            if (this.currentFrameIndex >= this.buffer.length){
                this.buffer = await this.LoadData();
                this.currentFrameIndex = 0;
                this.currentbyteIndex = 0;
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
        return new Promise(async (resolve, reject) => {
            let readHandler = (args: DataWorkerArgs) =>{
                
                this._onErrorMessage.unsub(readErrorHandler);
                this._onReadMessage.unsub(readHandler);
                resolve(args.data);
            }

            let readErrorHandler = (args: ErrorWorkerArgs) =>{
                if (args.errorCommand === WorkerCommandType.Read){
                    this._onErrorMessage.unsub(readErrorHandler);
                    this._onReadMessage.unsub(readHandler);
                    reject(args.error);
                }
            }

            this._onReadMessage.sub(readHandler);
            this._onErrorMessage.sub(readErrorHandler);

            this.worker.postMessage({
                command: WorkerCommandType.Read,
                args:{
                    
                } as ReadWorkerArgs
            } as WorkerMessage);
        });
    }

    public async Write(data: Uint8Array) : Promise<void>{
        return new Promise(async (resolve, reject) => {
            let writeHandler = () =>{
                
                this._onErrorMessage.unsub(writeErrorHandler);
                this._onReadMessage.unsub(writeHandler);
                resolve();
            }

            let writeErrorHandler = (args: ErrorWorkerArgs) =>{
                this._onErrorMessage.unsub(writeErrorHandler);
                this._onReadMessage.unsub(writeHandler);
                if (args.errorCommand === WorkerCommandType.Write)
                    reject(args.error);
            }

            this._onWriteMessage.sub(writeHandler);
            this._onErrorMessage.sub(writeErrorHandler);

            this.worker.postMessage({
                command: WorkerCommandType.Write,
                args:{
                    data: data,
                } as WriteWorkerArgs
            } as WorkerMessage);
        });
    }

    private messageHandler = (args: any) =>{
        let workerMesage = args.data as WorkerMessage;

        switch(workerMesage.command){
            case WorkerCommandType.Read:{
                this._onReadMessage.dispatch(workerMesage.args as DataWorkerArgs);
                break;
            }

            case WorkerCommandType.Write:{
                this._onWriteMessage.dispatch();
                break;
            }

            case WorkerCommandType.Error:{
                this._onErrorMessage.dispatch(workerMesage.args as ErrorWorkerArgs);
                break;
            }
        }
    }
}