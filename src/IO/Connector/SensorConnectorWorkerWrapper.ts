import { EventDispatcher, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ErrorWorkerArgs, WorkerCommandType, WorkerMessage } from "../../UsbWorker/UsbWorkerDefinitions";
import { ISensorConnector } from "./ISensorConnector";

export class SensorConnectorWorkerWrapper implements ISensorConnector {
    private _disconnect = new SimpleEventDispatcher<SensorConnectorWorkerWrapper>();
    private _onErrorMessage = new EventDispatcher<ErrorWorkerArgs, ErrorWorkerArgs>();
    private _workerDisconnect = new SimpleEventDispatcher<void>();
    private readonly worker: Worker;

    constructor(worker: Worker) {
        this.worker = worker;

        this.OnDisconnect = this._disconnect.asEvent();

        worker.addEventListener("message", this.messageHandler);
    }

    async Close(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let closeHandler = () =>{
                this._onErrorMessage.unsub(closeErrorHandler);
                this._workerDisconnect.unsub(closeHandler);
                this._disconnect.dispatch(this);
                resolve();
            }
    
            let closeErrorHandler = (args: ErrorWorkerArgs, args2: ErrorWorkerArgs) =>{
                console.log();
                if (args.errorCommand === WorkerCommandType.Close){
                    this._onErrorMessage.unsub(closeErrorHandler);
                    this._workerDisconnect.unsub(closeHandler);
                    this._disconnect.dispatch(this);
                    reject(args.error);
                }
            }
    
            this._workerDisconnect.sub(closeHandler);
            this._onErrorMessage.sub(closeErrorHandler);
    
            this.worker.postMessage({
                command: WorkerCommandType.Close,
            } as WorkerMessage);
        });
    }

    private messageHandler = (args: any) => {
        let workerMesage = args.data as WorkerMessage;

        switch(workerMesage.command){
            case WorkerCommandType.Close:{
                this._workerDisconnect.dispatch();
                this.worker.terminate();
                break;
            }

            case WorkerCommandType.Error:{
                let error = workerMesage.args as ErrorWorkerArgs;
                //error.error;
                this._disconnect.dispatch(this);
                this.worker.terminate();
                this.worker.removeEventListener('message', this.messageHandler);
                break;
            }
        }
    }

    public OnDisconnect: ISimpleEvent<SensorConnectorWorkerWrapper>;
}