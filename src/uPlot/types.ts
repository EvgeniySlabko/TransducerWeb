
import { MyUPlotBase } from "./PlotBase";
import { PlotBufferManager } from "./StreamingPlot/StreamingBufferManager";

export interface CustomOptions extends uPlot.Options
{
    pointsPerSecond?: number,
    maxScreenSize: number,
    labels?: PlotLabel[],
    range?: [number, number], // Time range.
    fps?: number,
    t0: number,
    th: number,
    rangeSouce: [number, number],
    isLegendEnabled: boolean;
    rangeIncerteptor?: (plot: CustomUPlot, min: number, max: number) => [number, number];
}

export interface CustomScale extends uPlot.Scale
{
    rangeSource: [number, number],
}

export interface CustomScales {
    [key: string]: CustomScale;
}

export interface CustomAxis extends uPlot.Axis
{
    rescaleRatio: [number, number];
    type: string;
}

export interface CustomSeries extends uPlot.Series
{

}

export interface PlotLimit
{

}

export interface PlotLabel
{
    scale: string;
    time: number;
    text: string;
    value: number;
}

export interface CustomUPlot extends uPlot
{
    streaming: boolean;
    pointsPerSecond?: number,
    getMaxTime: () => number;
    buffer: PlotBufferManager | undefined;
    maxScreenSize: number,
    rangeSouce: [number, number],
    SetRangeSource: (min: number, max: number) => void

    redrawRequired: boolean;
    isLegendEnabled: boolean;
}

interface ExtendedDefs extends uPlot.Hooks.Defs {
    /** fires when a axis drags */
    dragAxis?: (self: uPlot) => void;

    /** fires when a over div drags */
    dragOver?: (self: uPlot) => void;

    /** fires when a over div drags */
    manualRedraw?: (self: uPlot) => void;
  }

export type CustomArray = {
    [P in keyof ExtendedDefs]: ExtendedDefs[P][]
}

export type CustomArraysOrFuncs = {
    [P in keyof ExtendedDefs]: ExtendedDefs[P][] | ExtendedDefs[P]
}

export interface CustomPlagin {
    opts?: (self: uPlot, opts: CustomOptions) => void | CustomOptions;
    hooks: CustomArraysOrFuncs;
}