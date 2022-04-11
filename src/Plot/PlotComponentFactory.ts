import { LayoutAxis, OhclData, PlotData, PlotMarker, RangeSelector, ScatterData, YAxisName } from "plotly.js/lib/core";
import { getFromId } from "../../dist/bundle";
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
        
        //ticks: 'outside',
        visible: true,
        //tickwidth: 2,
        //linewidth: 2,
        //dtick: 10,

        tickcolor: ColorsDefs.black,
        color: ColorsDefs.black,
        autorange: true,

        //tickmode: 'auto',
        tickangle: 90,
        //autorange: true,

        //anchor: 'free',
        overlaying: 'y',
        side: 'left',
        //fixedrange: true,
        //autorange: true,
        //automargin: true,
        zeroline: false,
        //rangeselector: createYAutoSelector(),
        //position: 200 * Math.random(),
        position:  (pos++) * 0.02 ,
        
        //gridcolor: ColorsDefs.black,
        //gridwidth: 1,
        //nticks: 20,
        //scaleratio: 0.1,
        rangeslider: 
        {
          bgcolor: ColorsDefs.black,
          bordercolor: ColorsDefs.black,
          borderwidth: 2,
        }

        //rotation: 100,
        } as Partial<LayoutAxis>;
  }

  export function createXAxes(title: string = "X_Axe"): Partial<LayoutAxis> {
    return {
      //rangeselector: {},
      //rangeslider: 
      //{
        //visible: true, 
      //},
      type: "linear",
      title: title,
      autorange: true,
      range: [0, 100],
      automargin: false,
      zeroline:  false,
      showline:  true,
      layer:  'below traces',
      visible: true,
      anchor: 'x',
      rangemode: 'nonnegative',
      color: ColorsDefs.green,
      constrain: "domain",
      domain: [0.06, 1],
      linecolor: ColorsDefs.black,
      linewidth: 2,
      ticks: 'outside',
      tickwidth: 2,
      tickcolor: ColorsDefs.black,
            //tickcolor: colors.blue
        } as Partial<LayoutAxis>;
  }

  export function createTrace(axeName: YAxisName): Partial<ScatterData> {
    return {
      x: [],
      y: [],
      yaxis: axeName,
      name: 'yaxis' + axeName,
      //type: 'scatter',
      publicname: "Trace1",
      side: 'left',
      mode: 'lines',
      type: 'scattergl',
      marker:
      {
        //color: ColorsDefs.black,
        size: 0,
      } as Partial<PlotMarker>,
      line: {
        range: [0, 0],
        tickmode: 'auto',
        width: 3,
        dash: 'solid',
        color: ColorsDefs.black,
        //shape: "spline",
        simplify: false,
        smoothing: 1,
        },
        
      
      zeroline: false,  
      automargin: false,
                    
    } as Partial<ScatterData>;
  }


  

