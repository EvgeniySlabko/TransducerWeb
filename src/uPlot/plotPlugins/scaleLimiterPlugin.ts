import uPlot, { Plugin } from "../uplot";
import { CustomAxis, CustomUPlot } from "../types";

export const setScreenSize = (u: CustomUPlot, size: number) => {
    const xScale = u.scales["x"];
    let actualSize = size > u.maxScreenSize! ? u.maxScreenSize! : size;

    let rangeVal = xScale.max! - xScale.min!;
    let mid = xScale.min! + rangeVal / 2;

    const newMin = mid - actualSize / 2;
    const newMax = mid + actualSize / 2;

    xScale.range = () => [newMin, newMax]
}

export const rangeIncerteptor = (plot: CustomUPlot, min: number, max: number) : [number, number] =>
{
    const actualMin = min < 0 ? 0 : min;
    const size = max - actualMin;
    if (size > plot.maxScreenSize)
    {
        let rangeVal = plot.rangeSouce[1] - plot.rangeSouce[0];
        let mid = plot.rangeSouce[0] + rangeVal / 2;
        return [mid - plot.maxScreenSize / 2, mid + plot.maxScreenSize / 2];
    }

    return [actualMin, max]
}

export const ScaleLimiterPlugin = () : Plugin =>{
    function setScaleHandler(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        
        let rangeValue = customUPlot.rangeSouce[1] - customUPlot.rangeSouce[0];
        if (rangeValue > customUPlot!.maxScreenSize!) {
            setScreenSize(customUPlot, customUPlot!.maxScreenSize!);
        }
    }

    return {
        hooks: {
            setScale: setScaleHandler
        }
    };
}