
import * as Plotly from 'plotly.js/lib/core';
import { Data, LayoutAxis, PlotData, YAxisName } from 'plotly.js/lib/core';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { createConfig, createLayout } from './Components';
import { createTrace } from './PlotComponentFactory';
import $ = require("jquery");
import { Channel } from '../Channel/Channel/Channel';

export class Plot{

    private element: HTMLElement;
    private currentTraceId: number = 0;
    // id трека, индекс массива данных, (индекс трека, имя оси y)
    private id_index_map : Map<number, [number, string]> = new Map();
    private yAxies: YAxisName[] = ['y4' , 'y5' , 'y6' , 'y7' , 'y8' , 'y9' , 'y3', 'y2', 'y'] //доступные оси;
    
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
        //await Plotly.newPlot(this.element, [], this.loyout, this.config);
        //await Plotly.react(this.element, [], this.loyout, this.config);
        Plotly.react(this.element, [], this.loyout, this.config);
    }

    public async AddData(data: Partial<PlotData>, traceId: number) : Promise<void>
    {
        let index = this.id_index_map.get(traceId);
        if (index == undefined)
            throw "invalid id";

        try
        {
            
            var x1 = (<any>data.x)[0][0];
            this.loyout.xaxis!.range = [x1 - 1, x1 + 1];
            
            //await Plotly.relayout(this.element, this.loyout);
            await Plotly.extendTraces(this.element, data, [index[0]]);

        }
        catch(ex)
        {
            console.log(ex);
        }
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

    public async AttachChannel(channel: Channel) : Promise<number>
    {
        var axename= this.yAxies.pop();
        if (axename == undefined) throw "Нелязя больше добавить";

        var index = this.id_index_map.size;
        var id =  this.currentTraceId++;

        var trace = createTrace(axename);

        await Plotly.addTraces(this.element, trace);
        this.id_index_map.set(id, [index, axename]);

        var newId = id;
        channel.onData.sub(async (data, args) => 
        {
            await this.AddData({
                x: [args.data.time],
                y: [args.data.data]
            } as Partial<PlotData>, newId)
        });
        return id;
    }

    private getAxeById(name: YAxisName) : Partial<Plotly.LayoutAxis>
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

    private Copy(from: any, to: any)
    {
        //var names = Object.getOwnPropertyNames(to);

        for (var key in to) {
            if (from.hasOwnProperty(key))
            {
                if (typeof from[key] === 'object')
                {
                    this.Copy(from[key], to[key]);
                }
                else{
                    to[key] = from[key]
                }
            }
        }
    }   
}

