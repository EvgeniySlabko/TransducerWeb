import uPlot, { Axis } from "uplot";


var ii: number = 1;
export function GetSeries(scale: string)
{
    return {
        label: "Undefined",
        stroke: "red",
        scale: scale,
        //points: {show: false},
        show: true,
        //spanGaps :true,
    } as uPlot.Series
}

export function GetXAxe()
{
    return {
        show: true,
    } as uPlot.Axis
}

export function GetAxe(scale: string, side: number)
{
    return {
        grid:
        {
            show: false,
        },
        scale: scale,
        show: false,
        gap: ii++ * 1,
        ticks: 10,
        space: 20,
        side: side,
    } as Axis
}

