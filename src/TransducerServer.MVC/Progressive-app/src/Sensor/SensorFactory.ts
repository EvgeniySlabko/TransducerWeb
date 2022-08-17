import { SerialBufferedWorker } from "../IO/SerialBufferWorker";
import { SerialWorker } from "../IO/SerialWorker";
import { SerialSensorIOWorker } from "../SensorIOWorker/SerialSensorIOWorker";
import { CreateDecoderParameters } from "./DecoderParameters/DecoderParametersFactory";
import { CreateDefaultCommandFactory } from "./SensorCommand/DefaultCommandFactory";
import { CreateModBusCommandFactory } from "./SensorCommand/ModBusCommandFactory";
import { CreateDefaultSensorCommandWriter } from "./SensorCommandWriter/SensorCommandWriter";
import { CreateModBusSensorDataCommandEncoder } from "./SensorDataEncoder/ModBusSensorDataEncoder";
import { CreateStreamingSensorDataCommandEncoder } from "./SensorDataEncoder/SensorStreamerDataEncoder";
import { SensorWorker } from "./SensorWorker";
import { Facker } from "./SingleComponentSensor.ts/Faker/FackerSensor";
import { SingleComponentSensorExchanger } from "./SingleComponentSensor.ts/Exchanger/SingleComponentSensorExchanger";
import { SingleComponentSensor } from "./SingleComponentSensor.ts/SingleComponentSensorStreamer";
import { BaudRate, Parity, StopBit } from "../Storage/ConnectionParams/ConnectionCommon";
import { GetRS485Params, GetVCOMParams } from "../Storage/ConnectionParams/ConnectionStorage";
import { UsbSensorIOWorker } from "../SensorIOWorker/UsbSensorIOWorker";
import { UsbWorker } from "../IO/UsbIOWorker";

export type DecoderType = "USB" | "RS485" | "VCOM" | "Faker";

export const Timeout = 100;

export async function CeateSensorWorker(decoderType: DecoderType): Promise<SensorWorker> {
    console.info("Creating sensor worker: ", decoderType);
    switch (decoderType) {
        case "RS485": {
            let port = await GetPort();
            let sensor = await CreateRS485Sensor(port);
            return new SensorWorker(sensor, CreateDecoderParameters(decoderType), decoderType);
        }
        case "VCOM": {
            let port = await GetPort();
            let sensor = await CreateVCOMSensor(port);
            return new SensorWorker(sensor, CreateDecoderParameters(decoderType), decoderType);
        }

        case "USB":{
            let device = await GetUsbDevice()
            let sensor = await CreateUSBSensor(device);
            return new SensorWorker(sensor, CreateDecoderParameters(decoderType), decoderType);
        }

        case "Faker": {
            return new SensorWorker(GreateFacker(), CreateDecoderParameters(decoderType), decoderType);
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
    let readerWriter = new UsbWorker(device);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(readerWriter);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(readerWriter);

    return new SingleComponentSensor(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component USB");
}

async function CreateVCOMSensor(serialPort: SerialPort): Promise<SingleComponentSensor> {
    let parameters = GetVCOMParams();
    let serialWorker = new SerialWorker(serialPort);
    await serialWorker.OpenPort(parameters.baudRate, parameters.parity, parameters.stopBits);
    let bufferedWorker = new SerialBufferedWorker(serialWorker);
    let sensorIOWorker = new SerialSensorIOWorker(bufferedWorker.baseWorker);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(bufferedWorker);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);
    
    return new SingleComponentSensor(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component VCOM");
}

function GreateFacker(): Facker {
    return new Facker();
}

async function CreateRS485Sensor(serialPort: SerialPort): Promise<SingleComponentSensorExchanger> {
    let parameters = GetRS485Params();
    let serialWorker = new SerialWorker(serialPort);
    await OpenPort(serialWorker, parameters.baudRate, parameters.parity, parameters.stopBits);
    let bufferedWorker = new SerialBufferedWorker(serialWorker);
    let sensorIOWorker = new SerialSensorIOWorker(bufferedWorker.baseWorker);
    let commandFactory = CreateModBusCommandFactory(parameters.address);
    let seensorDataCommandReceiver = CreateModBusSensorDataCommandEncoder(bufferedWorker);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);

    return new SingleComponentSensorExchanger(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component RS485");
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

async function GetUsbDevice() {
    let device: USBDevice;
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

