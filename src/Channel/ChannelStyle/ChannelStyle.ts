import { LayoutAxis, PlotData, PlotMarker } from 'plotly.js/lib/core';
import { ColorsDefs } from '../../Common/Colors';

export declare class ChannelStyle{
    yTitle: string;
    legendTitle: string;
    range: number[];
    color: string ;
    line: "dash" | "solid";
}