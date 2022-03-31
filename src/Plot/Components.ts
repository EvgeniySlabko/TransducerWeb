import { AxisName, DataTitle, Font, Layout, LayoutAxis, Color, Padding, PlotData, TypedArray, Datum } from "plotly.js/index";
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

    //type = 'scatter';
    yaxis: string;
    xaxies: string;
    public type: any = 'scatter';
    //marker: any =
    //{
     //    size: 12
   // };
}

export class PlotLayout //implements Partial<Layout> 
{
    title:  | string | Partial<{
          text: string;
          font: Partial<Font>;
          xref: 'container' | 'paper';
          yref: 'container' | 'paper';
          x: number;
          y: number;
          xanchor: 'auto' | 'left' | 'center' | 'right';
          yanchor: 'auto' | 'top' | 'middle' | 'bottom';
            pad: Partial<Padding>}> = 'Transducer';

    //font: Partial<Font> = new  axisFont();
    autosize: boolean = true;
    
    showlegend: boolean = true;
    xaxis : Partial<LayoutAxis> = new XAxis();
    //xaxis2 : Partial<LayoutAxis> = new XAxis();
    yaxis = new yAxis("free");
    yaxis2 : any = {
      title: 'yaxi title',
      titlefont: {color: 'rgb(148, 103, 189)'},
      tickfont: {color: 'rgb(148, 103, 189)'},
      anchor: 'x',
      overlaying: 'y',
      side: 'left',
  
      };
    yaxis3: any = {
      title: 'yaxi tfdsfitle',
      titlefont: {color: 'rgb(3, 103, 189)'},
      tickfont: {color: 'rgb(3, 103, 189)'},
      anchor: 'x',
      overlaying: 'y',
      side: 'left',
  
      };
      /*
    yaxis3: any = {
        title: 'yaxis2 title',
        titlefont: {color: 'rgb(12, 103, 189)'},
        tickfont: {color: 'rgb(244, 103, 189)'},
        overlaying: 'y3',
        side: 'left'
      }; 
    yaxis4: Partial<yAxis> = new yAxis(); 
    yaxis5: Partial<yAxis> = new yAxis(); 
    yaxis6: Partial<yAxis> = new yAxis(); 
    yaxis7: Partial<yAxis> = new yAxis(); 
    yaxis8: Partial<yAxis> = new yAxis(); 
    yaxis9: Partial<yAxis> = new yAxis(); 
*/
}

export class yAxis implements Partial<LayoutAxis>
{
    public constructor(overlaying: 'free' | AxisName = 'y')
    {
      this.overlaying = overlaying;
    }
    //static axisIndex: number = 0;
    anchor: 'free' | AxisName = 'x';
    side: 'top' | 'bottom' | 'left' | 'right' | 'clockwise' | 'counterclockwise' = 'left';
    title: string | Partial<DataTitle> = 'yaxis title';
    titlefont: Partial<Font> = {color: '#d62728'};
    tickfont: Partial<Font> = {color: '#d62728'};
    overlaying: 'free' | AxisName;
    //constraintoward: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom' = "left";
}

export class XAxis implements Partial<LayoutAxis>
{

    autorange: boolean = false;
    zeroline: boolean = true
    showline: boolean = true;
    layer: 'above traces' | 'below traces' = 'below traces';
        
    //fixedrange : boolean = false;
}
/*

export class axisFont implements Partial<Font>
{
    family: string = "Arial, sans-serif";

    size: number = 13;
    color: Color = Math.floor(Math.random());
}*/