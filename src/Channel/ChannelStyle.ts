import { LayoutAxis, PlotData, PlotMarker } from 'plotly.js/lib/core';
import { ColorsDefs } from '../Common/Colors';

export class ChannelStyle{
    public traceStyle = {
    name: 'yaxis',
    marker:
    {
        color: ColorsDefs.black,
        size: 0,
    } as Partial<PlotMarker>,
    line: {
        width: 3,
        dash: 'solid',
        color: ColorsDefs.black,
        shape: "spline",
        simplify: false,
        smoothing: 1,
        },
    } as Partial<PlotData>;

    yAxeStyle = 
    {
        range: [0, 0],
        tickmode: 'auto',
        //tickangle: 45,
        nticks: 10,
        tickwidth: 2,
        tickcolor: ColorsDefs.black,
        color: ColorsDefs.black,
    } as Partial<LayoutAxis>
}