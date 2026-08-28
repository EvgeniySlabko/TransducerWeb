import  uPlot, { Axis, Scale, Series, AlignedData as AlignedData } from "./uplot";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import { CustomScale, CustomUPlot } from "./types";

export declare class PlotParameters {
    pointsPerSecond: number;
    maxScreenSize: number;
}

export declare class LegendItem {
    public setValue: (value: string) => void;
    public getValue: () => string;
    public isActive: () => boolean;
}

export declare class Label {
    scale: string;
    time: number;
    text: string;
    value: number;
}

export type SeriesInfo = {
    style: PlotChannelStyle;
    dataBufferIndex: number;
    curRange: number[];
    axis: Axis;
    series: Series;
    scale: Scale;
};

export type GetData = (min: number, max: number) => AlignedData

export class MyUPlotBase {
    public plot: CustomUPlot;
    
    constructor(u: CustomUPlot) 
    {
        this.plot = u
    }
    
    public get curRange() : [number, number] {
        return [this.plot.rangeSouce[0], this.plot.rangeSouce[1]]
    }

    public get screenSize() : number {
        return this.plot.rangeSouce[1] - this.plot.rangeSouce[0]
    }

    public setSize(width: number, height: number) {
        this.plot.setSize({width, height});
    }

    public Clear() {
        this.plot.buffer?.CleanSegments();
    }

    public ZoomX(
        step: number = 20 // в процентах
    ) {
        let ratio = step / 100;
        let range = this.curRange;
        let screenSize = this.screenSize;
        let min = range[0] + ratio * screenSize;
        let max = range[1] - ratio * screenSize;
        this.plot.SetRangeSource(min, max);
    }

    public SetRange = (min: number, max: number) => 
        this.plot.SetRangeSource(min, max);
    
    public MoveX(
        step: number // в процентах
    ) {
        let ratio = step / 100;
        let screenSize = this.screenSize;
        let range = this.curRange;
        let min = range[0] + (ratio * screenSize);
        let max = range[1] + (ratio * screenSize);
        this.plot.SetRangeSource(min, max);
    }

    public ZoomY(
        step: number = 20 // в процентах
    ) {
        let yScales = this.yScales;
        let ratio = step / 100;
        yScales.forEach((scale) => {
            let range = scale.max! - scale.min!;
            let min = scale.min! + ratio * range;
            let max = scale.max! + ratio * range;
            scale.range = () => [min, max]
        });
    }

    private get yScales() : CustomScale[]{
        const yScales : CustomScale[] = [];
        for (let key in this.plot.scales) {
            yScales.push(this.plot.scales[key] as CustomScale);
        }

        return yScales;
    }
}