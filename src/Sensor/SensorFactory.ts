import { OpenWorkerArgs, WorkerCommandType, WorkerMessage } from "../UsbWorker/UsbWorkerDefinitions";

export async function OpenWorker(worker: Worker, productId: number, vendorId: number) : Promise<void>{
    return new Promise(async (resolve, reject) => {
        let messageHandler = (args: any) =>{
            let message = args.data as WorkerMessage;
            switch(message.command){
                case WorkerCommandType.Open:{
                    worker.removeEventListener("message", messageHandler);
                    resolve();
                    break;
                }

                case WorkerCommandType.Error:{
                    worker.removeEventListener("message", messageHandler);
                    let error = message.args as Error;
                    reject(error);
                    break;
                }
            }
        }
        worker.addEventListener("message", messageHandler)
        
        worker.postMessage(
            {
                command: WorkerCommandType.Open,
                args: {
                    vendorId: vendorId,
                    productId: productId,
                } as OpenWorkerArgs
            } as WorkerMessage)
    }); 
}

