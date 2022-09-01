import { EventDispatcher, SimpleEventDispatcher } from "strongly-typed-events";
import { PlotChannel } from "../Channel/Channel/PlotChannel";
import { Snapshot } from "../ReportListener/Snapshot";
import { MyUPlot as StreamingPlot } from "./StreamingPlot/StreamingPlot";
import { MyUPlotViewer as ViewerPlot } from "./Viewer/ViewerPlot";

export declare class ChannelLabel {
    channel: PlotChannel;
    time: number;
    text: string;
    value: number;
}

export enum PlotType {
    StremimgPlot,
    ViewerPlot,
}

export declare class PlotsManagerParameters {
    pointsPerSecond: number;
    maxStreamingPlotScreenSize: number;
}

export class PlotsManager {
    private readonly htmlElement: HTMLElement;
    private plotChannels: PlotChannel[] = [];
    private currentPlotType: PlotType = PlotType.StremimgPlot;
    private plot: StreamingPlot | ViewerPlot;

    private ready = new SimpleEventDispatcher<PlotsManager>();

    public get onReady(){
        return this.ready.asEvent();    
    }

    private parameters: PlotsManagerParameters = {
        maxStreamingPlotScreenSize: 100,
        pointsPerSecond: 50,
    };

    public get Container(): HTMLElement{
        return this.htmlElement;
    }

    public get ManagerParameters(): PlotsManagerParameters {
        return this.parameters;
    }

    constructor(element: any) {
        this.htmlElement = element;
        this.plot = this.GetStreamingPlot();
    }

    public SetParameters = (parameters: PlotsManagerParameters) => (this.parameters = parameters);

    public async SetChannels(channels: PlotChannel[]) {
        this.SetEmptyStreamingPlot();
        let streamingPlot = <StreamingPlot>this.plot;
        channels.forEach((c) => {
            this.AddChannel(c);
        });
        streamingPlot.SetChannels(channels);
    }

    public AddChannels(channels: PlotChannel[]) {
        this.SetEmptyStreamingPlot();
        channels.forEach((c) => c.onClose.sub(this.PlotChannelCloseHandler));
        let streamingPlot = this.plot as StreamingPlot;
        this.plotChannels.push(...channels);
        streamingPlot.SetChannels(this.plotChannels);
    }

    private SetEmptyStreamingPlot = () => {
        this.plot.DestroyPlot();
        this.plot = this.GetStreamingPlot();
        this.currentPlotType = PlotType.StremimgPlot;
    };

    public AddLabelForChannel(label: ChannelLabel) {
        if (this.currentPlotType === PlotType.StremimgPlot) {
            let streamingPlot = <StreamingPlot>this.plot;
            streamingPlot.AddLabel(label);
            return;
        }
    }

    private AddChannel(channel: PlotChannel) {
        this.plotChannels.push(channel);
        channel.onClose.sub((c, args) => {
            let index = this.plotChannels.findIndex((c) => c === channel);
            this.plotChannels.splice(index);
        });
    }

    public UploadSnapshot(snapshot: Snapshot) {
        this.plot.DestroyPlot();
        let viewer = this.GetViewer();
        viewer.FromSnapshot(snapshot);
        this.plot = viewer;
        this.currentPlotType = PlotType.ViewerPlot;
    }

    public Reset() {
        this.plot.DestroyPlot();
        this.plotChannels = [];
        this.plot = this.GetStreamingPlot();
    }

    public async MakeScreen(): Promise<string> {
        return await this.plot.GetScreen();
    }

    public Rebuild = () => {
        if (this.currentPlotType === PlotType.StremimgPlot) {
            this.plot.DestroyPlot();
            this.plot = this.GetStreamingPlot();
            this.AddChannels([]);
        }
    };

    public RebuildIfNessesary = () => {
        if (this.currentPlotType === PlotType.StremimgPlot) {
            let streamingPlot = this.plot as StreamingPlot;
            if (streamingPlot.Traces !== this.plotChannels.length) this.Rebuild();
        }
    };

    private PlotChannelCloseHandler = (plotChannel: PlotChannel) => {
        let index = this.plotChannels.indexOf(plotChannel);
        if (index !== -1) this.plotChannels.splice(index, 1);
    };

    private GetStreamingPlot = () : StreamingPlot =>
    {
        let streamingPlot = new StreamingPlot(this.htmlElement, {
            maxScreenSize: this.parameters.maxStreamingPlotScreenSize,
            pointsPerSecond: this.parameters.pointsPerSecond,
        });
        
        streamingPlot.onReady.sub((args) => this.ready.dispatch(this))
        return streamingPlot
    }

    private GetViewer = (): ViewerPlot => new ViewerPlot(this.htmlElement);

    public Clear = () => this.plot.Clear();
    public ClearLabels = () => this.plot.ClearLabels();
    public VerticalAlign = () => this.plot.VerticalAlign();
    public HorizontalAlign = () => this.plot.HorizontalAlign();
    public ZoomX = (step: number) => this.plot.ZoomX(step);
    public ZoomY = (step: number) => this.plot.ZoomY(step);
    public MoveX = (step: number) => this.plot.MoveX(step);
    public PressLeft = () => this.plot.PressLeft();
    public PressRight = () => this.plot.PressRight();

    public SetStreaming = () => {
        if (this.currentPlotType === PlotType.StremimgPlot) {
            let currentPlot = this.plot as StreamingPlot;
            currentPlot.SetStreaming();
        }
    };
}
