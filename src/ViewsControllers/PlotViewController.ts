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
import { MyUPlotViewer } from "../uPlot/uPlotViewer";
// принимает датчики. Отвечает за их подачу на форму

export class ViewController
{
    private element: HTMLElement;
    private channels: Channel[] = [];

    private streamingMode: boolean = true;

    private plot: MyUPlot | MyUPlotViewer;

    constructor(element: HTMLElement)
    {
        this.element = element;
        this.plot = new MyUPlot(element);
    }
    
    public async SetChannels(channels: Channel[])
    {        
        if (this.streamingMode)
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset();
            this.channels = channels;
            streamingPlot.SetChannels(channels);
        }
    }

    public async AddChannels(channels: Channel[])
    {        
        if (this.streamingMode)
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset();
            for (let i = 0; i < channels.length; i++) {
                this.channels.push(channels[i]);
            }

            streamingPlot.SetChannels(this.channels);
        }
    }

    public GetExistsChannels()
    {
        return this.channels;
    }

    public UploadSnapshot(snapshot: Snapshot)
    {
        if (this.streamingMode)
        {
            /// To do check listening
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset(); 
            streamingPlot.DestroyPlot();
            this.plot = new MyUPlotViewer(this.element);    
            this.plot.FromSnapshot(snapshot); 
            this.streamingMode = false;  
        }
    }

    public Reset()
    {
        if (this.streamingMode)
        {
            /// To do check listening
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset();
        }
    }

    public Clear()
    {
        if (this.streamingMode)
        {
            /// To do check listening
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Clear();
        }
    }
}