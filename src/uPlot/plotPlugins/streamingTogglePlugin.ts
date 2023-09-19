import uPlot, { Plugin } from "../uplot";
import { CustomAxis, CustomPlagin, CustomUPlot } from "../types";

export const StreamingTogglePlugin = () : Plugin =>{
    function inithandler(u: uPlot) {
        const customUplot = u as CustomUPlot;

        u.over.addEventListener("dblclick", (e: any) => {
            customUplot.streaming = !customUplot.streaming;
        });
    }

    const axisDragHandler = (u: uPlot) => {
        (u as CustomUPlot).streaming = false;
    }
    const overDragHandler = (u: uPlot) => {
        (u as CustomUPlot).streaming = false;
    }
    
    const plugin: CustomPlagin = {
        hooks: {
            init: inithandler,
            dragAxis: axisDragHandler,
            dragOver: overDragHandler
        }
    }

    return plugin as Plugin
}