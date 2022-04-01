import { LayoutAxis, PlotData, RangeSelector } from "plotly.js/lib/core";


var colors = 
{
    red: "#FF0000",
    green: "#005000",
    blue: "#0000FF",
}

export function createFirstYAxes(): Partial<LayoutAxis> {
    var axes = createYAxes();
    axes.overlaying = "free";
    return axes;
  }
  
  var pos: number = 1;
export function createYAxes(): Partial<LayoutAxis> {
    return {
        //title: Math.random().toString(),
        
        ticks: 'outside',
       
        tickwidth: 2,
        tickcolor: colors.blue,
        linewidth: 3,
        domain: [1, 2],
        anchor: 'x',
        overlaying: 'y',
        side: 'left',
        //fixedrange: true,
        //autorange: true,
        //automargin: true,
        color: colors.red,
        zeroline: false,
        //rangeselector: createYAutoSelector(),
        //position: 200 * Math.random(),
        position: (pos++) / 4,
        rotation: 100,
        } as Partial<LayoutAxis>;
  }

  export function createXAxes(title: string = "X_Axe"): Partial<LayoutAxis> {
    return {
            title: title,
            autorange: true,
            zeroline:  true,
            showline:  true,
            layer:  'below traces',
            visible: true,
            anchor: 'x',
            rangemode: 'nonnegative',
            color: colors.green,

            //domain: [1, 2],
            linewidth: 3,
            ticks: 'outside',
            tickwidth: 2,
            tickcolor: colors.blue,
           

            //tickcolor: colors.blue
        } as Partial<LayoutAxis>;
  }

  export function createTrace(traceNumber: number): Partial<PlotData> {
    var yAxe = "y" +  ((traceNumber == 0) ? "" : traceNumber.toString());
    return {
            x: [],
            y: [],
            yaxis: yAxe,
            name: 'yaxis1 data',
            type: 'scatter',
            publicname: "Trace1",
            //side: 'left',
            
            //zeroline: false,  
           // automargin: true,
                          
          } as Partial<PlotData>;
  }


  

