import uPlot, { AlignedData, Axis, Options, Scale, Series } from "uplot";
import { GetAxe, GetScale } from "./ComponetFactory/ComponentFactory";

export class MyUPlotBase
{
    protected element: HTMLElement;
    protected plot: uPlot | undefined;
    private controlarams =  {
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

    constructor (element: HTMLElement)
    {
        this.element = element;
    }

    protected SetScale(min: number, max: number){
        this.plot?.setScale('x', {
          min: min,
          max: max,
        });
      }

    protected getSize() {    
        return {
            width: document.body.clientWidth - 200,
            height: this.element.clientHeight - 100,
        }
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
              });

    
              // wheel drag pan
              over.addEventListener("mousedown", (e: any) => {
                if (e.button == 1) {
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
                
                if (this.Wheel(e))
                    return;
            
                xMin = u.scales.x.min;
                xMax = u.scales.x.max; //u.scales.x.max;
                yMin = u.scales.y1.min;
                yMax = u.scales.y1.max;
                xRange = xMax - xMin;
                yRange = yMax - yMin;
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

    protected getOptions()
    {
      return  {  
          width: 100,
          height: 100,
          pxAlign: true,
          plugins: [
            //this.tooltipsPlugin(this.options),
            this.wheelZoomPlugin({factor: 0.75})
          ],
          legend:{
            markers:{
              
            }
          },
          scales: {
              x: {
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
                setSelect: [
                    u => {
                        this.SelectCommited();
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

        //legend correction.
        let legendSeries = this.element.getElementsByClassName("u-series")[0];
        let label = legendSeries.getElementsByClassName("u-label");
        let value = legendSeries.getElementsByClassName("u-value");
        label[0].innerHTML = "Время";

        let prev = ""
        value[0].addEventListener('DOMSubtreeModified', function(e){
          let val = value[0].innerHTML;
          e.stopPropagation();
          if (val != "--" && val != prev && val.length != 0 && val[val.length - 1] != "C")
          {
            let newVal = val + " C";
            value[0].innerHTML = newVal;
            prev = newVal;
          }
        });
        //item.innerHTML = "Время";

    }

    public DestroyPlot()
    {
        if (this.plot)
            this.plot.destroy();
    }

    protected Redraw()
    {
        this.plot?.redraw();
    }
    
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