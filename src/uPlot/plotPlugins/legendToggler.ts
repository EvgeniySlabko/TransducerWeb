import uPlot, { Plugin } from "../uplot";
import { CustomUPlot } from "../types";

export const legendToggler = () : Plugin =>{
    let element: Element;

    function intHandler(u: uPlot) {
        element = u.root.getElementsByClassName("u-legend")[0]!;
    }

    function drawClearHandler(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        if(customUPlot.isLegendEnabled)
        {
            element.classList.remove('hide');
        }
        else
        {
            if(!element.classList.contains('hide'))
                element.classList.add('hide');
        }
    }

    return {
        hooks: {
            init: intHandler,
            drawClear: drawClearHandler
        }
    };
}