import { CreateAllSensorChannels } from "./Channel/Factory/ChannelFactory";
import { Plot} from "./Plot/plot";
import { Sensor } from "./Sensor/sensor";
import { GetFullSensorInfo } from "./Sensor/SensorInfoParser/SensorInfoCreator";
// принимает датчики. Отвечает за их подачу на форму
export class ViewController
{
    private sensors: Sensor[] = [];
    private pannel = document.getElementsByClassName('sensorPannel'); // заменить на pannel controller
    
    private plot: Plot;

    constructor(plot: Plot)
    {
        this.plot = plot;
    }


    public async AddSensor(sensor: Sensor)
    {
        if (sensor == null) throw "Sensor null";

        await sensor.Initialize();
        var fullSensorInfo = await GetFullSensorInfo(sensor);
        var channels = CreateAllSensorChannels(sensor, fullSensorInfo);
        await sensor.SynchronizeCurrentTime();
        await sensor.StartStreaming();
        for (let i = 0; i < 1; i++) {
            const id = await this.plot.AttachChannel(channels[i]);   
        }
    }

    public async StartStreaming()
    {
        for (let i = 0; i < this.sensors.length; i++) {
            this.sensors[i].StartStreaming();
        }
    }

    public async SyncTime()
    {
        for (let i = 0; i < this.sensors.length; i++) {
            this.sensors[i].SynchronizeCurrentTime();
        }
    }
}