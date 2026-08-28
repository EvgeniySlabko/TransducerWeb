import { CustomUPlot } from "../types";
import uPlot, { Plugin } from "../uplot";

export const AutoRange = (screenOffset: number) : Plugin => {
    function handleSetData(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        if (customUPlot.streaming)
        {
            let min = customUPlot.rangeSouce[0];
            let max = customUPlot.rangeSouce[1];
            let maxTime = customUPlot.getMaxTime();
            let screenSize = max - min;

            if (maxTime > max - (screenSize * screenOffset) / 100 + 0.01) {
                let newMax = maxTime;
                let newMin = maxTime - screenSize;
                let xRange = newMax - newMin;
                let timeOffset = (screenOffset / 100) * xRange;
                newMax += timeOffset;
                newMin += timeOffset;
                customUPlot.SetRangeSource(newMin, newMax);
            }
        }
    }

    function handleInit(u: uPlot) {
        const uPlot = u as CustomUPlot;
        uPlot.streaming = true;
    }

    return {
        hooks: {
            init: handleInit,
            setData: handleSetData
        }
    };
};