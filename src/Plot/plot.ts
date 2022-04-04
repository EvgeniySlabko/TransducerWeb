
import * as Plotly from 'plotly.js/lib/core';
import { Data, LayoutAxis, PlotData, YAxisName } from 'plotly.js/lib/core';
import { ChannelStyle } from '../Channel/ChannelStyle';
import { createConfig, createLayout } from './Components';
import { createTrace } from './PlotComponentFactory';


export class Plot{

    private element: HTMLElement;
    private currentTraceId: number = 0;
    // id трека, индекс массива данных, (индекс трека, имя оси y)
    private id_index_map : Map<number, [number, string]> = new Map();
    private yAxies: YAxisName[] =['y4' , 'y5' , 'y6' , 'y7' , 'y8' , 'y9', 'y' ,'y2' , 'y3'] //доступные оси;


    private loyout: Partial<Plotly.Layout>;
    private config: Partial<Plotly.Config>;
    
    public constructor(element: HTMLElement)
    {
        this.loyout = createLayout();
        this.config = createConfig();
        this.element = element;
    }

    public async DrawPlot()
    {
        //var data : Data[] = [createTrace(0), createTrace(1), createTrace(2)];
        await Plotly.newPlot(this.element, [], this.loyout, this.config);
    }

    public async AddData(data: any, traceId: number) : Promise<void>
    {
        let index = this.id_index_map.get(traceId);
        if (index == undefined)
            throw "invalid id";

        await Plotly.extendTraces(this.element, data, [traceId]);
    }

    public async AddTrace() : Promise<number>
    {
        var axename= this.yAxies.pop();
        if (axename == undefined) throw "Нелязя больше добавить";

        var index = this.id_index_map.size;
        var id =  this.currentTraceId++;

        var trace = createTrace(axename);
        
        await Plotly.addTraces(this.element, trace);
        this.id_index_map.set(id, [index, axename]);
        return id;
    }

    //задает параметры отображения для трека.
    public async SetTraceStyle(traceId: number, style: ChannelStyle): Promise<void>
    {
        var traceIndex = this.element.dataset
    }

    public RemoveTrace(traceId: any)
    {
        var index = this.id_index_map.get(traceId)?.[0];
        if (index == undefined)
            throw "invalid id";
        
        Plotly.deleteTraces(this.element, index);
        for (let entry of this.id_index_map.entries()) {
            if (entry[0] > index)
            {
                entry[0]--; 
            }
        }
    }

    private getAxwById(name: YAxisName) : Partial<Plotly.LayoutAxis>
    {
        switch(name)
        {
            case "y": return <Plotly.LayoutAxis>this.loyout.yaxis;
            case "y2": return <Plotly.LayoutAxis>this.loyout.yaxis2;
            case "y3": return <Plotly.LayoutAxis>this.loyout.yaxis3;
            case "y4": return <Plotly.LayoutAxis>this.loyout.yaxis4;
            case "y5": return <Plotly.LayoutAxis>this.loyout.yaxis5;
            case "y6": return <Plotly.LayoutAxis>this.loyout.yaxis6;
            case "y7": return <Plotly.LayoutAxis>this.loyout.yaxis7;
            case "y8": return <Plotly.LayoutAxis>this.loyout.yaxis8;
            case "y9": return <Plotly.LayoutAxis>this.loyout.yaxis9;
            default: throw "invalid yaxie name";
        }
        
    }
}

