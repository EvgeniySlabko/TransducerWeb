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

export type DecoderType = "RS485" | "VCOM" | "Faker";

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
        case "Faker": {
            return new SensorWorker(GreateFacker(), CreateDecoderParameters(decoderType), decoderType);
        }
        default:
            throw "Invalid decoder type";
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
