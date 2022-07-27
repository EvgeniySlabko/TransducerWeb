import { Axis, Scale, Series } from "uplot";

export type SeriesValue = (number | null | undefined)
export function GetSeries(scale: string) : Series {
    return {
        label: "Undefined",
        stroke: "red",
        scale: scale,
        points: {
            stroke: "green",
        },
        
        show: true,
    }
}

export function GetXAxe() : Axis {
    return {
        show: true,
    }
}

export function GetScale() : Scale{
    return {
        auto: false,
        distr: 1,
        time: false,
    }
}

export function GetDefaultAxe(scale: string, side: number) : Axis {
    return {
        grid:{
            show: false,
        },
        scale: scale,
        show: false,
        space: 20,
        side: side,
    }
}

