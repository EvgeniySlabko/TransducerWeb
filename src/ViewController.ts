import { CreateAllSensorChannels } from "./Channel/Channel/ChannelFactory";
import { MyUPlot } from "./uPlot/uPlot";
import { Plot} from "./Plotly/plot";
import { Sensor } from "./Sensor/sensor";
import { GetFullSensorInfo } from "./Sensor/SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "./Sensor/SensorWorker";
// принимает датчики. Отвечает за их подачу на форму
export class ViewController
{
    private sensors: [Sensor, SensorWorker][] = [];
    private pannel = document.getElementsByClassName('sensorPannel'); // заменить на pannel controller
    
    private plot: MyUPlot;

    constructor(plot: MyUPlot)
    {
        this.plot = plot;
    }

    public hide()
    {
        
    }

    public async AddSensor(sensor: Sensor)
    {
        if (sensor == null) throw "Sensor null";

        var sensorWOrker = new SensorWorker(sensor);
        this.sensors.push([sensor, sensorWOrker]);

        await sensorWOrker.Initialize();
        await sensorWOrker.SetT0();
        
        var fullSensorInfo = await GetFullSensorInfo(sensor);
        var channels = CreateAllSensorChannels(sensor, fullSensorInfo);
        //this.plot.xAxisMapper = (val: number) => val * 62500;
        for (let i = 0; i < 3; i++) {
            const id = await this.plot.AttachChannel(channels[i]);   
        }

        await sensorWOrker.StartReading();
        await sensorWOrker.StartStreaming();
    }

    public StartAll()
    {
        this.sensors.forEach(e => e[1].StartStreaming());
    }

    public StopAll()
    {
        this.sensors.forEach(e => e[1].StopStreaming());
    }

    public rrr()
    {
        //this.plot.rrr();
    }

    public async CloseAll()
    {
        for (let i = 0; i < this.sensors.length; i++) {
            //this.sensors[i].Close();
        }   
    }
}