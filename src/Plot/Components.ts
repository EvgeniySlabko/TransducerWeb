import { AxisName, DataTitle, Font, Layout, LayoutAxis, Color, Padding, PlotData, TypedArray, Datum, Config, Edits, ModeBarDefaultButtons } from "plotly.js/index";
import * as Factory from "./PlotComponentFactory";
export class PlotTrace implements Partial<PlotData>
{
    public constructor(yAxis: string, xAxis: string)
    {
        this.yaxis = yAxis;
        this.xaxies = xAxis;
    }
    
    publicname: string = "Trace";
    //legendrank: number = 3;
    public visible: boolean | 'legendonly' = true;
    public x: Datum[] | Datum[][] | TypedArray = [];
    public y: Datum[] | Datum[][] | TypedArray = [];
    mode:
        | 'lines'
        | 'markers'
        | 'text'
        | 'lines+markers'
        | 'text+markers'
        | 'text+lines'
        | 'text+lines+markers'
        | 'none'
        | 'gauge'
        | 'number'
        | 'delta'
        | 'number+delta'
        | 'gauge+number'
        | 'gauge+number+delta'
        | 'gauge+delta' = 'lines';


    yaxis: string;
    xaxies: string;
    public type: any = 'scatter';
}

export function createLayout() : Partial<Layout> 
{
  return {
      titlefont:
      {
          color: "#009900",
          family: 'sans-serif',
          size: 25,

      },
      title: 'Transducer',
      autosize: true,
      showlegend: true,
      xaxis: Factory.createXAxes(),
      yaxis: Factory.createFirstYAxes(),
      yaxis2: Factory.createYAxes(),
      yaxis3: Factory.createYAxes(),
      yaxis4:  Factory.createYAxes(),
      yaxis5:  Factory.createYAxes(),
      yaxis6:  Factory.createYAxes(),
      yaxis7: Factory.createYAxes(),
      yaxis8: Factory.createYAxes(),
      yaxis9:  Factory.createYAxes(),
      paper_bgcolor: "#99bbff",
      plot_bgcolor: "#ffe0b3",
      margin:
      {
          b: 40,
          l: 0,
          t: 60,
          r: 15,
      },
      legend: {
          bgcolor: "#3385ff",
          borderwidth: 3,
        x: -10,
        traceorder: 'grouped',
        font: {
          family: 'sans-serif',
          size: 13,
          color: '#000',
        },
        
    }

  } as Partial<Layout> ;
}

export function createConfig(): Partial<Config> {
return {
    edits:  {
        annotationPosition: true,
        annotationTail: true,
        annotationText: true,
        axisTitleText: true,
        colorbarPosition: true,
        colorbarTitleText: true,
        legendPosition: true,
        legendText: true,
        shapePosition: true,
        titleText: true,
    } as Edits,

      showTips: false,
      doubleClick: 'reset+autosize',
      toImageButtonOptions: "png",
      responsive: true,
      //scrollZoom: true,
      //mode: 'lines+markers',
      //autosizable: true,
      displayModeBar: true,
      plotlyServerURL: "https://chart-studio.plotly.com",
      linkText: 'Редактор графика',
      showEditInChartStudio: true,
      displaylogo: false,
      modeBarButtons:  [[ 
      'select2d'
      , 'sendDataToCloud'
      , 'zoom2d'
      , 'pan2d'
      , 'zoomIn2d'
      , 'zoomOut2d'
      , 'autoScale2d'
      , 'resetScale2d'
      , 'hoverClosestCartesian'
      , 'hoverCompareCartesian'
      , 'toggleHover'
      , 'toImage'
      , 'resetViews']],
      //editable: true,
                      
      } as Partial<Config>;
}


