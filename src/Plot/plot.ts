
import * as Plotly from 'plotly.js/lib/core';
import { PlotLayout, PlotTrace } from './Components';

export class Plot{

    private element: HTMLElement;
    private currentTraceId: number = 0;
    private id_index_map : Map<number, number> = new Map();
    public constructor(element: HTMLElement)
    {
        //private plot: 
        this.element = element;

        
    }

    public async DrawPlot()
    {
        var trace1 = {
            x: [],
            y: [],
            yaxis: 'y',
            name: 'yaxis1 data',
            type: 'scatter',
            publicname: "Trace1",
            zeroline: true,

          };
          
          var trace2 = {
            x: [],
            y: [],
            name: 'yaxis2 data',
            yaxis: 'y2',
            type: 'scatter',
            publicname: "Trace2",
            zeroline: false,
          };

          var trace3 = {
            x: [],
            y: [],
            name: 'yaxis3 data',
            yaxis: 'y3',
            type: 'scatter',
            publicname: "Trace3",
            zeroline: false,
          };
          
          
          var data : any = [trace1, trace2, trace3];

        var plot = await Plotly.newPlot(this.element, <any>data, new PlotLayout(), {
            /*
            toImageButtonOptions: {
                format: 'svg', // one of png, svg, jpeg, webp
                filename: 'custom_image',
                height: 500,
                width: 700,
                scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
              },
              */
            //modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d','zoomOut2d'],
            responsive: true,
            scrollZoom: true,
            //mode: 'lines+markers',
            autosizable: true,
            displayModeBar: true,
            //showLink: true,
            plotlyServerURL: "https://chart-studio.plotly.com",
            linkText: 'Редактор графика',
            showEditInChartStudio: true,
            displaylogo: false,
            
            //doubleClickDelay: 1000,
        });
    }

    public async AddData(data: any, traceId: number) : Promise<void>
    {
        //let index = this.id_index_map.get(traceId);
        //if (index == undefined)
        //    throw "invalid id";

        await Plotly.extendTraces(this.element, data, [traceId]);
    }
    private yIndex: number = 1;
    public async AddTrace(trace: PlotTrace) : Promise<number>
    {
        //var index = this.id_index_map.size;
        //var id =  this.currentTraceId++;
        
        //trace.yaxis = "y";

        await Plotly.addTraces(this.element, <any>trace);
        //this.id_index_map.set(id, index);
        return this.currentTraceId++;
    }

    public RemoveTrace(traceId: any)
    {
        var index = this.id_index_map.get(traceId);
        if (index == undefined)
            throw "invalid id";
        
        Plotly.deleteTraces(this.element, index);
        for (let entry of this.id_index_map.entries()) {
            if (entry[1] > index)
            {
                entry[1]--; 
            }
        }
    }
}

