import html2canvas from 'html2canvas';
import uPlot, { Axis, Scale, Series } from 'uplot';
import { PlotChannelStyle } from '../Channel/ChannelStyle/PlotChannelStyle';
import { increase_brightness, nearestPoint } from '../Common/Common';
import { groupBy } from '../Common/GroupBy';
import { GetDefaultAxe, GetScale, GetSeries } from './PlotCommon';

export declare class PlotParameters{
  pointsPerSecond: number;
}

export declare class LegendItem {
  public setValue: (value: string) => void;
  public getValue: () => string;
  public isActive: () => boolean;
}

export declare class LimitLine {
  label: string;
  axis: uPlot.Axis;
  range: () => number[];
  value: number;
  color: () => string;
  enabled: () => boolean;
}

export declare class Label {
  scale: string;
  time: number;
  text: string;
  value: number;
}

export type SeriesInfo =
  {
    style: PlotChannelStyle;
    dataBufferIndex: number;
    curRange: number[];
    axis: Axis;
    series: Series;
    scale: Scale;
  }

export class MyUPlotBase {
  protected element: HTMLElement;                               // uplot container
  protected parent: HTMLElement | null;                         // parent container
  protected plot: uPlot | undefined;
  protected options: uPlot.Options;
  protected legendItems: LegendItem[] | undefined = undefined;
  protected labels: Label[] = [];
  protected limits: LimitLine[] = [];
  protected seriesInfos: SeriesInfo[] = [];

  private _data: uPlot.AlignedData = [[], []]
  protected interval?: NodeJS.Timer;

  protected get data(): uPlot.AlignedData {
    return this._data
  }

  protected params = {
    pointsPerSecond: 50,
    screenSize: () => this.params.range[1] - this.params.range[0],
    setScreenSize: (size: number) => {
      let rangeVal = this.params.range[1] - this.params.range[0];
      let mid = this.params.range[0] + (rangeVal / 2);
      this.params.range[0] = mid - size / 2;
      this.params.range[1] = mid + size / 2
    },

    t0: 0,
    th: 0,
    range: [0, 5],      // Time range.
    dt: () => 1 / this.params.pointsPerSecond
  }

  constructor(element: HTMLElement, parameters: PlotParameters) {
    this.params.pointsPerSecond = parameters.pointsPerSecond,
    this.element = element;
    this.parent = this.element.parentElement;
    this.options = this.getOptions();

    window.addEventListener("resize", e => {
      this.plot?.setSize(this.getSize());
    });
  }

  private timeToIndex = (time: number): number => {
    let firstBufferTime = this.data[0][0];
    let firsIndex = Math.floor(firstBufferTime / this.params.pointsPerSecond);
    let curIndex = Math.floor(time / (1 / this.params.pointsPerSecond));
    return curIndex - firsIndex;
  }

  public ClearLabels = () => this.labels.splice(0, this.labels.length);


  public AddSeries(style: PlotChannelStyle): SeriesInfo {
    let axis: uPlot.Axis;
    let scale: uPlot.Scale;
    let range: number[];
    let series: uPlot.Series;
    let index = this.seriesInfos.length + 1;

    let sameTypeChannel = this.seriesInfos.find(s => s.style.valueType == style.valueType);

    if (sameTypeChannel) {
      let scaleName = <string>sameTypeChannel.axis.scale;

      series = GetSeries(scaleName);
      series.scale = scaleName;

      axis = sameTypeChannel.axis;
      scale = sameTypeChannel.scale;
      range = sameTypeChannel.curRange;

      if (style.range[0] < range[0])
        range[0] = style.range[0];
      if (style.range[1] > range[1])
        range[1] = style.range[1];
    }
    else {
      let scaleName = "y" + index.toString();
      series = GetSeries(scaleName);
      series.scale = scaleName;

      axis = this.options.axes![index];
      scale = this.options.scales![scaleName];

      range = [style.range[0], style.range[1]];

      axis.side = style.yAxeSide == "left" ? 1 : 3;
      axis.stroke = style.axisColor;
      axis.show = true;
      axis.label = style.yTitle;
      axis.grid!.show = style.grid;
      scale.range = () => [range[0], range[1]];
    }

    series.show = style.visible;
    series.stroke = style.color;
    series.width = style.width;
    series.label = style.legendTitle;
    series.points!.stroke = style.color;
    this.options.series.push(series);


    let addLimit = (limitValue: number) => {
      this.limits.push({
        axis: axis,
        color: () => style.color,
        label: style.legendTitle,
        range: () => range,
        value: limitValue,
        enabled: () => {
          return (this.legendItems
            && this.legendItems.at(index) ? this.legendItems[index].isActive() : false)
            && style.drawLimits != undefined
            && style.drawLimits
        }
      })
    }

    if (style.maxValue)
      addLimit(style.maxValue);

    if (style.minValue)
      addLimit(style.minValue);

    let info: SeriesInfo = {
      axis: axis,
      scale: scale,
      series: series,
      curRange: range,
      dataBufferIndex: index,
      style: style,
    }

    this.seriesInfos.push(info);
    return info;
  }

  public async GetScreen(): Promise<string> {
    const canvas = await html2canvas(this.element);
    return canvas.toDataURL("image/png", 1).replace("image/png", "image/octet-stream");
  }

  protected Clear = () => { return }

  protected SetScale(min: number, max: number) {
    if (min >= max) throw "min higher then max";
    this.params.range = [min, max];
  }

  protected getSize() {
    let summaryOthersWidth = 0;
    let childrens = this.parent!.children;
    for (let i = 0; i < childrens.length; i++) {
      if (childrens[i] != this.element)
        summaryOthersWidth += childrens[i].clientWidth;
    }
    return {
      width: this.parent!.clientWidth - summaryOthersWidth,
      height: this.element.clientHeight - 100,
    }
  }

  private wheelZoomPlugin(opts: any) {
    let factor = 0.75;

    let xMin: number, xMax: number, yMin: number, yMax: number, xRange: number, yRange: number;

    function clamp(nRange: number, nMin: number, nMax: number, fRange: number, fMin: number, fMax: number) {


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


          over.addEventListener("contextmenu", (e: Event) => {
            e.preventDefault();
            //return false;
          });
          // wheel drag pan
          over.addEventListener("mousedown", (e: any) => {
            if (e.button == 2) {
              e.preventDefault();


              let left0 = e.clientX;

              let scXMin0 = this.params.range[0];
              let scXMax1 = this.params.range[1];

              let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

              let onmove = (e: any) => {
                e.preventDefault();

                let left1 = e.clientX;
                let dx = xUnitsPerPx * (left1 - left0);
                this.SetScale(scXMin0 - dx, scXMax1 - dx);
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

            xMin = this.params.range[0];
            xMax = this.params.range[1];
            //yMin = u.scales.y1.min;
            //yMax = u.scales.y1.max;
            xRange = xMax - xMin;
            //yRange = yMax - yMin;
            if (xRange < 0.001 && e.deltaY < 0)
              return;
            rect = over.getBoundingClientRect();

            let { left, top } = u.cursor;

            let leftPct = left / rect.width;
            let btmPct = 1 - top / rect.height;
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

  private labelsPlugin(labels: Label[],) {

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

    function drawBg(u: uPlot) {
      //console.log("left: ", left, "top: ", top, "width", width, "height", height);
      limits.forEach(l => {
        if (!l.enabled()) return;
        let { left, top, width, height } = u.bbox;
        let range = l.range();
        if (l.value > range[1] || l.value < range[0]) return;
        let rangeValue = range[1] - range[0];
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
        if (xMax && xMin) {
          let range = xMax - xMin;
          dashLen = (1 / range) * 160;
          dashGap = (1 / range) * 250;
        }

        u.ctx.beginPath();
        u.ctx.setLineDash([dashLen, dashGap]);
        u.ctx.font = "10px serif";
        u.ctx.textAlign = "start";
        u.ctx.fillStyle = increase_brightness(l.color(), 40);

        let dy = height - limitHeight + top;
        u.ctx.fillText(l.label, left, dy - 6);
        u.ctx.moveTo(left, dy);
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

  protected getOptions() {
    return {
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
        this.wheelZoomPlugin({ factor: 0.75 }),
        this.labelsPlugin(this.labels)
      ],
      mode: 1,

      scales: {
        x: {
          range: () => <Scale.Range>this.params.range,

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
          values: (u, vals, space) => vals.map(v => {
            let rounded = v.toFixed(4).replace(/0*$/, "");
            if (rounded[rounded.length - 1] == ".") {
              rounded = rounded.replace(".", "");
            }

            return rounded;
          })
          //side: 0,
        } as Axis, //x axe
        GetDefaultAxe("y1", 1),
        GetDefaultAxe("y2", 1),
        GetDefaultAxe("y3", 3),
        GetDefaultAxe("y4", 1),

        GetDefaultAxe("y6", 3),
        GetDefaultAxe("y7", 3),
        GetDefaultAxe("y8", 3),
        GetDefaultAxe("y9", 3),

        GetDefaultAxe("y10", 3),
        GetDefaultAxe("y11", 3),
        GetDefaultAxe("y12", 3),
        GetDefaultAxe("y13", 3),
      ],
      hooks: {
        setCursor: [
          (u: uPlot) => {
            let left = u.cursor.left;
            if (left) {
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
            this.SetScale(min, max);
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

  protected InitAxes() {
    let axisDivs = this.element.getElementsByClassName("u-axis");
    for (let i = 0; i < axisDivs.length; i++)
      this.SetupYAxis(i);
  }

  protected BuildPlot() {
    this.plot = new uPlot(this.options, this.data, this.element);

    this.interval = setInterval(() => {
      let currentPlotBuffer = this._data;
      let currentBuffer = this.data;

      if (currentPlotBuffer !== currentBuffer) {
        this.plot?.setData(currentBuffer, false);
        this._data = currentBuffer;
      }

      this.plot?.redraw(true, true);
    }, 30); // отрисовка

    setTimeout(() => this.InitLegend(), 100);
    setTimeout(() => this.InitAxes(), 100);
  }

  public DestroyPlot() {
    if (this.plot) {
      this.plot.destroy();
      this.options = this.getOptions();
      if (this.interval)
        clearInterval(this.interval);
      this.element.innerHTML = '';
    }
  }

  private InitLegend() {
    let legendSeries = this.element.getElementsByClassName("u-series");
    this.legendItems = new Array<LegendItem>();
    let e = this.element.getElementsByClassName("u-over")[0];
    e.addEventListener("mouseleave", () => {
      if (this.legendItems) {
        this.legendItems.forEach(la => la.setValue("--"));
      }
    });
    Array.from(legendSeries).forEach((e, i) => {

      let item = legendSeries[i];

      this.legendItems?.push({
        getValue: () => { return item.getElementsByClassName("u-value")[0].innerHTML; },
        setValue: (value: string) => { item.getElementsByClassName("u-value")[0].innerHTML = value; },
        isActive: () => !item.classList.contains("u-off"),

      })
    })

    let timeSeries = this.element.getElementsByClassName("u-series")[0];
    let label = timeSeries.getElementsByClassName("u-label");
    let value = timeSeries.getElementsByClassName("u-value");
    label[0].innerHTML = "Время";

    let prev = ""
    value[0].addEventListener('DOMSubtreeModified', function (e) {
      let val = value[0].innerHTML;
      e.stopPropagation();
      if (val != "--" && val != prev && val.length != 0 && val[val.length - 1] != "с") {
        let newVal = val + " с";
        value[0].innerHTML = newVal;
        prev = newVal;
      }
    });

    this.plot?.setSize(this.getSize());
  }

  protected Redraw() {
    this.plot?.redraw();
  }

  protected Wheel(e: number): boolean {
    return false;
  }

  private YAxisRangeChanged(index: number, dy: number) {
    let range = this.seriesInfos[index - 1].curRange
    let curRangeVal = range[1] - range[0];

    //вычисляем относительное смещение 
    let dVal = curRangeVal * dy;

    range[0] += dVal / 2;
    range[1] += dVal / 2;
  }

  private XAxisRangeChanged(dx: number) {
    let range = this.params.range
    let curRangeVal = range[1] - range[0];

    //вычисляем относительное смещение 
    let dVal = curRangeVal * dx;

    range[0] += dVal;
    range[1] += dVal;
  }

  protected setCursor() {
    if (!this.plot || !this.legendItems)
      return;

    const findTime = 5;
    let left = this.plot?.cursor.left as number;
    let xVal = this.plot.posToVal(left, 'x');
    let dt = 1 / this.params.pointsPerSecond;
    let maxCount = findTime / dt;
    let index = this.timeToIndex(xVal);

    if (left && this.legendItems && xVal < this.params.th && xVal > this.params.t0) {
      // let curValues = GetApproximateValues(this.data, xVal);

      for (let i = 0; i < this.data.length - 1; i++) {
        let nearestVal = nearestPoint(this.data[i + 1], index, maxCount);
        let seriesInfo = this.seriesInfos[i];
        let strValue = nearestVal !== undefined && nearestVal !== null ? nearestVal!.toFixed(seriesInfo.style.legendValueAcurency).toString() : "--";
        if (this.legendItems) {
          try {
            this.legendItems[i + 1].setValue(strValue);
          }
          catch { }

        }
      };
    }
  }

  public ZoomX(step: number = 20) // в процентах
  {
    let ratio = step / 100;
    let screenSize = this.params.screenSize()
    this.params.range[0] += ratio * screenSize;
    this.params.range[1] -= ratio * screenSize;
  }

  public MoveX(step: number) // в процентах
  {
    let ratio = step / 100;
    let screenSize = this.params.screenSize();
    this.params.range[0] += ratio * screenSize;
    this.params.range[1] += ratio * screenSize;
  }

  public ZoomY(step: number = 20) // в процентах
  {
    let grouped = groupBy(this.seriesInfos, s => s.style.valueType);
    let ratio = step / 100;
    grouped.forEach(g => {
      let range = g[1][0].curRange[1] - g[1][0].curRange[0];
      g[1][0].curRange[0] += ratio * range;
      g[1][0].curRange[1] -= ratio * range;
    })
  }

  public HorizontalAlign() {
    this.params.range[0] = 0;
    this.params.range[1] = this.params.th === 0 ? 5 : this.params.th;
  }

  public VerticalAlign() {
    let groupedByType = groupBy(this.seriesInfos, (e) => e.style.valueType);
    groupedByType.forEach(g => {
      let maxRange: number[] = [0, 0];

      // Find max y range element/
      g[1].forEach(el => {
        if (Math.abs(el.style.range[0]) > Math.abs(maxRange[0]))
          maxRange[0] = el.style.range[0];

        if (Math.abs(el.style.range[1]) > Math.abs(maxRange[1]))
          maxRange[1] = el.style.range[1];
      })

      g[1][0].curRange[0] = maxRange[0];
      g[1][0].curRange[1] = maxRange[1];
    });
  }

  public PressLeft() {
    let screenSize = this.params.screenSize();
    this.params.range[1] = this.params.t0 + screenSize;
    this.params.range[0] = this.params.t0;
  }

  public PressRight() {
    let screenSize = this.params.screenSize();
    this.params.range[1] = this.params.th;
    this.params.range[0] = this.params.th - screenSize;
  }

  protected SeriesDraw(i: number) { }

  protected SelectCommited() { }

  protected DbClick(e: any) { }

  protected AxisWheel(dy: number) { }

  protected AxisZoom(index: number, dy: number): void {
    let dir = dy > 0 ? 1 : -1;

    let series = this.seriesInfos[index - 1];
    let curRange = series.curRange;

    let rangeVal = curRange[1] - curRange[0];
    let dyTop = series.style.rescaleRationTop * rangeVal;
    let dyBottom = series.style.rescaleRationBottom * rangeVal;
    let newRange = [curRange[0] - dyBottom * dir, curRange[1] + dyTop * dir];

    series.curRange[0] = newRange[0];
    series.curRange[1] = newRange[1];
  }

  private SetupYAxis = (i: number) => {
    let axisDivs = this.element.getElementsByClassName("u-axis");
    let divAxis = axisDivs[i];

    let dragStart = false;
    let yCoord = 0;
    let xCoord = 0;

    divAxis.addEventListener('mousedown', (e: any) => {
      dragStart = true;
      yCoord = e.clientY;
      xCoord = e.clientX;
    });

    document.addEventListener('mouseup', (e: any) => {
      dragStart = false;
    });

    document.addEventListener('mousemove', (e: any) => {
      if (dragStart) {
        if (i == 0) {
          let curX = e.clientX;
          let divWidth = divAxis.clientWidth;
          let cursorDx = curX - xCoord;
          xCoord = curX
          let l = cursorDx / divWidth;
          this.XAxisRangeChanged(-l);
        }
        else {
          let curY = e.clientY;
          let divHeigh = divAxis.clientHeight;
          let cursorDy = curY - yCoord;
          yCoord = curY
          let l = cursorDy / divHeigh;
          this.YAxisRangeChanged(i, l);
        }
      }
    });

    if (i != 0) {
      divAxis.addEventListener('mousewheel', (e: any) => {
        e.preventDefault();
        this.AxisZoom(i, e.deltaY);
      });
    }
  }
}