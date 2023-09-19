import  uPlot, { Axis, Scale, Series, AlignedData as AlignedData } from "./uplot";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import { CustomOptions, CustomScale, CustomUPlot } from "./types";

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

    public setScaleRange = (min: number, max: number) => this.xScale.range = () => [min, max]
    
    public get curRange() : [number, number] {
        let scale = this.xScale;
        return [scale.min!, scale.max!]
    }

    public get screenSize() : number {
        let scale = this.xScale;
        return scale.max! - scale.min!
    }

    public setSize(width: number, height: number) {
        this.plot.setSize({width, height});
    }

    public Clear() {
        this.plot.buffer?.CleanSegments();
        this.plot.setData([], false);
    }

    public ZoomX(
        step: number = 20 // в процентах
    ) {
        let ratio = step / 100;
        let range = this.curRange;
        let screenSize = this.screenSize;
        let min = range[0] + ratio * screenSize;
        let max = range[1] - ratio * screenSize;
        this.setScaleRange(min, max);
    }

    public MoveX(
        step: number // в процентах
    ) {
        let ratio = step / 100;
        let screenSize = this.screenSize;
        let range = this.curRange;
        let min = range[0] + (ratio * screenSize);
        let max = range[1] + (ratio * screenSize);
        this.setScaleRange(min, max);
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

    private get xScale() : CustomScale {
        return this.plot.scales["x"] as CustomScale;
    }
    
    /*
    private SetCurrentScale() {
        let lastTime = this.plot!.buffer!.GetLastTime();
        let newMax = lastTime;
        let newMin = lastTime - this.plot!.scales["x"].max! - this.plot!.scales["x"].min!;
        let xRange = newMax - newMin;
        let timeOffset = (this.plot!.screenOffset / 100) * xRange;
        newMax += timeOffset;
        newMin += timeOffset;
        this.SetScale(newMin, newMax);
    }
    */

/*
    public HorizontalAlign() {
        
        this.SetScale(0, this.plot.data[0].[this.plot.data[]]);
    }

    public VerticalAlign() {
        let groupedByType = GroupBy(this.seriesInfos, (e) => e.style.valueType);
        groupedByType.forEach((g) => {
            let maxRange: number[] = [0, 0];

            // Find max y range element/
            g[1].forEach((el) => {
                if (Math.abs(el.style.range[0]) > Math.abs(maxRange[0])) maxRange[0] = el.style.range[0];

                if (Math.abs(el.style.range[1]) > Math.abs(maxRange[1])) maxRange[1] = el.style.range[1];
            });

            g[1][0].curRange[0] = maxRange[0];
            g[1][0].curRange[1] = maxRange[1];
        });
    }

    */
}