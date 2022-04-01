
import * as Plotly from 'plotly.js/lib/core';
import { Data } from 'plotly.js/lib/core';
import { createConfig, createLayout, PlotTrace } from './Components';
import { createTrace } from './PlotComponentFactory';


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

          var data : Data[] = [createTrace(0), createTrace(1), createTrace(2)];

        var plot = await Plotly.newPlot(this.element, data, createLayout(), createConfig());
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

