
import uPlot, { AlignedData, Axis, Options, Scale, Series } from "uplot";
import { Channel, ChannelCloseArgs, ChannelDataArgs, ChannelMessageArgs } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { sleep } from "../Common/Common";
import { Snapshot } from "../ReportListener/Snapshot";
import { SensorMessage } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { GetAxe, GetScale, GetSeries } from "./ComponetFactory/ComponentFactory";
import { AxeRangeChangeHandler } from "./PlotCommon";
import { MyUPlotBase } from "./uPlotBase";


export type TraceInfo =
{
    channel: Channel;
    axis: Axis;
    series: Series;
    scale: Scale;
    lastDataIndex: number;
    requireGap: boolean;  
    curRange: number[];
    dataBufferIndex: number;
}

export class MyUPlot extends MyUPlotBase
{
  private datBuf : (number | null | undefined)[][] = 
  [
    new Array(250000),

    new Array(250000),
    new Array(250000),
    new Array(250000),
    new Array(250000),

    new Array(250000),
    new Array(250000),
    new Array(250000),
    new Array(250000),

    new Array(250000),
    new Array(250000),
    new Array(250000),
    new Array(250000),
  ];
  
  //private currentChannels: Channel[] = [];
  private channels : TraceInfo[] = [];
  //private options: uPlot.Options;
  
  private listening: boolean = false;
  private isInit: boolean = false;

  
  private params =  {
    gridTicks: 50,      //делений графика в секунду.
    gridDx: 0,          // 
    screenSize: 5,      // текущий размер зума по оси x
    streaming: true,    // режим автопрокрутки

    sh: 0,      // Самое большое значение времени на текущий момент
    th: 0,      // Самый большой индекс бубера оси x с данными на текущий момент
  }
  
  constructor(element: HTMLElement)
  {
    super(element);
    this.Init();
    //this.options = this.getOptions();    
    this.BuildNewPlot([]);
    this.SetScale(0, this.params.screenSize);

    window.addEventListener("resize", e => {
      this.plot?.setSize(this.getSize());
    });

    document.addEventListener('fullscreenchange', ()=>{
      if (document.fullscreenElement) {
          console.log('Fullscreen');
      } else {
          console.log('Normal');
      }
  });

    setInterval(() => {
      this.plot?.redraw(true, true)
    }, 100);
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

    this.Init();
    this.params.th = 0;
    this.params.sh = 0;
    this.params.screenSize = 5;
    this.SetScale(0, this.params.screenSize);
  }
  
  public Clear()
  {
    this.Init();
    this.params.sh = 0;
    this.params.th = 0;
    this.SetScale(0, this.params.screenSize);
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
    if (args.sensorMsgArgs.msgType === SensorMessage.StopStreaming)
          this.handleStopStreaming(channel);
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
    
    let sameTypeChannel = this.channels.find(c => c.channel.Style.valueType == style.valueType);
    if (sameTypeChannel)
    {
      let scaleName = <string>sameTypeChannel.axis.scale;

      series = GetSeries(scaleName);
      series.scale = scaleName;

      axis = sameTypeChannel.axis;
      scale = sameTypeChannel.scale;
      range = sameTypeChannel.curRange; 
      
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

      range = [style.range[0], style.range[1]];

      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.color;
      axis.show = true;
      axis.stroke = style.color;
      axis.label = style.legendTitle;
      axis.grid!.show = style.grid;
      scale.range = () => [range[0], range[1]];
    }
    
    
    series.show = channel.Style.visible;
    series.stroke = style.color;
    series.label = style.legendTitle;
    options.series.push(series);

    let trace = {
      axis: axis,
      channel: channel,
      scale: scale,
      series: series,
      lastDataIndex: 0,
      requireGap: false,
      curRange: range,
      dataBufferIndex: index,
    }

    //this.plot?.axes.
    //this.RebuidPlot();
    //this.plot!.setData(this.datBuf);
    this.channels.push(trace);
  }
  
  private handleStopStreaming = (channel: Channel) =>
  {
    let index = this.channels.findIndex(t => t.channel === channel)
    let lastIndex = this.channels[index].lastDataIndex;
  }

  private handleStartStreaming = (channel: Channel) =>
  {
    let index = this.channels.findIndex(t => t.channel === channel);
    if (this.channels[index].lastDataIndex != 0)
      this.channels[index].requireGap = true; 
  }

  private HandleClose = (channel: Channel, msg: ChannelCloseArgs) =>
  {
      let index = this.channels.findIndex(c => c.channel === channel);
      this.clearTrace(this.channels[index].dataBufferIndex);
      //this.channels.splice(index, 1);

      channel.onData.unsub(this.HandleData);
      channel.onMessage.unsub(this.HandleMessage);


      
      //this.BuildNewPlot(this.channels.map(ch => ch.channel));

      //this.SetScale(0, this.params.screenSize);
      
      //this.plot?.setLegend({idx: index,}, false);
  }

  private HandleData = (channel: Channel, args: ChannelDataArgs) => 
  {
    var curIndex = this.channels.find(c => c.channel == channel)!.dataBufferIndex - 1;
    var lastTicksValue = args.data.time[args.data.time.length - 1];
    var xIndex = this.tickToGridIndex(lastTicksValue);        //вычисляем индекс последнего значения данных
    console.log(curIndex);
    let firstTickVal = args.data.time[0];
    let firstIndex = this.tickToGridIndex(firstTickVal);

    if (this.channels[curIndex].requireGap)
    {
      this.channels[curIndex].requireGap = false;
      for (let i = this.channels[curIndex].lastDataIndex + 1; i < firstIndex; i++) {
        this.datBuf[curIndex + 1][i] = null;
      }
    }
    if (this.params.th < xIndex) {this.params.th = xIndex; this.params.sh = lastTicksValue;}

    for (let k = 0; k < args.data.time.length; k++) //проставляем данные
    {
      var currentIndex = this.tickToGridIndex(args.data.time[k]);
      this.datBuf[curIndex + 1][currentIndex] = args.data.data[k];
    }

    this.channels[curIndex].lastDataIndex = xIndex;
    this.ScaleHandler();
    //this.plot?.redraw();
   
  }
  
  private ScaleHandler = () =>
  {
    var max = this.plot?.scales["x"].max;
    if (max == null) {max = 0};
    if (this.params.sh > max - (this.params.screenSize / 2) + 0.05 && this.params.streaming)
    {
      this.SetCurrentScale();
    }
  }
  
  private BuildNewPlot = (channels: Channel[]) =>
  {
    //if (!dataBuff) dataBuff = <AlignedData>this.datBuf;
    this.DestroyPlot();

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
    this.BuildPlot(options, this.datBuf);
    this.plot!.setSize(this.getSize());
    this.SetScale(0, this.params.screenSize);
  }

  private Init()
  {
    this.params.gridDx = 1 / this.params.gridTicks;

    //проставляем основной массив с данными
    for (let i = 1; i < this.datBuf.length; i++) {
      for (let j = 0; j < this.datBuf[0].length; j++) {
        this.datBuf[i][j] = undefined;
      }
    }

    for (let k = 0; k < this.datBuf[0].length; k++) {
      this.datBuf[0][k] = k * this.params.gridDx;
    }
  }

  private tickToGridIndex (sensorTimeValue: number) {
    return Math.floor(sensorTimeValue / this.params.gridDx ); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
  };

  private clearTrace = (dataBufferIndex: number) =>
  {
    for (let k = 0; k < this.datBuf[0].length; k++) {
      this.datBuf[dataBufferIndex][k] = undefined;
    }
  }

  // Base plot callbacks
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
    let newMax = this.params.sh + this.params.screenSize / 2;
    let newMin = this.params.sh - this.params.screenSize / 2;
    this.SetScale(newMin, newMax);
  }

  protected SelectCommited(){
    this.params.streaming = false;
  }

  protected DbClick(e: any) {
    
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
      let newSize =this.params.screenSize + (this.params.screenSize * dw * 0.1);
      this.params.screenSize = newSize < 0.1 ? 0.1 : newSize;
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

