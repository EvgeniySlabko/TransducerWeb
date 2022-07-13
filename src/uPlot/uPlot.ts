import { timers } from "jquery";
import uPlot, { AlignedData, Axis, Options, Scale, Series } from "uplot";
import { Channel, ChannelCloseArgs, ChannelDataArgs, ChannelMessageArgs } from "../Channel/Channel/Channel";
import { dataEventArgs, SensorMessage } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ChannelLabel } from "../ViewsControllers/PlotViewController";
import { PlotBufferManager } from "./BufferManager";
import { GetSeries } from "./ComponetFactory/ComponentFactory";
import { AxeRangeChangeHandler } from "./PlotCommon";
import { Label, LegendItem, MyUPlotBase } from "./uPlotBase";


export type TraceInfo =
{
    channel: Channel;
    requireGap: boolean;  
    dataBufferIndex: number;
    curRange: number[];
    dataRatio: number;
    axis: Axis;
    series: Series;
    scale: Scale;
}

export class MyUPlot extends MyUPlotBase
{
  private bufferManager : PlotBufferManager | null = null;
  
  //private currentChannels: Channel[] = [];
  private channels : TraceInfo[] = [];
  
  private isInit: boolean = false;
  
  private params =  {
    gridTicks: 50,      //делений графика в секунду.
    streaming: true,    // режим автопрокрутки
  }
  
  constructor(element: HTMLElement)
  {
    super(element);

    this.BuildNewPlot([]);
    this.SetScale(0, this.controlarams.screenSize);

    window.addEventListener("resize", e => {
      this.plot?.setSize(this.getSize());
    });

    document.addEventListener('fullscreenchange', ()=>{
      if (document.fullscreenElement) {
          //console.log('Fullscreen');
      } else {
          //console.log('Normal');
      }
  });
  }

  public Reset()
  {
    this.isInit = false;
    this.channels.forEach((c, index) => {
      c.channel.onData.unsub(this.HandleData);
      c.channel.onClose.unsub(this.HandleClose);
      c.channel.onMessage.unsub(this.HandleMessage);
    });

    //while(this.options!.series.length > 1)
      //this.plot!.delSeries(1);
    this.channels = [];

    this.controlarams.screenSize = 5;
    this.SetScale(0, this.controlarams.screenSize);
  }

  public SetChannels(channels: Channel[])
  {
    if (this.isInit) throw "Already Init";
    if (channels.length == 0) "There are no channels";

    this.BuildNewPlot(channels);
    this.isInit = true;
  }
  
  private HandleMessage = (channel: Channel, args: ChannelMessageArgs) =>
  {
    //if (args.sensorMsgArgs.msgType === SensorMessage.StopStreaming)
    //      this.handleStopStreaming(channel);
    if (args.sensorMsgArgs.msgType === SensorMessage.StartStreaming)
          this.handleStartStreaming(channel);
  }
  
  private SetupChannel(channel: Channel, options: Options)
  { 
    let style = channel.Style;
  
    let axis: uPlot.Axis;
    let scale: uPlot.Scale;
    let range : number[];
    let series: uPlot.Series;
    let index = this.channels.length + 1;
    let dataRatio = 1;
    
    let sameTypeChannel = this.channels.find(c => c.channel.Style.valueType == style.valueType);

    if (sameTypeChannel)
    {
      let scaleName = <string>sameTypeChannel.axis.scale;

      series = GetSeries(scaleName);
      series.scale = scaleName;

      axis = sameTypeChannel.axis;
      scale = sameTypeChannel.scale;
      range = sameTypeChannel.curRange; 
      
      dataRatio = channel.Style.mnogitel / sameTypeChannel.channel.Style.mnogitel;

      if (channel.Style.range[0] < range[0]) 
        range[0] = channel.Style.range[0];
      if (channel.Style.range[1] > range[1]) 
        range[1] = channel.Style.range[1];
    }
    else
    {
      let scaleName = "y" + index.toString();               //for scale
      series = GetSeries(scaleName);
      series.scale = scaleName;
      
      axis = options.axes![index];
      scale = options.scales![scaleName];

      dataRatio = 1;
      range = [style.range[0], style.range[1]];

      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.axisColor;
      axis.show = true;
      axis.label = style.yTitle;
      axis.grid!.show = style.grid;
      scale.range = () => [range[0], range[1]];
    }

    series.show = channel.Style.visible;
    series.stroke = style.color;
    series.width = style.width;
    series.label = style.legendTitle;
    series.points!.stroke = style.color;
    options.series.push(series);
    

    let addLimit = (limitValue: number) => {
        let channelIndex = this.channels.length + 1;
        this.limits.push({
        axis: axis,
        color: () => channel.Style.color,
        label: channel.Style.legendTitle,
        range: () => range,
        value: limitValue * dataRatio,
        enabled: () => 
        {
          return (this.legendItems && this.legendItems.at(channelIndex) ? this.legendItems[channelIndex].isActive() : false) &&
          channel.Style.drawLimits;
        }
      })
    }
     
    if (channel.Style.maxValue)
      addLimit(channel.Style.maxValue);
    
    if (channel.Style.minValue)
      addLimit(channel.Style.minValue);

    let trace = {
      axis: axis,
      channel: channel,
      scale: scale,
      series: series,
      lastDataIndex: 0,
      requireGap: false,
      curRange: range,
      dataBufferIndex: index,
      dataRatio: dataRatio,
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
    var curIndex = this.channels.find(c => c.channel == channel)!.dataBufferIndex - 1;
    var lastTicksValue = args.data.time[args.data.time.length - 1];

    if (this.channels[curIndex].requireGap)
    {
      this.channels[curIndex].requireGap = false;
      let lastSegmentTime =  this.bufferManager!.GetLastSegmentTime(curIndex);
      this.bufferManager?.SetGap(curIndex, lastSegmentTime, args.data.time[0]);
    }

    let dataArgs: dataEventArgs = {
      data: args.data.data.map(v => v * this.channels[curIndex].dataRatio),
      time: args.data.time,
    } 
    this.bufferManager!.SetRange(curIndex, dataArgs);

    this.ScaleHandler();
  }
  
  private ScaleHandler = () =>
  {
    var max = this.plot?.scales["x"].max;
    if (max == null) {max = 0};
    if (this.bufferManager!.GetLastTime() > max - (this.controlarams.screenSize / 2) + 0.03 && this.params.streaming)
    {
      this.SetCurrentScale();
    }
  }
  
  public Clear() {
    this.bufferManager?.CleanSegments();
  }

  private BuildNewPlot = (channels: Channel[]) =>
  {
    //if (!dataBuff) dataBuff = <AlignedData>this.datBuf;
    this.limits = [];
    this.DestroyPlot();

    this.bufferManager = new PlotBufferManager(channels.length, 1 / this.params.gridTicks);

    this.channels.forEach((c, index) => {
      //this.clearTrace(index + 1);
      c.channel.onData.unsub(this.HandleData);
      c.channel.onClose.unsub(this.HandleClose);
      c.channel.onMessage.unsub(this.HandleMessage);
    });

    this.channels = [];

    let options = this.getOptions();

    channels.forEach((c, i) => {
      this.SetupChannel(c, options);

      c.onData.sub(this.HandleData);
      c.onClose.sub(this.HandleClose);
      c.onMessage.sub(this.HandleMessage);
    });

    setTimeout(() => this.InitAxes(), 100);
    this.BuildPlot(options, this.bufferManager.Source);
    this.plot!.setSize(this.getSize());
    this.SetScale(0, this.controlarams.screenSize);
  }

  public AddLabel(channelLabel: ChannelLabel)
  {
    let trace = this.channels.find(c => c.channel == channelLabel.channel)
    if (!trace) return;

    let label: Label =
    {
      time: channelLabel.time,
      text: channelLabel.text,
      scale: <string>trace.axis.scale,
      value: channelLabel.value,
    }

    this.labels.push(label);
  }

  public ClearLabels()
  {
    this.labels.splice(0, this.labels.length);
  }
  
  // Base plot callbacks

  protected setCursor(){
    if (!this.plot)
      return;
    
    let left = this.plot?.cursor.left;
    if (left)
    {
      for (let i = 0; i < this.bufferManager!.Segments; i++) {
          if (!this.legendItems) continue;

          let emptyValue = "--";
          let isActive = this.legendItems[i + 1].isActive();
          this.legendItems[i + 1].setValue(emptyValue);
          if (isActive)
          {
            let trace = this.channels[i];
            let xVal = this.plot.posToVal(left, 'x');
            let nearesrValue = this.bufferManager!.GetSegmentValue(i, xVal);
            let strValue = nearesrValue ? nearesrValue.toFixed(trace.channel.Style.legendValueAcurency).toString() : emptyValue
            this.legendItems[i + 1].setValue(strValue);
          } 
      }
    }
  }

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

  protected AxisZoom(index: number, dy: number): void {
    let dir = dy > 0 ? 1 : -1; 
        
    let channel = this.channels[index- 1];
    let curRange = channel.curRange;
    
    let rangeVal = curRange[1] - curRange[0];
    let dyTop = channel.channel.Style.rescaleRationTop * rangeVal;
    let dyBottom = channel.channel.Style.rescaleRationBottom * rangeVal;
    let newRange = [curRange[0] - dyBottom * dir, curRange[1] + dyTop * dir];

    channel.curRange[0] = newRange[0];
    channel.curRange[1] = newRange[1];
  }
  
  private SetCurrentScale()
  {
    
    let lastTime = this.bufferManager!.GetLastTime();
    let newMax = lastTime + this.controlarams.screenSize / 2;
    let newMin = lastTime - this.controlarams.screenSize / 2;
    this.SetScale(newMin, newMax);
  }

  protected SelectCommited(){
    this.params.streaming = false;
  }

  protected DbClick(e: any) 
  { 
      if (e.button == 0) {
        e.preventDefault();
        this.params.streaming = !this.params.streaming;
        this.SetCurrentScale();
      }
  }

  protected Wheel(e: any): boolean {
    if (this.params.streaming)
    {
      let dw = ((e.deltaY < 0) ? -1 : 1);
      let newSize = this.controlarams.screenSize + (this.controlarams.screenSize * dw * 0.1);
      this.controlarams.screenSize = newSize < 0.1 ? 0.1 : newSize;
      
      this.SetCurrentScale();
      return true;
    }

    return false;
  }

  protected AxisRangeChanged(index: number, dy: number)
  {
    AxeRangeChangeHandler(this.channels[index- 1].curRange, dy);
  }
}

