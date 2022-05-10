import { MyUPlot } from "../uPlot/uPlot";
import { GetFullSensorInfo } from "../Sensor/SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "../Sensor/SensorWorker";
import { DataCellsController } from "./CellsPannelController";
import { CreateAllSensorCellChannels } from "../Channel/Channel/CellChannelFactory";
import { SensorController, SensorControllerArgs } from "../SensorController";
import { Channel } from "../Channel/Channel/Channel";
import { sleep } from "../Common/Common";
import { Snapshot } from "../ReportListener/Snapshot";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
// принимает датчики. Отвечает за их подачу на форму

export class ViewController
{
    private plot: MyUPlot;
    private channels: Channel[] = [];
    constructor(plot: MyUPlot)
    {
        this.plot = plot;
        var container = <HTMLElement>document.getElementById("cell-container");
        
        

        //sensorService.onDispatch.addListener("Add", async (args : SensorControllerArgs) => {
           // await this.AddSensorHandler(args.sensor);
        //});
        
        // TODO remove handler
    }
    
    public async AddSensorHandler(channels: Channel[])
    {        
        //var sensorWOrker = new SensorWorker(sensor);
        //this.sensors.push([sensor, sensorWOrker]);    
        
        //await sensorWOrker.Initialize();
        //await sensorWOrker.SetT0();
        //await sensorWOrker.SetT0();
        //var fullSensorInfo = await GetFullSensorInfo(sensor);
        //var chartChannels = CreateAllSensorPlotChannels(sensor, fullSensorInfo);
        //var cellChannels = CreateAllSensorCellChannels(sensor, fullSensorInfo);
        
        channels.forEach(ch => this.channels.push(ch));

        this.plot.Reset();
        this.plot.StartListening();
        this.plot.SetChannels(channels);
        //chartChannels.forEach(ch => {
        //    this.channels.push(ch)
        //});

        //await sensorWOrker.StartReading();
        //await sensorWOrker.StartStreaming();
    }

    public GetExistsChannels()
    {
        return this.channels;
    }

    public UploadSnapshot(snapshot: Snapshot)
    {
        this.plot.StopListening();
        this.plot.FromSnapshot(snapshot);
    }
    

    public Clear()
    {
        this.plot.Clear();
    }

    /*
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
    */
}