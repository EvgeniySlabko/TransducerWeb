import uPlot, { AlignedData, Axis, Scale } from "uplot";
import { Channel } from "../Channel/Channel/Channel";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { GetAxe, GetOptions, GetScale, GetSeries } from "./ComponetFactory/ComponentFactory";
export class MyUPlot
{
  private plot: uPlot | undefined;

  private index: number = 1;
  private datBuf : (number | null | undefined)[][] = 
  [
    new Array(250000),
    new Array(250000),
    new Array(250000),
    new Array(250000),
  ];
  
  private id_index_map : Map<number, [uPlot.Series]> = new Map();
  private element: HTMLElement;
  private options: uPlot.Options;

  
  private params =  {
    gridTicks: 5000,     //делений графика в секунду.
    gridDx: 0,          //
    screenSize: 5,              //
    streaming: true,
    
    screenRollingGap: 2,
    screenRollingStep: 4,
    rangeX: [0, 3],

    rightGap: 3,
    sh: 0,
    th: 0,
    t0: 0,
  }

  constructor(element: HTMLElement)
  {
    this.Init();
    this.options = this.getOptions();    
    this.element = element;
    this.RebuidPlot();
    //this.plot = new uPlot(this.options, <AlignedData>this.datBuf, element);
    //this.SetScale(0, 3);
    
    //this.plot.setData(<AlignedData>this.datBuf);

    window.addEventListener("resize", e => {
      this.plot?.setSize(getSize());
    });

    //var setCommonView = () => {
    //  this.plot.redraw();
    //  this.SetScale(0, this.params.sh + this.params.rightGap);
    //}
    //this.plot.root.querySelector(".over")?.addEventListener('dblclick', setCommonView);
    this.SetScale(0, 3);
    //this.plot.redraw()
  }

  private wheelZoomPlugin(opts: any) {
    let factor = opts.factor || 0.75;

    let xMin: any, xMax: any, yMin: any, yMax: any, xRange: any, yRange: any;

    function clamp(nRange: any, nMin: any, nMax: any, fRange: any, fMin: any, fMax: any) {
      if (nRange > fRange) {
        nMin = fMin;
        nMax = fMax;
      }
      else if (nMin < fMin) {
        nMin = fMin;
        nMax = fMin + nRange;
      }
      else if (nMax > fMax) {
        nMax = fMax;
        nMin = fMax - nRange;
      }

      return [nMin, nMax];
    }

    return {
      hooks: {
        ready: (u: any) => {
          xMin = u.scales.x.min;
          xMax = u.scales.x.max;
          yMin = u.scales.y.min;
          yMax = u.scales.y.max;

          xRange = xMax - xMin;
          yRange = yMax - yMin;

          let over = u.over;
          let rect = over.getBoundingClientRect();

          over.addEventListener("dblclick", (e: MouseEvent) => {
            if (e.button == 0) {
              e.preventDefault();
              this.params.streaming = true;
              this.SetScale(0, this.params.sh + this.params.rightGap);
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
              //	let top1 = e.clientY;

                let dx = xUnitsPerPx * (left1 - left0);

                u.setScale('x', {
                  min: scXMin0 - dx,
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
            this.params.streaming = false;

            let {left, top} = u.cursor;

            let leftPct = left/rect.width;
            let btmPct = 1 - top/rect.height;
            let xVal = u.posToVal(left, "x");
            let yVal = u.posToVal(top, "y1");
            let oxRange = u.scales.x.max - u.scales.x.min;
            let oyRange = u.scales.y.max - u.scales.y.min;

            let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
            let nxMin = xVal - leftPct * nxRange;
            let nxMax = nxMin + nxRange;
            [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

            let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
            let nyMin = yVal - btmPct * nyRange;
            let nyMax = nyMin + nyRange;
            [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

            this.SetScale(nxMin, nxMax);
            /*
            u.batch(() => {
              u.setScale("x", {
                min: nxMin,
                max: nxMax,
              });

              u.setScale("y1", {
                min: nyMin,
                max: nyMax,
              });

            });
            */
          });
        }
      }
    };
  }

  private SetScale(min: number, max: number){
    this.plot?.setScale('x', {
      min: min,
      max: max,
    });
  }

  public SetT0(t0: number) {this.params.t0 = t0}
  public SetDefault()
  {
    this.SetScale(0, this.params.sh + 3);
  }

  public async AttachChannel(channel: Channel) : Promise<number>
  {
      var curIndex: number = this.index++; 
      this.SetStyleFor(curIndex, channel.Style);

      channel.onData.sub(async (data) => 
      {
         var lastTicksValue = data.time[data.time.length - 1];
         var xIndex = this.tickToGridIndex(lastTicksValue);        //вычисляем индекс последнего значения данных

         if (this.params.th < xIndex) {this.params.th = xIndex; this.params.sh = lastTicksValue;}

         for (let k = 0; k < data.time.length; k++) //проставляем данные
         {
           var currentIndex = this.tickToGridIndex(data.time[k]);

           this.datBuf[curIndex][currentIndex] = data.data[k];
         }

         //this.SetScale(0, 1000);
         this.plot?.redraw();
         this.ScaleHandler();
      });

      return curIndex;
  }
  
  private ScaleHandler()
  {
    var max = this.plot?.scales["x"].max;
    if (max == null) {max = 0};
    if (this.params.sh > <any>max  && this.params.streaming)
    {
      //this.params.rangeX[0] = this.params.sh - this.params.screenSize;
      //this.params.rangeX[1] = this.params.sh;

      this.SetScale(0, this.params.sh + this.params.rightGap);
    }
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

    scale.auto = false;
    scale.range = <Scale.Range>style.range;
    series.stroke = style.color;
    axis.stroke = style.color;
    axis.label = style.legendTitle;
    series.label = style.legendTitle;
    //axis.grid!.show = style.grid;
    //axis.grid!.stroke = style.color;

    axis.side = style.yAxeSide == "left" ? 1 : 3;
    //axis.stroke = style.color;
    //axis.show = true;
    this.RebuidPlot();
  }
  
  private RebuidPlot()
  {
    if (this.plot != null)
      this.plot.destroy();
    //(<any>(this.options)).plugins[0] = this.wheelZoomPlugin({factor: 0.75});
    this.plot = new uPlot(this.options, <AlignedData>this.datBuf, this.element);
    //(<any>(this.options)).plugins[0] = this.wheelZoomPlugin({factor: 0.75});
    this.plot.setData(<AlignedData>this.datBuf);
    this.SetScale(0, this.params.screenSize);
    this.plot.redraw();
    this.plot.setSize(getSize());
  } 

  private Init()
  {
    this.params.gridDx = 1 / this.params.gridTicks;

    //проставляем основной массив с данными
    for (let i = 1; i < this.datBuf.length; i++) {
      for (let j = 0; j < this.datBuf[i].length; j++) {
        this.datBuf[i][j] = undefined;
      }
    }

    for (let k = 0; k < this.datBuf[0].length; k++) {
      this.datBuf[0][k] = k * this.params.gridDx;
    }
  }

  private getOptions()
  {
    
    return  {  
        title: "Transducer",
        width: 2450,
        height: 600,
        pxAlign: true,
        plugins: [
          this.wheelZoomPlugin({factor: 0.75})
        ],
        scales: {
            x: {
              time: false, 
              auto: false,  

            },
            y1: GetScale(),
            y2: GetScale(),
            y3: GetScale(),
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
        ],
        hooks: {
					setSelect: [
						u => {
              this.params.streaming = false;
							let min = u.posToVal(u.select.left, 'x');
							let max = u.posToVal(u.select.left + u.select.width, 'x');

							//console.log("Fetching data for range...", {min, max});

							// zoom to selection
							u.setScale('x', {min, max});

							// reset selection
							u.setSelect(
                {width: 0, 
                height: 0
                } as any, false);
						}
					]
				},
        series: [
            {
                auto: false,
            }, // x series
        ],
        } as uPlot.Options;
  }

  private tickToGridIndex (sensorTimeValue: number) {
    return Math.floor(sensorTimeValue / this.params.gridDx ); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
  };
}

export function getSize() {
  return {
    width: window.innerWidth - 100,
    height: window.innerHeight - 200,
  }
}