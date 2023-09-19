import uPlot, { AlignedData, Axis, Options, Plugin, Range, Scale } from "../uplot";
import { CustomArray, CustomUPlot } from "../types";

export const RedrawPlugin = () : Plugin =>{

    let interval: NodeJS.Timeout | undefined;
    function readyHandler(u: uPlot) {
        const customHooks = u.hooks as CustomArray;
        interval = setInterval(() => {
            if (customHooks.manualRedraw) 
                customHooks.manualRedraw.forEach(e => e!(u));

            
        }, 17); // отрисовка
    }

    function destroyHandler(u: uPlot) {
        clearTimeout(interval);
    }

    return {
        hooks: {
            ready: readyHandler,
            destroy: destroyHandler
        }
    };
}