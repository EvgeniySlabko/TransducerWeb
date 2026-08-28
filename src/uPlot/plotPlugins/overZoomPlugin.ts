import uPlot, { Plugin } from "../uplot";
import { CustomUPlot } from "../types";

export const OverZoomPlugin = (minRange: number, rescaleRatio: number) : Plugin =>{
    const readyHandler = (u: uPlot) => {
        const customUPlot = u as CustomUPlot;

        u.over.addEventListener("wheel", (e: any) => {
            e.preventDefault();

            const xMin = customUPlot.rangeSouce[0];
            const xMax = customUPlot.rangeSouce[1];
            const xRange = xMax - xMin;

            if (xRange < minRange && e.deltaY < 0) 
                return;

            const rect = u.over.getBoundingClientRect();
            const left = u.cursor.left!

            let leftPct = left / rect.width;
            let xVal = u.posToVal(left, "x");

            const nxRange = e.deltaY < 0 ? xRange * rescaleRatio : xRange / rescaleRatio;
            let nxMin = xVal - nxRange * leftPct;
            let nxMax = nxMin + nxRange;

            customUPlot.SetRangeSource(nxMin, nxMax);
            customUPlot.redrawRequired = true;
        });
    }

    return {
        hooks: {
            ready: readyHandler
        }
    };
}