import { LayoutAxis, PlotData, RangeSelector, YAxisName } from "plotly.js/lib/core";
import { ColorsDefs } from '../Common/Colors';

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
        tickcolor: ColorsDefs.blue,
        linewidth: 3,
        domain: [1, 2],
        anchor: 'x',
        overlaying: 'y',
        side: 'left',
        //fixedrange: true,
        autorange: true,
        //automargin: true,
        color: ColorsDefs.red,
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
      color: ColorsDefs.green,

      //domain: [1, 2],
      linewidth: 3,
      ticks: 'outside',
      tickwidth: 2,
      tickcolor: ColorsDefs.blue,
            //tickcolor: colors.blue
        } as Partial<LayoutAxis>;
  }

  export function createTrace(axeName: YAxisName): Partial<PlotData> {
    return {
      x: [],
      y: [],
      yaxis: axeName,
      name: 'yaxis' + axeName,
      type: 'scatter',
      publicname: "Trace1",
      side: 'left',
      line:
      {
        color: ColorsDefs.red,
        shape: "hvh",
        dash: "dot",
        smoothing: 4,
        width: 5
      },
      
      zeroline: false,  
      automargin: true,
                    
    } as Partial<PlotData>;
  }


  

