import uPlot, { Axis } from "uplot";


var ii: number = 1;
export function GetSeries(scale: string)
{
    return {
        label: "Undefined",
        stroke: "red",
        scale: scale,
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
        scale: scale,
        show: true,
        gap: ii++ * 1,
        ticks: 10,
        space: 20,
        side: side,
    } as Axis
}

export function GetScale()
{
    return {
        auto: true,
        //range: [-100, 100],
        //space: 10,
    } as uPlot.Scale
}

export function GetOptions() : uPlot.Options
{
const opts = {  
    title: "Transducer",
    width: 2450,
    height: 600,
    pxAlign: true,
    scales: {
        x: {
            auto: true,
            time: false,
            //range: [0, 30],
        },
        y1: GetScale(),
        y2: GetScale(),
        y3: GetScale(),
    },
    axes: [
        {
            show: true,
            space: 100,
            //side: 0,
        } as Axis, //x axe
        GetAxe("y1", 1),
        GetAxe("y2", 1),
        GetAxe("y3", 3),
    ],
    series: [
        {}, // x series
    ],
    } as uPlot.Options;

    return opts;
}