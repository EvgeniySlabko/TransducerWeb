import { SingleComponentSensor } from "./SingleComponentSensor.ts/SingleComponentSensor";
import { SerialWorker } from "../IO/SerialWorker";
import { SerialBufferedWorker } from "../IO/SerialBufferWorker";

// создаем датчик с COM port
export async function CreateSerialSensor(port: SerialPort) {
    
    let serialWorker = new SerialWorker(port);
    try
    {
        await serialWorker.OpenPort();
    }
    catch
    {
        
    }

    if (serialWorker != null) {
        let bufferedWorker = new SerialBufferedWorker(serialWorker);
        var sensor = new SingleComponentSensor(bufferedWorker);
        return sensor;
    }
    else {
        throw "Fail create sensor.";
    }
}