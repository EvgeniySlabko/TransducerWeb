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
    }
    
    public async AddSensorHandler(channels: Channel[])
    {        
        channels.forEach(ch => this.channels.push(ch));
        this.plot.Reset();
        this.plot.SetChannels(this.channels);
    }

    public GetExistsChannels()
    {
        return this.channels;
    }

    public UploadSnapshot(snapshot: Snapshot)
    {
        this.plot.Reset();
        this.plot.FromSnapshot(snapshot);
    }

    public Reset()
    {
        this.plot.Reset();
    }

    public Clear()
    {
        this.plot.Clear();
    }
}