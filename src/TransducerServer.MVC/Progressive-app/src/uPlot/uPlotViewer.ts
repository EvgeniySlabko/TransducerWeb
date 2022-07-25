import uPlot, { AlignedData, Axis, Scale, Series } from "uplot";
import { Channel } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { Snapshot } from "../ReportListener/Snapshot";
import { GetSeries } from "./ComponetFactory/ComponentFactory";
import { MyUPlotBase } from "./uPlotBase";

export class MyUPlotViewer extends MyUPlotBase
{
  constructor(element: HTMLElement)
  {
    super(element); 
    this.SetScale(0, this.params.screenSize());
  }

  private rData: uPlot.AlignedData =[[],[]]
  protected get data() : uPlot.AlignedData
  {
    return this.rData
  }

  public FromSnapshot(snapshot: Snapshot)
  {
    var trackData = snapshot.GetTrackData();

    this.rData = [[]]
    
    for (let i = 0; i < trackData.length; i++) {
        this.data.push(new Array());
    }

    var maxTimeValues : number[] = [];
    trackData.forEach(t => {
      var lastValue = t.data.time[t.data.time.length - 1];
      maxTimeValues.push(lastValue);
    });

    var dx = 1 / 5000;
    var toArrayIndex = (time: number) =>{
      return Math.floor(time / dx);
    }

    //определяем размер буфера 
    var maxTimeValue = Math.max(...maxTimeValues)
    var maxTimeIndex = toArrayIndex(maxTimeValue);
    for (let i = 0; i < this.data.length; i++) {
        this.data[i] = new Array(maxTimeIndex);
    }
    
    //Ставим значени япо умолчанию
    for (let i = 1; i <= trackData.length; i++) {
      for (let j = 0; j < maxTimeIndex; j++) {
        this.data[i][j] = undefined;
      }
    }

    //Ставим время
    for (let i = 0; i < maxTimeIndex; i++) {
        this.data[0][i] = i * dx;
    }

    //проставляем данные
    for (let i = 0; i < trackData.length; i++) {
      for (let k = 0; k < trackData[i].data.time.length; k++) {
        var time = trackData[i].data.time[k];
        var val = trackData[i].data.data[k];

        var index = toArrayIndex(time);
        if (index < maxTimeIndex && index >= 0)
          this.data[i + 1][index] = val;
      }
    }

    // определяем минимальное значение по оси x
    let minTime = undefined;
    for (let i = 1; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] != undefined)
        {
          let currentFirstvalue = <number>this.data[0][j];
          if (!minTime || currentFirstvalue < minTime)
            minTime = currentFirstvalue
        }
      }
    }

    var styles = snapshot.GetTrackData().map(t => t.style);
    
    this.params.gridTicks = 5000;
    this.params.t0 = minTime as number;
    this.params.th = maxTimeValue;
    this.BuildNewPlot(styles);
  }

  private BuildNewPlot = (styles: ChannelStyle[]) =>
  {
    this.DestroyPlot();

    styles.forEach((s, i) => {
      this.AddSeries(s);
    });

    this.BuildPlot();
    this.SetScale(this.params.t0, this.params.th);
  }

  protected DbClick(e: any) {
    
    if (e.button == 0) {
      e.preventDefault();
      this.SetScale(this.params.t0, this.params.th);
    }
}
}

