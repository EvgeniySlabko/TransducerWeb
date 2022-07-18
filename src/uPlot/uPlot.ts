import { Channel, ChannelCloseArgs, ChannelDataArgs, ChannelMessageArgs } from "../Channel/Channel/Channel";
import { dataEventArgs, SensorMessage } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ChannelLabel } from "../ViewsControllers/PlotViewController";
import { PlotBufferManager } from "./BufferManager";
import { AxeRangeChangeHandler } from "./PlotCommon";
import { Label, LegendItem, MyUPlotBase, SeriesInfo } from "./uPlotBase";


export type TraceInfo =
{
    requireGap: boolean; 
    channel: Channel; 
    seriesInfo: SeriesInfo;
}

export class MyUPlot extends MyUPlotBase
{
  private bufferManager : PlotBufferManager | null = null;
  
  //private currentChannels: Channel[] = [];
  private channels : TraceInfo[] = [];

  private streaming: boolean = true;
  constructor(element: HTMLElement)
  {
    super(element);

    this.BuildNewPlot([]);
    this.SetScale(0, this.params.screenSize());
  }

  public Reset()
  {
    this.channels.forEach((c, index) => {
      c.channel.onData.unsub(this.HandleData);
      c.channel.onClose.unsub(this.HandleClose);
      c.channel.onMessage.unsub(this.HandleMessage);
    });

    this.channels = [];
    this.seriesInfos = [];
    this.limits = [];
    this.labels = [];
    this.params.setScreenSize(5);
    this.SetScale(0, 5);
  }

  public SetChannels(channels: Channel[])
  {
    this.BuildNewPlot(channels);
  }
  
  private HandleMessage = (channel: Channel, args: ChannelMessageArgs) =>
  {
    //if (args.sensorMsgArgs.msgType === SensorMessage.StopStreaming)
    //      this.handleStopStreaming(channel);
    if (args.sensorMsgArgs.msgType === SensorMessage.StartStreaming)
          this.handleStartStreaming(channel);
  }
  
  private SetupChannel(channel: Channel)
  { 
    let seriesInfo = this.AddSeries(channel.Style);

    let trace : TraceInfo = {
      channel: channel,
      requireGap: false,
      seriesInfo: seriesInfo,
    }

    //this.plot?.axes.
    //this.RebuidPlot();
    //this.plot!.setData(this.datBuf);
    this.channels.push(trace);
  }

  private handleStartStreaming = (channel: Channel) =>
  {
    let index = this.channels.findIndex(t => t.channel === channel);
    if (this.bufferManager!.GetLastSegmentTime(index) != 0)
      this.channels[index].requireGap = true; 
  }

  private HandleClose = (channel: Channel, msg: ChannelCloseArgs) =>
  {
      //let index = this.channels.findIndex(c => c.channel === channel);
      //this.bufferManager?.CleanSegment(this.channels[index].dataBufferIndex);
      //this.channels.splice(index, 1);

      //channel.onData.unsub(this.HandleData);
      //channel.onMessage.unsub(this.HandleMessage);

      //if (this.channels.length == 0)
        //this.BuildNewPlot([]);

      
      //this.BuildNewPlot(this.channels.map(ch => ch.channel));

      //this.SetScale(0, this.params.screenSize);
      
      //this.plot?.setLegend({idx: index,}, false);
  }

  private HandleData = (channel: Channel, args: ChannelDataArgs) => 
  {
    var curIndex = this.channels.find(c => c.channel == channel)!.seriesInfo.dataBufferIndex - 1;

    if (this.channels[curIndex].requireGap) {
      this.channels[curIndex].requireGap = false;
      let lastSegmentTime =  this.bufferManager!.GetLastSegmentTime(curIndex);
      this.bufferManager?.SetGap(curIndex, lastSegmentTime, args.data.time[0]);
    }

    let dataArgs: dataEventArgs = {
      data: args.data.data.map(v => v * this.channels[curIndex].seriesInfo.dataRatio),
      time: args.data.time,
    } 

    this.bufferManager!.SetRange(curIndex, dataArgs);
    this.params.th = this.bufferManager!.GetLastTime();
    this.ScaleHandler();
  }
  
  private ScaleHandler = () =>
  {
    var max = this.plot?.scales["x"].max;
    if (max == null) {max = 0};
    if (this.bufferManager!.GetLastTime() > max - (this.params.screenSize() / 2) + 0.03 && this.streaming)
    {
      this.SetCurrentScale();
    }
  }
  
  public Clear() {
    this.bufferManager?.CleanSegments();
    this.SetScale(-1, 6);
  }

  private BuildNewPlot = (channels: Channel[]) =>
  {
    this.DestroyPlot();
    this.bufferManager = new PlotBufferManager(channels.length, 1 / this.params.gridTicks);
    this.data = this.bufferManager.Source;
    this.options = this.getOptions();
    this.channels = [];

    channels.forEach((c, i) => {
      this.SetupChannel(c);

      c.onData.sub(this.HandleData);
      c.onClose.sub(this.HandleClose);
      c.onMessage.sub(this.HandleMessage);
    });

    this.BuildPlot();
    this.plot!.setSize(this.getSize());
    this.SetScale(0, this.params.screenSize());
  }

  public AddLabel(channelLabel: ChannelLabel)
  {
    let trace = this.channels.find(c => c.channel == channelLabel.channel)
    if (!trace) return;

    let label: Label =
    {
      time: channelLabel.time,
      text: channelLabel.text,
      scale: <string>trace.seriesInfo.axis.scale,
      value: channelLabel.value,
    }

    this.labels.push(label);
  }
  
  // Base plot callbacks

  protected SeriesDraw(i: number)
  {
    let channel = this.channels.at(i - 1);
    if (channel != undefined)
    {
      let existsChannel = channel;
      this.plot!.series[i].stroke = () => existsChannel.channel.Style.color;
      this.plot!.series[i].width = existsChannel.channel.Style.width;
      this.plot!.series[i].points!.stroke = () => existsChannel.channel.Style.color;
    }
  }
  
  private SetCurrentScale()
  {
    let lastTime = this.bufferManager!.GetLastTime();
    let newMax = lastTime + this.params.screenSize() / 2;
    let newMin = lastTime - this.params.screenSize() / 2;
    this.SetScale(newMin, newMax);
  }

  protected SelectCommited = () => this.streaming = false;

  protected DbClick(e: any) 
  { 
      if (e.button == 0) {
        e.preventDefault();
        this.streaming = !this.streaming;
        this.SetCurrentScale();
      }
  }

  protected Wheel(e: any): boolean {
    if (this.streaming)
    {
      let dw = ((e.deltaY < 0) ? -1 : 1);
      let newSize = this.params.screenSize() + (this.params.screenSize() * dw * 0.1);
      this.params.setScreenSize(newSize < 0.1 ? 0.1 : newSize);
      
      this.SetCurrentScale();
      return true;
    }

    return false;
  }
}

