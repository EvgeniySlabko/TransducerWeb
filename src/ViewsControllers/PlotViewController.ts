import { MyUPlot } from "../uPlot/uPlot";
import { Channel } from "../Channel/Channel/Channel";
import { Snapshot } from "../ReportListener/Snapshot";
import { MyUPlotViewer } from "../uPlot/uPlotViewer";
import { Label } from "../uPlot/uPlotBase";

export declare class ChannelLabel
{
    channel: Channel;
    time: number;
    text: string;
    value: number;
}

export class ViewController
{
    private element: HTMLElement;
    private channels: Channel[] = [];

    private streamingMode: boolean = true;

    private plot: MyUPlot | MyUPlotViewer;

    constructor(element: any)
    {
        this.element = element;
        this.plot = new MyUPlot(element);
    }
    
    public async SetChannels(channels: Channel[])
    {        
        if (!this.streamingMode)
        {
            this.streamingMode = true;
            this.plot.DestroyPlot();
            this.plot = new MyUPlot(this.element);    
        }

        let streamingPlot = <MyUPlot>this.plot;
        streamingPlot.Reset();
        for (let i = 0; i < channels.length; i++) {
            this.AddChannel(channels[i]);
        }

        streamingPlot.SetChannels(channels);
        
    }

    public AddLabelForChannel(label: ChannelLabel)
    {
        if (this.streamingMode)
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.AddLabel(label);
        }
    }

    public ClearLabels()
    {
        if (this.streamingMode)
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.ClearLabels();
        }
    }

    public async AddChannels(channels: Channel[])
    {        
        if (this.streamingMode)
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset();
            for (let i = 0; i < channels.length; i++) {
                this.AddChannel(channels[i]);
            }

            streamingPlot.SetChannels(this.channels);
        }
    }

    private AddChannel(channel: Channel)
    {
        this.channels.push(channel);
        channel.onClose.sub((c, args) => {
            let index = this.channels.findIndex(c => c == channel);
            this.channels.splice(index);
        })
    }

    public UploadSnapshot(snapshot: Snapshot)
    {
        if (this.streamingMode)
            this.Reset();
            
        this.plot.DestroyPlot();
        this.plot = new MyUPlotViewer(this.element);    
        let plotViewer = <MyUPlotViewer>this.plot;
        plotViewer.FromSnapshot(snapshot); 
        this.streamingMode = false;  
    }

    public Reset()
    {
        if (!this.streamingMode)
        {
            this.plot.DestroyPlot();
            this.streamingMode = true;
            this.plot = new MyUPlot(this.element);
        }
        else
        {
            let streamingPlot = <MyUPlot>this.plot;
            streamingPlot.Reset();
        }
    }

    public async MakeScreen() : Promise<string>
    {
        return await this.plot.GetScreen();
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