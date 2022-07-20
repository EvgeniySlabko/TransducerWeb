import { SerialWorker } from "./IO/serial";
import SerialBufferedWorker from "./IO/serialBuffer";
import { SensorComponentSensor } from "./Sensor/SingleComponentSensor.ts/sensor";

// создаем датчик с COM port
export async function CreateSerialSensor(port: SerialPort)
{
    var serialWorker = new SerialWorker(port);
    
    if (serialWorker != null)
    {
        let bufferedWorker = new SerialBufferedWorker(serialWorker, 10000);
        var sensor = new SensorComponentSensor(bufferedWorker);
        return sensor;
    }
    else
    {
        throw "Fail create sensor.";
    }
}