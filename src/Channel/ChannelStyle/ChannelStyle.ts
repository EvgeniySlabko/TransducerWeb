import { type } from 'jquery';
import { LayoutAxis, PlotData, PlotMarker } from 'plotly.js/lib/core';
import { Axis } from 'uplot';
import { ColorsDefs } from '../../Common/Colors';

export type ValueType = "torque" | "speed" | "tmp" | "power" | "power";

export declare class ChannelStyle{
    grid: boolean;
    unitName: string;
    valueType: ValueType;
    yTitle: string;
    legendTitle: string;
    range: number[];
    color: Axis.Stroke ;
    line: "dash" | "solid";
    yAxeSide: "right" | "left";
}