import { UsbSensorIOWorker } from "../IO/Connector/UsbSensorConnector";
import { UsbRowReader as UsbRowReaderWriter } from "./UsbRowReader";
import { DataWorkerArgs, ErrorWorkerArgs, OpenWorkerArgs, ReadWorkerArgs, WorkerCommandType, WorkerMessage, WriteWorkerArgs } from "./UsbWorkerDefinitions";


let usbReaderWriter: UsbRowReaderWriter;
let usbSensorIOWorker: UsbSensorIOWorker;

addEventListener('message', (message: any) => {
    let command = message.data as WorkerMessage;

    switch (command.command) {
        case WorkerCommandType.Open:
            let openArgs = command.args as OpenWorkerArgs
            HandleOpen(openArgs).catch(ex => HandleError(ex as Error, WorkerCommandType.Open)).then();
            break;
            
        case WorkerCommandType.Read:
            let readArgs = command.args as ReadWorkerArgs
            HandleRead().catch(ex => HandleError(ex as Error, WorkerCommandType.Read)).then();
            break;
        
        case WorkerCommandType.Write:
            let writeArgs = command.args as WriteWorkerArgs
            HandleWrite(writeArgs.data).catch(ex => HandleError(ex as Error, WorkerCommandType.Write)).then();
            break;

        case WorkerCommandType.Close:
            HandleClose().then().catch(ex => HandleError(ex as Error, WorkerCommandType.Close));
            break;
    
        default:
            break;
    }
});

async function HandleOpen(args: OpenWorkerArgs){
    let devices =  await navigator.usb.getDevices();
    let device = devices.find(d => d.vendorId == args.vendorId && d.productId == args.productId)
    if (!device) return;
    console.debug(device.deviceProtocol);
    console.debug(device.configurations);
    await device.open()
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    usbReaderWriter = new UsbRowReaderWriter(device);
    usbSensorIOWorker = new UsbSensorIOWorker(device);
    usbReaderWriter.Error.sub(e => HandleError(e, WorkerCommandType.Error))
    usbSensorIOWorker.OnDisconnect.sub((args) =>{
        postMessage({
            command: WorkerCommandType.Close,
        } as WorkerMessage)
    });

    postMessage({
        command: WorkerCommandType.Open,
    } as WorkerMessage);
}

async function HandleRead(){
    let result = await usbReaderWriter.Read();
    postMessage({
        command: WorkerCommandType.Read,
        args: {
            data: result,
        } as DataWorkerArgs,
    } as WorkerMessage)
}

async function HandleWrite(bytes: Uint8Array) {
    await usbReaderWriter.Write(bytes);
    postMessage({
        command: WorkerCommandType.Write,
    } as WorkerMessage);
}

function HandleError(error: Error, command: WorkerCommandType){
    console.warn("Worker error: ", error);
    postMessage({
        command: WorkerCommandType.Error,
        args: {
            errorCommand: command,
            error: error,
        } as ErrorWorkerArgs
    } as WorkerMessage);
}

async function HandleClose() {
    await usbSensorIOWorker.Close();
}

