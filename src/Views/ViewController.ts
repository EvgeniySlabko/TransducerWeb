import { CreateAllSensorChannels as CreateAllSensorPlotChannels } from "../Channel/Channel/ChannelFactory";
import { MyUPlot } from "../uPlot/uPlot";
import { GetFullSensorInfo } from "../Sensor/SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "../Sensor/SensorWorker";
import { CellContainerController } from "../CellContainerController";
import { CreateAllSensorCellChannels } from "../Channel/Channel/CellChannelFactory";
import { SensorController, SensorControllerArgs } from "../SensorController";
import { Channel } from "../Channel/Channel/Channel";
import { sleep } from "../Common/Common";
import { Snapshot } from "../ReportListener/Snapshot";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
// принимает датчики. Отвечает за их подачу на форму

export class ViewController
{
    private sensors: [ISingleComponentSensor, SensorWorker][] = [];
    private pannel = document.getElementsByClassName('sensorPannel'); // заменить на pannel controller
    
    private plot: MyUPlot;
    private cellsController: CellContainerController;
    private channels: Channel[] = [];
    constructor(plot: MyUPlot, sensorService: SensorController)
    {
        this.plot = plot;
        var container = <HTMLElement>document.getElementById("cell-container");
        this.cellsController = new CellContainerController(container);
        
        sensorService.onDispatch.addListener("Add", async (args : SensorControllerArgs) => {
            await this.AddSensorHandler(args.sensor);
        });
        
        // TODO remove handler
    }
    
    private async AddSensorHandler(sensor: ISingleComponentSensor)
    {
        if (sensor == null) throw "Sensor null";
        
        var sensorWOrker = new SensorWorker(sensor);
        this.sensors.push([sensor, sensorWOrker]);    
        
        await sensorWOrker.Initialize();
        //await sensorWOrker.SetT0();
        await sensorWOrker.SetT0();
        var fullSensorInfo = await GetFullSensorInfo(sensor);
        var chartChannels = CreateAllSensorPlotChannels(sensor, fullSensorInfo);
        var cellChannels = CreateAllSensorCellChannels(sensor, fullSensorInfo);
        
        cellChannels.forEach(ch => this.cellsController.pushChannel(ch));

        this.plot.Reset();
        chartChannels.forEach(ch => {
            this.channels.push(ch)
        });

        this.plot.SetChannels(this.channels);
        //await sensorWOrker.StartReading();
        //await sensorWOrker.StartStreaming();
    }
    
    public Upload(snapshot: Snapshot)
    {

    }

    public UploadSnapshot(snapshot: Snapshot)
    {
        this.plot.StopListening();
        this.plot.FromSnapshot(snapshot);
    }

    public GetExistsChannels() : Channel[]
    {
        return this.channels;
    }
    
    public async StartAll()
    {
        this.plot.StartListening();
        this.sensors.forEach(async e => {
            await e[1].SetT0();
            await e[1].StartReading();
            await e[1].StartStreaming();
        });
    }
    
    public async StopAll()
    {
        this.plot.StopListening();
        this.sensors.forEach(async e => {
            await e[1].StopStreaming();
            await e[1].StopReading();
        });

        await sleep(500).then(() => this.plot.Clear());
    }
}