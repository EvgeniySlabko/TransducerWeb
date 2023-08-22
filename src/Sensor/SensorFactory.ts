import { SensorConnectorWorkerWrapper } from "../IO/Connector/SensorConnectorWorkerWrapper";
import { SerialSensorConnector } from "../IO/Connector/SerialSensorIOWorker";
import { UsbSensorIOWorker } from "../IO/Connector/UsbSensorConnector";
import { SerialBufferedWorker } from "../IO/ReaderWriter/SerialBufferWorker";
import { SerialWorker } from "../IO/ReaderWriter/SerialWorker";
import { UsbReaderWriter } from "../IO/ReaderWriter/UsbReaderWriter";
import { ReaderWriterWorkerWrapper } from "../IO/ReaderWriter/WorkerIOWrapper";
import { BaudRate, StopBit } from "../Storage/ConnectionParams/ConnectionCommon";
import { GetRS485Params, GetVCOMParams } from "../Storage/ConnectionParams/ConnectionStorage";
import { OpenWorkerArgs, WorkerCommandType, WorkerMessage } from "../UsbWorker/UsbWorkerDefinitions";
import { DecoderType } from "../store/uiSlice";
import { CreateDecoderParameters } from "./DecoderParameters/DecoderParametersFactory";
import { CreateDefaultCommandFactory } from "./SensorCommand/DefaultCommandFactory";
import { CreateModBusCommandFactory } from "./SensorCommand/ModBusCommandFactory";
import { CreateDefaultSensorCommandWriter } from "./SensorCommandWriter/SensorCommandWriter";
import { CreateModBusSensorDataCommandEncoder } from "./SensorDataEncoder/ModBusSensorDataEncoder";
import { CreateStreamingSensorDataCommandEncoder } from "./SensorDataEncoder/SensorStreamerDataEncoder";
import { SensorWorker } from "./SensorWorker";
import { SingleComponentSensorExchanger } from "./SingleComponentSensor.ts/Exchanger/SingleComponentSensorExchanger";
import { Facker } from "./SingleComponentSensor.ts/Faker/FackerSensor";
import { SingleComponentSensor } from "./SingleComponentSensor.ts/SingleComponentSensorStreamer";

export const Timeout = 100;

export async function CeateSensorWorker(decoderType: DecoderType): Promise<SensorWorker> {
    console.info("Creating sensor worker: ", decoderType);
    switch (decoderType) {
        case "RS485": {
            let port = await GetPort();
            let worker = await CreateRS485SensorWorker(port);
            return worker;
        }
        case "VCOM": {
            let port = await GetPort();
            let worker = await CreateVCOMSensorWorker(port);
            return worker;
        }

        case "USB":{
            let usbWorker = await CreateUsbWorker();
            return usbWorker;
        }

        case "Faker": {
            return new SensorWorker(CreateFacker(), CreateDecoderParameters(decoderType), decoderType);
        }
        default:
            throw "Invalid decoder type";
    }
}

async function CreateUSBSensor(device: USBDevice){
    console.debug(device.deviceProtocol);
    console.debug(device.configurations);
    await device.open()
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    let sensorIOWorker = new UsbSensorIOWorker(device);
    let readerWriter = new UsbReaderWriter(device);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(readerWriter);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(readerWriter);

    return new SingleComponentSensor(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component USB");
}

async function CreateVCOMSensorWorker(serialPort: SerialPort): Promise<SensorWorker> {
    let parameters = GetVCOMParams();
    let serialWorker = new SerialWorker(serialPort);
    await serialWorker.OpenPort(parameters.baudRate, parameters.parity, parameters.stopBits);
    let bufferedWorker = new SerialBufferedWorker(serialWorker);
    let sensorIOWorker = new SerialSensorConnector(bufferedWorker.baseWorker);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(bufferedWorker);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);
    
    let sensor = new SingleComponentSensor(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component VCOM");
    return new SensorWorker(sensor, CreateDecoderParameters("VCOM"), "VCOM");
}

function CreateFacker(): Facker {
    return new Facker();
}

async function CreateRS485SensorWorker(serialPort: SerialPort): Promise<SensorWorker> {
    let parameters = GetRS485Params();
    let serialWorker = new SerialWorker(serialPort);
    await OpenPort(serialWorker, parameters.baudRate, parameters.parity, parameters.stopBits);
    let bufferedWorker = new SerialBufferedWorker(serialWorker);
    let sensorIOWorker = new SerialSensorConnector(bufferedWorker.baseWorker);
    let commandFactory = CreateModBusCommandFactory(parameters.address);
    let seensorDataCommandReceiver = CreateModBusSensorDataCommandEncoder(bufferedWorker);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);
    let sensor = new SingleComponentSensorExchanger(sensorIOWorker, commandFactory, seensorDataCommandReceiver, 
                                                    sensorCommandWriter, "Single component RS485");

    return new SensorWorker(sensor, CreateDecoderParameters("RS485"), "RS485");
}

async function OpenPort(serialWorker: SerialWorker, baudRate: BaudRate, parity: ParityType, stopBits: StopBit) : Promise<void>
{
    try {
        console.info("Opening port.");
        await serialWorker.OpenPort(baudRate, parity, stopBits);
    } catch (ex) {
        console.warn("Error while opening port ", ex);
        throw ex;
    }
}

async function GetPort() : Promise<SerialPort> {
    let port: SerialPort;
    try {
        console.info("Requesting port.");
        port = await navigator.serial.requestPort(); //запрашиваем выбор порта у пользователя
        return port;
    } catch (ex) {
        console.warn("Error while requesting port: ", ex);
        throw ex;
    }
}

async function GetUsbDevice() : Promise<USBDevice> {
    try{
        console.info("Requesting usb.");
        let device = await  navigator.usb.requestDevice({filters: []});
        return device
    }
    
    catch (ex){
        console.warn("Error while requesting usb: ", ex);
        throw ex;
    }
}

async function CreateUsbWorker() : Promise<SensorWorker> 
{
    let device = await GetUsbDevice();
    let worker = new Worker(new URL("../UsbWorker/Exchanger", import.meta.url));

    try
    {
        await OpenWorker(worker, device);
    }
    catch(ex)
    {
        console.log("Error while opening port: ", ex);
        worker.terminate();
    }

    let readerWriter = new ReaderWriterWorkerWrapper(worker);
    let connector = new SensorConnectorWorkerWrapper(worker);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(readerWriter);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(readerWriter);

    let sensor = new SingleComponentSensor(connector, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component USB");
    return new SensorWorker(sensor, CreateDecoderParameters("USB"), "USB");
}


async function OpenWorker(worker: Worker, device: USBDevice) : Promise<void>{
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
        
        let index = (await navigator.usb.getDevices()).findIndex(d => d === device);
        worker.postMessage(
            {
                command: WorkerCommandType.Open,
                args: {
                    deviceClass: device.deviceClass,
                    productId: device.productId,
                    deviceIndex: index
                } as OpenWorkerArgs
            } as WorkerMessage)
    }); 
}

