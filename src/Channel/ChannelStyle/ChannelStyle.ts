import { type } from 'jquery';
import { LayoutAxis, PlotData, PlotMarker } from 'plotly.js/lib/core';
import { ColorsDefs } from '../../Common/Colors';

export type ValueType = "torque" | "speed" | "tmp" | "power";

export declare class ChannelStyle{
    grid: boolean;
    unitName: string;
    valueType: ValueType;
    yTitle: string;
    legendTitle: string;
    range: number[];
    color: string ;
    line: "dash" | "solid";
    yAxeSide: "right" | "left";
}