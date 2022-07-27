import { SingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/SingleComponentSensor";
import { SerialWorker } from "./serial";
import { SerialBufferedWorker } from "./serialBuffer";

const InternalBufferSize = 10000;
// создаем датчик с COM port
export async function CreateSerialSensor(port: SerialPort) {
    var serialWorker = new SerialWorker(port);

    if (serialWorker != null) {
        let bufferedWorker = new SerialBufferedWorker(serialWorker);
        var sensor = new SingleComponentSensor(bufferedWorker);
        return sensor;
    }
    else {
        throw "Fail create sensor.";
    }
}