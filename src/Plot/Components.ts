import { AxisName, DataTitle, Font, Layout, LayoutAxis, Color, Padding, PlotData, TypedArray, Datum, Config } from "plotly.js/index";
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
      
  } as Partial<Layout> ;
}

export function createConfig(): Partial<Config> {
return {
      responsive: true,
      //scrollZoom: true,
      //mode: 'lines+markers',
      //autosizable: true,
      displayModeBar: true,
      plotlyServerURL: "https://chart-studio.plotly.com",
      linkText: 'Редактор графика',
      showEditInChartStudio: true,
      displaylogo: false,
      //editable: true,
                      
      } as Partial<Config>;
}


