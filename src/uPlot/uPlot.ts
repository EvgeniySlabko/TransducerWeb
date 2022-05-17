import uPlot, { AlignedData, Axis, Scale, Series } from "uplot";
import { Channel, ChannelCloseArgs, ChannelDataArgs, ChannelMessageArgs } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { sleep } from "../Common/Common";
import { Snapshot } from "../ReportListener/Snapshot";
import { SensorMessage } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { GetAxe, GetSeries } from "./ComponetFactory/ComponentFactory";


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

export class MyUPlot
{
  private plot: uPlot | undefined;

  private datBuf : (number | null | undefined)[][] = 
  [
    new Array(200000),

    new Array(200000),
    new Array(200000),
    new Array(200000),
    new Array(200000),

    new Array(200000),
    new Array(200000),
    new Array(200000),
    new Array(200000),

    new Array(200000),
    new Array(200000),
    new Array(200000),
    new Array(200000),
  ];
  
  private currentChannels: Channel[] = [];
  private channels : TraceInfo[] = [];
  private element: HTMLElement;
  private options: uPlot.Options;
  
  private listening: boolean = false;
  private isInit: boolean = false;

  
  private params =  {
    gridTicks: 50,     //делений графика в секунду.
    gridDx: 0,          //
    screenSize: 5,      //
    streaming: true,
    
    screenRollingGap: 2,

    rightGap: 5,
    sh: 0,
    th: 0,
    t0: 0,
  }
  
  constructor(element: HTMLElement)
  {
    this.Init();
    this.element = element;
    this.options = this.getOptions();    
    this.BuildNewPlot([]);
    this.SetScale(0, this.params.screenSize);

    window.addEventListener("resize", e => {
      this.plot?.setSize(this.getSize());
    });

    window.addEventListener("fullscreenchange", () => {
      this.plot?.setSize(this.getSize());
    });

    setInterval(() => {
      this.plot?.redraw(true, true)
    }, 100);
  }

  public FromSnapshot(snapshot: Snapshot)
  {
    if (this.listening) throw "Listening is going";

    var trackData = snapshot.GetTrackData();

    var buff : (number | null | undefined)[][] = new Array();
    
    for (let i = 0; i < trackData.length; i++) {
      buff.push(new Array());
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
    for (let i = 0; i < this.datBuf.length; i++) {
      buff[i] = new Array(maxTimeIndex);
    }
    
    //Ставим значени япо умолчанию
    for (let i = 1; i <= trackData.length; i++) {
      for (let j = 0; j < maxTimeIndex; j++) {
        buff[i][j] = undefined;
      }
    }

    //Ставим время
    for (let i = 0; i < maxTimeIndex; i++) {
      buff[0][i] = i * dx;
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
            buff[i + 1][index] = vals[k];
          }
          else
          {
            console.log();
          }
        }
      }
    }

    var styles = snapshot.GetTrackData().map(t => t.style);
    this.SetStyles(styles);
    //this.RebuidPlot(<any>buff);
    this.params.th = maxTimeIndex;
    this.params.sh = maxTimeValue;
  }

  public Reset()
  {
    this.isInit = false;
    this.channels.forEach((c, index) => {
      c.channel.onData.unsub(this.HandleData);
      c.channel.onClose.unsub(this.HandleClose);
      c.channel.onMessage.unsub(this.HandleMessage);
    });

    //let legend = <HTMLTableElement><unknown>(document.getElementsByClassName("u-legend"));
    //legend.deleteRow(1);
    while(this.options!.series.length > 1)
      this.plot!.delSeries(1);
    this.channels = [];
    //this.RebuidPlot();
    this.SetScale(0, this.params.screenSize);
  }

  public Clear()
  {
    // чистим данный графика
    this.Init();
    //this.RebuidPlot();
    this.SetScale(0, this.params.screenSize);
    //this.params.sh;
  }

  public SetChannels(channels: Channel[])
  {
    if (this.isInit) throw "Already Init";
    if (channels.length == 0) "There are no channels";

    this.currentChannels = channels;

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

  private SetStyles(styles: ChannelStyle[])
  {
    styles.forEach((s, i) => this.SetStyleFor(i + 1, s));
  }
  
  private SetupChannel(channel: Channel)
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
      
      axis = this.options!.axes![index];
      scale = this.options!.scales![scaleName];
      axis.show = true;
  
      //scale.auto = false;
      range = [style.range[0], style.range[1]];
      //scale.range = () => {return [style.range[0], style.range[1]]};
      
      //axis.grid!.stroke = style.color;
      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.color;
      axis.show = true;
      axis.stroke = style.color;
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

  private SetStyleFor(index: number, style: ChannelStyle)
  {
    let scaleName = "y" + index.toString();               //for scale
    let series = GetSeries(scaleName);
    series.scale = scaleName;

    this.options.series[index] = series;

    let axis: uPlot.Axis;
    let scale: uPlot.Scale;
    let range : number[];

    let sameTypeChannel = this.channels.find(c => c.channel.Style.valueType == style.valueType);
    if (sameTypeChannel)
    {
      axis = sameTypeChannel.axis;
      scale = sameTypeChannel.scale;
      range = sameTypeChannel.curRange;
    }
    else
    {
      axis = this.options!.axes![index];
      scale = this.options!.scales![scaleName];
      axis.show = true;
  
      //scale.auto = false;
      range = [-50, 50];
      //scale.range = () => {return [style.range[0], style.range[1]]};
      series.stroke = style.color;
      series.label = style.legendTitle;
      
      //axis.grid!.stroke = style.color;
      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.color;
      axis.show = true;
      axis.stroke = style.color;
      axis.label = style.legendTitle;
      axis.grid!.show = style.grid;
    }
    
    let traceInfo = {
      axis: axis,
      scale: scale,
      series: series,
      range: range,
    };

    return traceInfo;
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
      let i = this.currentChannels!.indexOf(channel);
      this.currentChannels?.splice(i, 1);

      this.clearTrace(this.channels[i].dataBufferIndex);
      this.channels.splice(index, 1); 

      
      this.BuildNewPlot(this.currentChannels);
      this.SetScale(0, this.params.screenSize);
      
      //this.plot?.setLegend({idx: index,}, false);
  }

  private HandleData = (channel: Channel, args: ChannelDataArgs) => 
  {
    var curIndex = this.channels.findIndex(c => c.channel == channel);
    var lastTicksValue = args.data.time[args.data.time.length - 1];
    var xIndex = this.tickToGridIndex(lastTicksValue);        //вычисляем индекс последнего значения данных
    
    let firstTickVal = args.data.time[0];
    let firstIndex = this.tickToGridIndex(firstTickVal);
    //if(args.data.data.length > 2)
      //console.log(firstIndex);

    if (this.channels[curIndex].requireGap)
    {
      //if(args.data.data.length > 2)
        //console.log("gap from", this.channels[curIndex].lastDataIndex, "to", firstIndex);

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

  private wheelZoomPlugin(opts: any) {
    let factor = opts.factor || 0.75;

    let xMin: number, xMax: number, yMin: number, yMax: number, xRange: number, yRange: number;

    function clamp(nRange: number, nMin: number, nMax: number, fRange: number, fMin: number, fMax: number, gap: number) {
      if (nMin < 0) nMin = 0;

      return [nMin, nMax];
    }

    return {
      hooks: {
        ready: (u: any) => {
          xMin = u.scales.x.min;
          xMax = u.scales.x.max + this.params.rightGap;
          yMin = u.scales.y.min;
          yMax = u.scales.y.max;

          xRange = xMax - xMin;
          yRange = yMax - yMin;

          let over = u.over;
          let rect = over.getBoundingClientRect();

          over.addEventListener("dblclick", (e: MouseEvent) => {
            if (e.button == 0) {
              e.preventDefault();
              this.params.streaming = !this.params.streaming;
              this.SetCurrentScale();
            }
          });

          // wheel drag pan
          over.addEventListener("mousedown", (e: any) => {
            if (e.button == 1) {
            //	plot.style.cursor = "move";
              e.preventDefault();

              let left0 = e.clientX;
            //	let top0 = e.clientY;

              let scXMin0 = u.scales.x.min;
              let scXMax0 = u.scales.x.max;

              let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

              function onmove(e: any) {
                e.preventDefault();

                let left1 = e.clientX;
              	//let top1 = e.clientY;

                let dx = xUnitsPerPx * (left1 - left0);

                let nMin = scXMin0 - dx;
                if (nMin >= -0.1)
                u.setScale('x', {
                  min: nMin,
                  max: scXMax0 - dx,
                });
              }

              function onup(e: any) {
                document.removeEventListener("mousemove", onmove);
                document.removeEventListener("mouseup", onup);
              }

              document.addEventListener("mousemove", onmove);
              document.addEventListener("mouseup", onup);
            }
          });

          // wheel scroll zoom
          over.addEventListener("wheel", (e: any) => {
            e.preventDefault();
            
            if (this.params.streaming)
            {
              let dw = ((e.deltaY < 0) ? -1 : 1);
              let newSize = this.params.screenSize + dw;
              this.params.screenSize = newSize < 0.1 ? 0.1 : newSize;
              this.SetCurrentScale();
              return;
            }
            
            
            xMin = u.scales.x.min;
            xMax = this.params.sh //u.scales.x.max;
            yMin = u.scales.y1.min;
            yMax = u.scales.y1.max;
            xRange = xMax - xMin;
            yRange = yMax - yMin;
            if (xRange < 0.001) 
              return; 
            rect = over.getBoundingClientRect();

            let {left, top} = u.cursor;

            let leftPct = left/rect.width;
            let btmPct = 1 - top/rect.height;
            let xVal = u.posToVal(left, "x");
            let yVal = u.posToVal(top, "y1");
            let oxRange = u.scales.x.max - u.scales.x.min;
            let oyRange = u.scales.y.max - 
            u.scales.y.min;

            let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
            let nxMin = xVal - nxRange * leftPct;
            let nxMax = nxMin + nxRange;
            [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax, this.params.rightGap);
            
            this.SetScale(nxMin, nxMax);
          });
        }
      }
    };
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
  
  private SetScale(min: number, max: number){
    this.plot?.setScale('x', {
      min: min,
      max: max,
    });
  }
  
  private BuildNewPlot = (channels: Channel[]) =>
  {
    //if (!dataBuff) dataBuff = <AlignedData>this.datBuf;
    if (this.plot)
      this.plot.destroy();

    this.channels.forEach((c, index) => {
      //this.clearTrace(index + 1);
      c.channel.onData.unsub(this.HandleData);
      c.channel.onClose.unsub(this.HandleClose);
      c.channel.onMessage.unsub(this.HandleMessage);
    });
    this.channels = [];

    this.options = this.getOptions();

    channels.forEach((c, i) => {
      this.SetupChannel(c);

      c.onData.sub(this.HandleData);
      c.onClose.sub(this.HandleClose);
      c.onMessage.sub(this.HandleMessage);
      setTimeout(() => this.SetupAxis(i), 100);
    });

    this.plot = new uPlot(this.options, <any>this.datBuf, this.element);
    this.plot.setSize(this.getSize());
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

  private GetScale()
  {
      return {
          auto: false,
          distr: 1,
          time: false, 
          
          //range: (self, min, max) => [-44, 44]
          //range: [-100, 100],
          //space: 10,
      } as uPlot.Scale
  }

  private getOptions()
  {
    return  {  
        width: 100,
        height: 100,
        pxAlign: true,
        plugins: [
          //this.tooltipsPlugin(this.options),
          this.wheelZoomPlugin({factor: 0.75})
        ],
        scales: {
            x: {
              distr: 1,
              time: false, 
              auto: false,  
            },
            y1: this.GetScale(),

            y2: this.GetScale(),
            y3: this.GetScale(),
            y4: this.GetScale(),
            y5: this.GetScale(),

            y6: this.GetScale(),
            y7: this.GetScale(),
            y8: this.GetScale(),
            y9: this.GetScale(),

            y10: this.GetScale(),
            y11: this.GetScale(),
            y12: this.GetScale(),
            y13: this.GetScale(),
        },
        axes: [
            {
                show: true,
                space: 100,
                //side: 0,
            } as Axis, //x axe
            GetAxe("y1", 1),
            GetAxe("y2", 1),
            GetAxe("y3", 3),
            GetAxe("y4", 1),

            GetAxe("y6", 3),
            GetAxe("y7", 3),
            GetAxe("y8", 3),
            GetAxe("y9", 3),

            GetAxe("y10", 3),
            GetAxe("y11", 3),
            GetAxe("y12", 3),
            GetAxe("y13", 3),
        ],
        hooks: {
					setSelect: [
						u => {
              this.params.streaming = false;
							let min = u.posToVal(u.select.left, 'x');
							let max = u.posToVal(u.select.left + u.select.width, 'x');

							// zoom to selection
							u.setScale('x', {min, max});

							// reset selection
							u.setSelect(
                {
                  width: 0, 
                  height: 0
                } as any, false);
						}
					]
				},
        series: [
            {
              // x series
                auto: false,
            }, 
        ],
        } as uPlot.Options;
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

  private getSize() {    
    return {
      width: this.element.clientWidth - 100,
      height: this.element.clientHeight - 100,
    }
  }

  private SetupAxis = (i: number) =>
  {
    let axisDivs = this.element.getElementsByClassName("u-axis");
    
    let divAxis = axisDivs[i];

    let dragStart = false;
    let yCoord = 0;
    let initialRange = new Array<number>(2);

    
    divAxis.addEventListener('mousedown', (e: any) => {
      dragStart = true;
      yCoord = e.clientY;

      initialRange[0] = this.channels[index- 1].curRange[0];
      initialRange[1] = this.channels[index- 1].curRange[1];
    });

    document.addEventListener('mouseup', (e: any) => {
      dragStart = false;
    });

    divAxis.addEventListener('mouseleave', (e: any) => {
      //dragStart = false;
    });

    document.addEventListener('mousemove', (e: any) => {
      if (dragStart)
      {
        let curY = e.clientY;;
        let divHeigh = divAxis.clientHeight;  
        
        let channel = this.channels[index- 1];
        let range = this.channels[index- 1].curRange;
        let curRangeVal = range[1] - range[0];

        //вычисляем относительное смещение 
        let cursorDy = curY - yCoord;
        let l = cursorDy / divHeigh;
        let dVal = curRangeVal * l;

        channel.curRange[0] = initialRange[0] + dVal;
        channel.curRange[1] = initialRange[1] + dVal;
      }
    });

    let index = i; 
    divAxis.addEventListener('mousewheel', (e: any) => {
      e.preventDefault();

      let dir = e.deltaY > 0 ? 1 : -1; 
      
      let channel = this.channels[index- 1];
      let curRange = channel.curRange;
      
      let rangeVal = curRange[1] - curRange[0];
      let dyTop = channel.channel.Style.rescaleRationTop * rangeVal;
      let dyBottom = channel.channel.Style.rescaleRationBottom * rangeVal;
      let newRange = [curRange[0] - dyBottom * dir, curRange[1] + dyTop * dir];

      channel.curRange[0] = newRange[0];
      channel.curRange[1] = newRange[1];
    });
    
  }

  private SetCurrentScale()
  {
    let newMax = this.params.sh + this.params.screenSize / 2;
    this.SetScale(this.params.sh - this.params.screenSize, newMax);
  }

  private tooltipsPlugin(opts: any) {
    function init(u: any, opts: any, data: any) {
      let over = u.over;

      let ttc = u.cursortt = document.createElement("div");
      ttc.className = "tooltip";
      ttc.textContent = "(x,y)";
      ttc.style.pointerEvents = "none";
      ttc.style.position = "absolute";
      ttc.style.background = "rgba(0,0,255,0.1)";
      over.appendChild(ttc);

      u.seriestt = opts.series.map((s: any, i: any) => {
        if (i == 0) return;

        let tt = document.createElement("div");
        tt.className = "tooltip";
        tt.textContent = "Tooltip!";
        tt.style.pointerEvents = "none";
        tt.style.position = "absolute";
        tt.style.background = "rgba(0,0,0,0.1)";
        tt.style.color = s.color;
        //tt.style.display = s.show ? null : "none";
        over.appendChild(tt);
        return tt;
      });

      function hideTips() {
        ttc.style.display = "none";
        u.seriestt.forEach((tt: any, i: any) => {
          if (i == 0) return;

          tt.style.display = "none";
        });
      }

      function showTips() {
        ttc.style.display = "";
        u.seriestt.forEach((tt: any, i: any) => {
          if (i == 0) return;

          let s = u.series[i];
          tt.style.display = s.show ? null : "none";
        });
      }

      over.addEventListener("mouseleave", () => {
        if (!u.cursor._lock) {
        //	u.setCursor({left: -10, top: -10});
          hideTips();
        }
      });

      over.addEventListener("mouseenter", () => {
        showTips();
      });

      hideTips();
    }
  }
}

