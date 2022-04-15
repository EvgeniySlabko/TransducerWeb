import uPlot, { AlignedData, Axis } from "uplot";
import { Channel } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { GetOptions, GetSeries } from "./ComponetFactory/ComponentFactory";

export class MyUPlot
{
  private plot: uPlot;

  private index: number = 1;
  private datBuf : (number | null | undefined)[][] = [[]];
  private id_index_map : Map<number, [uPlot.Series]> = new Map();
  private element: HTMLElement;
  private options: uPlot.Options;

  private t0: number | undefined;
  private th: number | undefined;
  private dt: number = 1000 // d tick


  public SetT0(t0: number) {this.t0 = t0}

  public async AttachChannel(channel: Channel) : Promise<number>
  {
      var curIndex: number = this.index++; 
      this.datBuf.push(new Array<number | null | undefined>(this.datBuf[0].length));   // new array for series
      this.SetStyleFor(curIndex, channel.Style);
      
      //this.id_index_map.set(curIndex, [series]);
      //this.plot.redraw();
      //this.setData(data);
      
      var tickToGridIndex = (sensorTicks: number) => {
        return Math.floor(sensorTicks / this.dt); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
      };

      channel.onData.sub(async (data) => 
      {
         var lastTicksValue = data.time[data.time.length - 1];
         var xIndex = tickToGridIndex(lastTicksValue);        //вычисляем индекс последнего значения данных

         var currentArraysSize = this.datBuf[0].length;
         if (xIndex > this.datBuf[0].length - 1)  //расширяем массивы
         {
            var expandSize = (xIndex + 1) - currentArraysSize;

            for (let i = 0; i < this.datBuf.length; i++) 
            {
              var additionArray = new Array(expandSize).fill(undefined);
              this.datBuf[i] = this.datBuf[i].concat(additionArray);
            } //расширяем текущие массивы

            for (let j = currentArraysSize; j < this.datBuf[0].length; j++) {this.datBuf[0][j] = this.dt * j} //проставляем время для x

            for (let k = 0; k < data.time.length; k++) //проставляем данные
            {
              var currentIndex = tickToGridIndex(data.time[k]);
              this.datBuf[curIndex][currentIndex] = data.data[k];
            }
         }

         this.plot.setData(<any>this.datBuf)
      });

      this.index++
      //this.plot.redraw();

      return curIndex;
  }

  private AddData(t1 : number, data: number[], index: number)
  {
    
  }
    
  public hide()
  {
    this.plot.axes[1].show = false;
    this.plot.axes[3].show = false;
  }

  private SetStyleFor(index: number, style: ChannelStyle)
  {
    var scaleName = "y" + index.toString();               //for scale
    var series = GetSeries(scaleName);
    series.scale = scaleName;
    this.options.series.push(series);


    var axis = this.options!.axes![index];
    var scale = this.options!.scales![scaleName];
    axis.show = true;
    //axis.stroke = style.color;
    //axis.show = true;


    this.plot.destroy();
    this.plot = new uPlot(this.options, <AlignedData>this.datBuf, this.element);
    this.plot.setData(<AlignedData>this.datBuf);
  }

  constructor(element: HTMLElement)
  {
    this.plot = new uPlot(GetOptions(), <AlignedData>this.datBuf, element);

    this.element = element;
    this.options = GetOptions();

    this.plot.setData(<AlignedData>this.datBuf);
    for (let i = 1; i <= 2; i++) {
      //this.plot.axes[i].show = false;  
    }
    //this.plot.axes.forEach(a => a.show = false);
  }

  public GetT0() {return this.t0}
}