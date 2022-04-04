import { Color } from "plotly.js/lib/core";
import { Plot } from "../Plot/plot";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../Sensor/SensorDefinitions";
import { ChannelStyle } from "./ChannelStyle";


// Содержит информацию для отображения на графике. подает данные на график
export class Channel
{
    private source: ISimpleEvent<dataEventArgs>;
    private style: ChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;
    // Фабричный метод создание каналов из Sensor

    public constructor (dataSourse: ISimpleEvent<dataEventArgs>, style: ChannelStyle)
    {
        this.style = style;
        this.source = dataSourse;
    }

    public async AttachToPlot(plot: Plot)
    {
        if (plot == null) throw "plot is null";
        this.traceId = await plot.AddTrace();
        await plot.SetTraceStyle(this.traceId, this.style);
        this.source.sub((data: dataEventArgs) =>{
            var update = {
                x:  [[data.time]],
                y: [[data.data]]
                }
            
        plot.AddData(update, <number>this.traceId);
        this.isAttached = true;
        })
    }
}