import { PlotChannelDataArgs, PlotChannelMessageArgs, PlotChannel } from "../../Channel/Channel/PlotChannel";
import { SensorData, SensorMessage } from "../../Sensor/SensorDefinitions";
import { Label, MyUPlotBase, PlotParameters, SeriesInfo } from "../PlotBase";
import { ChannelLabel } from "../PlotManager";
import { PlotBufferManager } from "./StreamingBufferManager";

export type TraceInfo = {
    requireGap: boolean;
    channel: PlotChannel;
    seriesInfo: SeriesInfo;
};

export class MyUPlot extends MyUPlotBase {
    private readonly screenOffset: number = 30; // отступ справа в процентах

    private bufferManager: PlotBufferManager | undefined;
    private traces: TraceInfo[] = [];
    private streaming: boolean = true;

    constructor(element: HTMLElement, parameters: PlotParameters) {
        super(element, parameters);
        this.BuildNewPlot([]);
    }

    public get Traces(): number {
        return this.traces.length;
    }

    protected GetData(): uPlot.AlignedData {
        return this.bufferManager ? this.bufferManager.Source : [[], []];
    }

    public SetChannels(channels: PlotChannel[]) {
        this.BuildNewPlot(channels);
    }

    private HandleMessage = (channel: PlotChannel, args: PlotChannelMessageArgs) => {
        if (args.sensorMsgArgs.msgType === SensorMessage.StartStreaming) this.StartStreamingHandler(channel);
    };

    private SetupChannel(channel: PlotChannel) {
        let seriesInfo = this.AddSeries(channel.Style);

        let trace: TraceInfo = {
            channel: channel,
            requireGap: false,
            seriesInfo: seriesInfo,
        };

        this.traces.push(trace);
    }

    private StartStreamingHandler = (channel: PlotChannel) => {
        let index = this.traces.findIndex((t) => t.channel === channel);
        if (this.bufferManager!.GetLastSegmentTime(index) != 0) this.traces[index].requireGap = true;
    };

    private HandleData = (channel: PlotChannel, args: PlotChannelDataArgs) => {
        var curIndex = this.traces.find((c) => c.channel == channel)!.seriesInfo.dataBufferIndex - 1;

        if (this.traces[curIndex].requireGap) {
            this.traces[curIndex].requireGap = false;
            let lastSegmentTime = this.bufferManager!.GetLastSegmentTime(curIndex);
            this.bufferManager?.SetGap(curIndex, lastSegmentTime, args.data.time[0]);
        }

        let dataArgs: SensorData = {
            data: args.data.data,
            time: args.data.time,
        };

        this.bufferManager!.SetRange(curIndex, dataArgs);

        this.params.th = this.bufferManager!.GetLastTime();
        this.ScaleHandler();
    };

    private ScaleHandler = () => {
        let max = this.params.range[1];
        let maxTime = this.bufferManager!.GetLastTime();

        if (maxTime > max - (this.params.screenSize() * this.screenOffset) / 100 + 0.03 && this.streaming) {
            this.SetCurrentScale();
        }
    };

    public Clear = () => {
        this.bufferManager?.CleanSegments();
        this.SetScale(-1, 6);
    };

    private BuildNewPlot = (channels: PlotChannel[]) => {
        this.DestroyPlot();

        this.bufferManager = new PlotBufferManager(() => [this.params.range[0], this.params.range[1]], {
            segments: channels.length,
            dt: this.params.dt(),
        });

        this.options = this.getOptions();
        this.traces = [];

        channels.forEach((c, i) => {
            this.SetupChannel(c);

            c.onData.sub(this.HandleData);
            c.onMessage.sub(this.HandleMessage);
        });

        this.BuildPlot();
        this.plot!.setSize(this.getSize());
        this.SetScale(0, this.params.screenSize());
        setTimeout(() => {
            this.plot!.over.addEventListener("mousedown", (e: any) => {
                if (e.button == 2) {
                    this.streaming = false;
                }
            });
        }, 100);
    };

    public AddLabel(channelLabel: ChannelLabel) {
        let trace = this.traces.find((c) => c.channel == channelLabel.channel);
        if (!trace) return;

        let label: Label = {
            time: channelLabel.time,
            text: channelLabel.text,
            scale: <string>trace.seriesInfo.axis.scale,
            value: channelLabel.value,
        };

        this.labels.push(label);
    }

    // Base plot callbacks

    protected SeriesDraw(i: number) {
        let channel = this.traces.at(i - 1);
        if (channel != undefined) {
            let existsChannel = channel;
            this.plot!.series[i].stroke = () => existsChannel.channel.Style.color;
            this.plot!.series[i].width = existsChannel.channel.Style.width;
            this.plot!.series[i].points!.stroke = () => existsChannel.channel.Style.color;
        }
    }

    private SetCurrentScale() {
        let lastTime = this.bufferManager!.GetLastTime();
        let newMax = lastTime;
        let newMin = lastTime - this.params.screenSize();
        let xRange = newMax - newMin;
        let timeOffset = (this.screenOffset / 100) * xRange;
        newMax += timeOffset;
        newMin += timeOffset;
        this.SetScale(newMin, newMax);
    }

    protected SelectCommited = () => (this.streaming = false);

    protected DbClick(e: any) {
        if (e.button == 0) {
            e.preventDefault();
            this.streaming = !this.streaming;
            this.SetCurrentScale();
        }
    }

    protected Wheel(e: any): boolean {
        if (this.streaming) {
            let dw = e.deltaY < 0 ? -1 : 1;
            let newSize = this.params.screenSize() + this.params.screenSize() * dw * 0.1;
            this.params.setScreenSize(newSize < 0.1 ? 0.1 : newSize);
            this.SetCurrentScale();
            return true;
        }

        return false;
    }

    public PressLeft() {
        this.streaming = false;
        super.PressLeft();
    }

    public PressRight() {
        this.streaming = false;
        super.PressRight();
    }

    public SetStreaming(state: boolean = true) {
        this.streaming = state;
        if (this.streaming) this.SetCurrentScale();
    }

    public get StreamingState() {
        return this.streaming;
    }

    public HorizontalAlign() {
        this.streaming = false;
        super.HorizontalAlign();
    }
}
