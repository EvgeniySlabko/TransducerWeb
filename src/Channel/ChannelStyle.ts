import { LayoutAxis, OhclData, PlotMarker } from 'plotly.js/lib/core';
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
        },
            
    } as Partial<OhclData>;

    yAxeStyle = 
    {
    tickwidth: 2,
    tickcolor: ColorsDefs.black,
    color: ColorsDefs.black,
    
    } as Partial<LayoutAxis>
}