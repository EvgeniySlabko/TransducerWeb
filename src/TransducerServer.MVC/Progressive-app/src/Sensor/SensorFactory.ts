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

export type DecoderType = "RS485" | "VCOM" | "Faker";

export const Timeout = 100;

export async function CeateSensorWorker(
  decoderType: DecoderType
): Promise<SensorWorker> {
  console.info("Creating sensor worker: ", decoderType);
  switch (decoderType) {
    case "RS485": {
      let ioWorker = await CreateIOWorker();
      return new SensorWorker(
        CreateRS485Sensor(ioWorker),
        CreateDecoderParameters(decoderType),
        decoderType
      );
    }
    case "VCOM": {
      let ioWorker = await CreateIOWorker();
      return new SensorWorker(
        CreateVCOMSensor(ioWorker),
        CreateDecoderParameters(decoderType),
        decoderType
      );
    }
    case "Faker": {
      return new SensorWorker(
        GreateFacker(),
        CreateDecoderParameters(decoderType),
        decoderType
      );
    }
    default:
      throw "Invalid decoder type";
  }
}

async function CreateIOWorker() {
  let port: SerialPort;
  try {
    console.info("Requesting port.");
    port = await navigator.serial.requestPort(); //запрашиваем выбор порта у пользователя
  } catch (ex) {
    console.warn("Error while requesting port: ", ex);
    throw ex;
  }

  let serialWorker = new SerialWorker(port);

  try {
    console.info("Opening port.");
    await serialWorker.OpenPort();
  } catch (ex) {
    console.warn("Error while opening port ", ex);
    throw ex;
  }

  let bufferedWorker = new SerialBufferedWorker(serialWorker);
  return bufferedWorker;
}

function CreateVCOMSensor(
  bufferedWorker: SerialBufferedWorker
): SingleComponentSensor {
  let sensorIOWorker = new SerialSensorIOWorker(bufferedWorker.baseWorker);
  let commandFactory = CreateDefaultCommandFactory();
  let seensorDataCommandReceiver =
    CreateStreamingSensorDataCommandEncoder(bufferedWorker);
  let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);

  return new SingleComponentSensor(
    sensorIOWorker,
    commandFactory,
    seensorDataCommandReceiver,
    sensorCommandWriter,
    "Single component VCOM"
  );
}

function GreateFacker(): Facker {
  return new Facker();
}

function CreateRS485Sensor(
  bufferedWorker: SerialBufferedWorker
): SingleComponentSensorExchanger {
  //TO DO Params.
  const deviceAddress = 1;
  let sensorIOWorker = new SerialSensorIOWorker(bufferedWorker.baseWorker);
  let commandFactory = CreateModBusCommandFactory(deviceAddress);
  let seensorDataCommandReceiver =
    CreateModBusSensorDataCommandEncoder(bufferedWorker);
  let sensorCommandWriter = CreateDefaultSensorCommandWriter(bufferedWorker);

  return new SingleComponentSensorExchanger(
    sensorIOWorker,
    commandFactory,
    seensorDataCommandReceiver,
    sensorCommandWriter,
    "Single component RS485"
  );
}
