import uPlot, { AlignedData, Axis, Scale, Series } from "uplot";
import { Channel } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { Snapshot } from "../ReportListener/Snapshot";
import { GetSeries } from "./ComponetFactory/ComponentFactory";
import { MyUPlotBase } from "./uPlotBase";


type TraceInfo =
{
    style: ChannelStyle
    axis: Axis;
    series: Series;
    scale: Scale;
    lastDataIndex: number;
    requireGap: boolean;  
    curRange: number[];
    dataBufferIndex: number;
}

export class MyUPlotViewer extends MyUPlotBase
{
  private count: number = 1;
  private currentChannels: Channel[] = [];
  private channels : TraceInfo[] = [];
  private options: uPlot.Options;
  
  private listening: boolean = false;
  private isInit: boolean = false;
  private buff : (number | null | undefined)[][] = new Array();
  
  private params =  {
    gridTicks: 50,      //делений графика в секунду.
    gridDx: 0,          // 
    screenSize: 5,      // текущий размер зума по оси x

    t0: 0,
    sh: 0,      // Самое большое значение времени на текущий момент
    th: 0,      // Самый большой индекс бубера оси x с данными на текущий момент
  }
  
  constructor(element: HTMLElement)
  {
    super(element);
    this.options = this.getOptions();    
    this.SetScale(0, this.params.screenSize);

    window.addEventListener("resize", e => {
      this.plot?.setSize(this.getSize());
    });

    window.addEventListener("fullscreenchange", () => {
      this.plot?.setSize(this.getSize());
    });
  }

  public FromSnapshot(snapshot: Snapshot)
  {
    if (this.listening) throw "Listening is going";

    var trackData = snapshot.GetTrackData();

    this.buff = new Array();
    
    for (let i = 0; i < trackData.length + 1; i++) {
        this.buff.push(new Array());
    }

    var maxTimeValues : number[] = [];
    trackData.forEach(t => {
      var lastSection = t.data[t.data.length - 1];
      var lastValue = lastSection.time[lastSection.time.length - 1];
      maxTimeValues.push(lastValue);
    });


    var dx = 1 / 5000;
    var toArrayIndex = (time: number) =>{
      return Math.floor(time / dx);
    }

    //определяем размер буфера 
    var maxTimeValue = Math.max(...maxTimeValues)
    var maxTimeIndex = toArrayIndex(maxTimeValue);
    for (let i = 0; i < this.buff.length; i++) {
        this.buff[i] = new Array(maxTimeIndex);
    }
    
    //Ставим значени япо умолчанию
    for (let i = 1; i <= trackData.length; i++) {
      for (let j = 0; j < maxTimeIndex; j++) {
        this.buff[i][j] = undefined;
      }
    }

    //Ставим время
    for (let i = 0; i < maxTimeIndex; i++) {
        this.buff[0][i] = i * dx;
    }

    //проставляем данные
    for (let i = 0; i < trackData.length; i++) {
      for (let j = 0; j < trackData[i].data.length; j++) {
        for (let k = 0; k < trackData[i].data[j].time.length; k++) {
          var times = trackData[i].data[j].time;
          var vals = trackData[i].data[j].data;

          var index = toArrayIndex(times[k]);
          if (index < maxTimeIndex)
          {
            this.buff[i + 1][index] = vals[k];
          }
          else
          {
            console.log();
          }
        }
      }
    }

    // определяем минимальное значение по оси x
    let minTime = undefined;
    for (let i = 1; i < this.buff.length; i++) {
      for (let j = 0; j < this.buff[i].length; j++) {
        if (this.buff[i][j] != undefined)
        {
          let currentFirstvalue = <number>this.buff[0][j];
          if (!minTime || currentFirstvalue < minTime)
            minTime = currentFirstvalue
        }
      }
    }

    var styles = snapshot.GetTrackData().map(t => t.style);
    
    this.BuildNewPlot(styles);
    this.params.t0 = <number>minTime;
    this.params.th = maxTimeIndex;
    this.params.sh = maxTimeValue;
  }

  private BuildNewPlot = (styles: ChannelStyle[]) =>
  {
    //if (!dataBuff) dataBuff = <AlignedData>this.datBuf;
    this.DestroyPlot();

    this.channels = [];

    this.options = this.getOptions();
    this.options.cursor!.points!.size = 8;
    styles.forEach((s, i) => {
      this.SetupChannel(s);
    });

    setTimeout(() => this.InitAxes(), 100);

    this.BuildPlot(this.options, this.buff);
    this.plot!.setSize(this.getSize());
    this.SetScale(0, this.params.screenSize);
  }

  private SetupChannel(style: ChannelStyle)
  { 
    let axis: uPlot.Axis;
    let scale: uPlot.Scale;
    let range : number[];
    let series: uPlot.Series;
    let index = this.count++;
    let dataRatio = 1;
    
    let sameTypeChannel = this.channels.find(c => c.style.valueType == style.valueType);
    if (sameTypeChannel)
    {
      let scaleName = <string>sameTypeChannel.axis.scale;
      series = GetSeries(scaleName);
      this.options.series.push(series);
      axis = sameTypeChannel.axis;
      scale = sameTypeChannel.scale;
      range = sameTypeChannel.curRange; 
    }
    else    
    {
      let scaleName = "y" + index.toString();               //for scale
      series = GetSeries(scaleName);
      series.scale = scaleName;
      this.options.series[index] = series;
      
      axis = this.options.axes![index];
      scale = this.options.scales![scaleName];
      axis.show = true;
  
      //scale.auto = false;
      range = [style.range[0], style.range[1]];
      //scale.range = () => {return [style.range[0], style.range[1]]};
      
      //axis.grid!.stroke = style.color;
      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.axisColor;
      axis.show = true;
      axis.label = style.legendTitle;
      axis.grid!.show = style.grid;
      
      //setInterval( () => {this.SetupAxis(index - 1)}, 100);
      scale.range = () => {return [range[0], range[1]]};
    }
    
    series.stroke = style.color;
    series.label = style.legendTitle;
    this.plot?.addSeries(series, 1);
    //this.plot?.addSeries(series, index);

    let trace = {
      style: style,
      axis: axis,
      scale: scale,
      series: series,
      lastDataIndex: 0,
      requireGap: false,
      curRange: range,
      dataBufferIndex: index,
    }

    this.channels.push(trace);
  }

 // Base plot callbacks
 protected AxisZoom(index: number, dy: number): void {
    let dir = dy > 0 ? 1 : -1; 
        
    let channel = this.channels[index- 1];
    let curRange = channel.curRange;
    
    let rangeVal = curRange[1] - curRange[0];
    let dyTop = channel.style.rescaleRationTop * rangeVal;
    let dyBottom = channel.style.rescaleRationBottom * rangeVal;
    let newRange = [curRange[0] - dyBottom * dir, curRange[1] + dyTop * dir];

    channel.curRange[0] = newRange[0];
    channel.curRange[1] = newRange[1];
    this.Redraw();
  }

  protected DbClick(e: any) {
    
      if (e.button == 0) {
        e.preventDefault();
        this.SetScale(this.params.t0, this.params.sh);
      }
  }

  protected Wheel(e: any): boolean {
      return false;
  }

  protected AxisRangeChanged(index: number, dy: number)
  {
    let channel = this.channels[index- 1];
    let range = this.channels[index- 1].curRange;
    let curRangeVal = range[1] - range[0];

    //вычисляем относительное смещение 
    let dVal = curRangeVal * dy;

    channel.curRange[0] += dVal;
    channel.curRange[1] += dVal;
    this.Redraw();
  }
}

