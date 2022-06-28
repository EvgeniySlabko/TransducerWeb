import html2canvas from "html2canvas";
import uPlot, { AlignedData, Axis, Options, Scale, Series } from "uplot";
import { getRandomInt, increase_brightness } from "../Common/Common";
import { GetAxe, GetScale } from "./ComponetFactory/ComponentFactory";


export declare class LegendItem {
  public setValue: (value: string) => void;
  public getValue: () => string;
  public isActive: () => boolean;
}

export declare class LimitLine{
  label: string;
  axis: uPlot.Axis;
  range: () => number[];
  value: number;
  color: () => string;
  enabled: () => boolean;
}

export declare class Label
{
  scale: string;
  time: number;
  text: string;
  value: number;
}

export class MyUPlotBase
{
    protected element: HTMLElement;
    protected plot: uPlot | undefined;
    protected legendItems: LegendItem[] | undefined = undefined; 
    protected labels: Label[] = [];
    protected limits: LimitLine[] = [];

    protected interval: NodeJS.Timer | undefined;
    protected controlarams =  {
      gridTicks: 50,     //делений графика в секунду.
      gridDx: 0,          //
      screenSize: 5,      //
      t0: 0,
      range: [0, 5],
    }
    
    constructor (element: HTMLElement)
    {
        // переотрисовка
        this.element = element;
    }
    
    public async GetScreen() : Promise<string>
    {
      const canvas = await html2canvas(this.element);
      return canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
    }
      
    protected SetScale(min: number, max: number){
      this.controlarams.range = [min, max];
    }
      
    protected getSize() {    
      return {
          width: document.body.clientWidth - 200,
          height: this.element.clientHeight - 100,
        }
    }
      
    private wheelZoomPlugin(opts: any) {
        let factor = opts.factor || 0.75;
    
        let xMin: number, xMax: number, yMin: number, yMax: number, xRange: number, yRange: number;
    
        function clamp(nRange: number, nMin: number, nMax: number, fRange: number, fMin: number, fMax: number) {
          if (nMin < 0) nMin = 0;
    
          return [nMin, nMax];
        }
    
        return {
          hooks: {
            ready: (u: any) => {
              xMin = u.scales.x.min;
              xMax = u.scales.x.max //+ this.params.rightGap;
              yMin = u.scales.y.min;
              yMax = u.scales.y.max;
    
              xRange = xMax - xMin;
              yRange = yMax - yMin;
    
              let over = u.over;
              let rect = over.getBoundingClientRect();
    
              
              over.addEventListener("dblclick", (e: MouseEvent) => {
                this.DbClick(e);
                e.stopPropagation();
              });

    
              over.addEventListener("contextmenu", (e: Event) => 
              {
                e.preventDefault(); 
                //return false;
              });
              // wheel drag pan
              over.addEventListener("mousedown", (e: any) => {
                if (e.button == 2) {
                  e.preventDefault();
                  
    
                  let left0 = e.clientX;
    
                  let scXMin0 = u.scales.x.min;
                  let scXMax0 = u.scales.x.max;
    
                  let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');
    
                  function onmove(e: any) {
                    e.preventDefault();
    
                    let left1 = e.clientX;
                      //let top1 = e.clientY;
    
                    let dx = xUnitsPerPx * (left1 - left0);
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
                
                if (this.Wheel(e))
                    return;
            
                xMin = this.controlarams.range[0];
                xMax = this.controlarams.range[1];
                //yMin = u.scales.y1.min;
                //yMax = u.scales.y1.max;
                xRange = xMax - xMin;
                //yRange = yMax - yMin;
                if (xRange < 0.001 && e.deltaY < 0) 
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
                [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);
                
                this.SetScale(nxMin, nxMax);
              });
            }
          }
        };
    }
    
    private labelsPlugin(labels: Label[], ) {

      function drawBg(u: uPlot) {
        //console.log("left: ", left, "top: ", top, "width", width, "height", height);
        labels.forEach(l => {
          let { left, top, width, height } = u.bbox;

          //if (l.value > l.yRange[1] || l.value < l.yRange[0]) return;
          let xRange = <number[]>[u.scales['x']!.min, u.scales['x']!.max];

          if (l.time > xRange[1] || l.time < xRange[0]) return; 
    
          let xCord = u.valToPos(l.time, "x", true);
          let yCord = u.valToPos(l.value, l.scale, true);

          let xShifted = xCord;
          let yShifted = yCord;
          if (l.value > 0) yShifted -= 10;
          else yShifted += 20;

          u.ctx.save();

          u.ctx.font = "15px Comic Sans MS";
          u.ctx.fillStyle = "black";
          u.ctx.textAlign = "center";
          u.ctx.fillText(l.text, xShifted, yShifted);

          u.ctx.strokeStyle = "red";
          u.ctx.fillStyle = "red";
          u.ctx.beginPath();
          u.ctx.arc(xCord, yCord, 3, 0, 2 * Math.PI, true);
          u.ctx.fill();
          u.ctx.stroke();

          u.ctx.stroke();          // Отображает путь
          u.ctx.restore();
        });
      }

      return {
        hooks: {
          draw: drawBg,
        }
      };
    }

    private limitsPlugin(limits: LimitLine[]) {

      function drawBg(u:uPlot) {
        //console.log("left: ", left, "top: ", top, "width", width, "height", height);
        limits.forEach(l => {
          if (!l.enabled()) return;
          let { left, top, width, height } = u.bbox;
          let range = l.range();
          if (l.value > range[1] || l.value < range[0]) return;
          let rangeValue  = range[1] - range[0];
          let dr = rangeValue / height;
          
          let tmpR = [range[0] + -range[0], range[1] + -range[0]];
          let tmpV = l.value + -range[0];

          let relVal = tmpV - tmpR[0];
          let limitHeight = relVal * height / rangeValue;

          u.ctx.save();
          u.ctx.strokeStyle = increase_brightness(l.color(), 40);

          let xMax = u.scales["x"].max;
          let xMin = u.scales["x"].min;
          let dashLen = 5;
          let dashGap = 15;
          if (xMax && xMin)
          {
            let range = xMax - xMin;
            dashLen = (1 / range) * 160;
            dashGap = (1 / range) * 250;
          }

          u.ctx.beginPath();       
          u.ctx.setLineDash([dashLen, dashGap]);
          u.ctx.font = "10px serif";
          u.ctx.textAlign = "start";
          u.ctx.fillStyle  = increase_brightness(l.color(), 40);

          let dy = height - limitHeight + top;
          u.ctx.fillText(l.label, left, dy - 6);
          u.ctx.moveTo(left,  dy);    
          u.ctx.lineWidth = 2;
          u.ctx.lineTo(left + width, dy);  
          u.ctx.stroke();          
          u.ctx.restore();
        });
      }

      return {
        hooks: {
          drawClear: drawBg,
        }
      };
    }

    protected getOptions()
    {
      let range = [0,5];
      return  {  
          width: 100,
          height: 100,
          pxAlign: true,

          cursor: {
            points: {
              size: 6,
            }
          },
          plugins: [
            this.limitsPlugin(this.limits),
            this.wheelZoomPlugin({factor: 0.75}),
            this.labelsPlugin(this.labels)
          ],
          mode: 1,
          
          scales: {
              x: {
                range: () =>  <Scale.Range>this.controlarams.range,

                distr: 1,
                time: false, 
                auto: false,  
              },
              y1: GetScale(),
  
              y2: GetScale(),
              y3: GetScale(),
              y4: GetScale(),
              y5: GetScale(),
  
              y6: GetScale(),
              y7: GetScale(),
              y8: GetScale(),
              y9: GetScale(),
  
              y10: GetScale(),
              y11: GetScale(),
              y12: GetScale(),
              y13: GetScale(),
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
            setCursor:[
              (u: uPlot) =>{
                let left = u.cursor.left;
                if (left)
                {
                  this.setCursor();
                }
              }
            ],
            drawSeries: [
              (u, seriesIdx) => {
                this.SeriesDraw(seriesIdx);
              }
            ],
            setSelect: [
                u => {
                  if (u.select.width == 0) return;
                    this.SelectCommited();
                    let min = u.posToVal(u.select.left, 'x');
                    let max = u.posToVal(u.select.left + u.select.width, 'x');

                    // zoom to selection
                    this.SetScale(min, max);
                    //console.log(min, max);
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
                  auto: false,
              }, 
          ],
          } as uPlot.Options;
    }

    protected InitAxes()
    {
        let axisDivs = this.element.getElementsByClassName("u-axis");
        for (let i = 0; i < axisDivs.length; i++) {
            this.SetupAxis(i);
        }
    }
    
    protected BuildPlot(options: Options, dataBuffer: any)
    {
        this.plot = new uPlot(options, dataBuffer, this.element);
        this.interval = setInterval(() => {
          this.plot?.redraw(true, true)
        }, 30);
        setTimeout(() =>
        {
          let legendSeries = this.element.getElementsByClassName("u-series");
          this.legendItems = new Array<LegendItem>();
          let e = this.element.getElementsByClassName("u-over")[0];
          e.addEventListener("mouseleave", () =>
          {
              if (this.legendItems)
              {
                this.legendItems.forEach(la => la.setValue("--"));
              }
          });
          Array.from(legendSeries).forEach((e, i) =>{

            let item = legendSeries[i];

            this.legendItems?.push({
                getValue: () => {return item.getElementsByClassName("u-value")[0].innerHTML;},
                setValue: (value: string) => {item.getElementsByClassName("u-value")[0].innerHTML = value;},
                isActive: () => !item.classList.contains("u-off"),

            })
          })

          let timeSeries = this.element.getElementsByClassName("u-series")[0];
          let label = timeSeries.getElementsByClassName("u-label");
          let value = timeSeries.getElementsByClassName("u-value");
          label[0].innerHTML = "Время";

          let prev = ""
          value[0].addEventListener('DOMSubtreeModified', function(e){
            let val = value[0].innerHTML;
            e.stopPropagation();
            if (val != "--" && val != prev && val.length != 0 && val[val.length - 1] != "с")
            {
              let newVal = val + " с";
              value[0].innerHTML = newVal;
              prev = newVal;
            }
        });
        }, 100)
    }

    public DestroyPlot()
    {
        if (this.plot)
        {
          this.plot.destroy();
          if (this.interval)
          clearInterval(this.interval);
          this.element.innerHTML = '';
        }
          
    }

    protected Redraw()
    {
        this.plot?.redraw();
    }
    
    protected setCursor(){}

    protected SeriesDraw(i: number){}

    protected SelectCommited(){}
    
    protected DbClick(e: any){}
    
    protected AxisWheel(dy: number){}
    
    protected AxisZoom(index: number, dy: number){}
    
    protected AxisRangeChanged(index: number, dy: number){}
    
    protected Wheel(e: number) : boolean
    {
        return false;
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
        //initialRange[0] = this.channels[index- 1].curRange[0];
        //initialRange[1] = this.channels[index- 1].curRange[1];
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
            let cursorDy = curY - yCoord;
            yCoord = curY
            let l = cursorDy / divHeigh;
            
            this.AxisRangeChanged(i, l);
        }
        });

        let index = i; 
        divAxis.addEventListener('mousewheel', (e: any) => {
          e.preventDefault();
          this.AxisZoom(i, e.deltaY);
        });
    }
}