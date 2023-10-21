import { WebUSBDevice } from "usb";
import { CreateDecoderParameters } from "./DecoderParameters/DecoderParametersFactory";
import { CreateDefaultCommandFactory } from "./SensorCommand/DefaultCommandFactory";
import { CreateDefaultSensorCommandWriter } from "./SensorCommandWriter/SensorCommandWriter";
import { CreateStreamingSensorDataCommandEncoder } from "./SensorDataEncoder/SensorStreamerDataEncoder";
import { SensorWorker } from "./SensorWorker";
import { SingleComponentSensor } from "./SingleComponentSensor.ts/SingleComponentSensorStreamer";
import { WorkerIONativeWrapper } from "../IO/ReaderWriter/WorkerIONativeWrapper";
import { SensorConnectorNativeWorkerWrapper } from "../IO/Connector/SensorConnectorNativeWorkerWrapper";

export const Timeout = 10000;

export function CeateUsbNativeSensorWorker(device: WebUSBDevice): SensorWorker {
    
    let readerWriter = new WorkerIONativeWrapper(device.vendorId, device.productId);
    let connector = new SensorConnectorNativeWorkerWrapper(device.vendorId, device.productId);

    let commandFactory = CreateDefaultCommandFactory();
    let seensorDataCommandReceiver = CreateStreamingSensorDataCommandEncoder(readerWriter);
    let sensorCommandWriter = CreateDefaultSensorCommandWriter(readerWriter);

    let sensor = new SingleComponentSensor(connector, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, "Single component USB");
    return new SensorWorker(sensor, CreateDecoderParameters("USB"), "USB");
}

