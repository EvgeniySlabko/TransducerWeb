import uPlot, { Plugin } from "../uplot";
import { CustomArray, CustomUPlot } from "../types";

export const OverDragPlugin = () : Plugin =>{
    function readyHandler(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        const over = u.over;
        const xScale = customUPlot.rangeSouce;
        const customHooks = u.hooks as CustomArray;

        over.addEventListener("contextmenu", (e: Event) => {
            e.preventDefault();
        });
        
        over.addEventListener("mousedown", (e: any) => {
            if (e.button === 2) {
                e.preventDefault();

                if (customHooks.dragOver) 
                    customHooks.dragOver.forEach(e => e!(u))

                let left0 = e.clientX;

                let scXMin0 = xScale[0];
                let scXMax1 = xScale[1];

                let xUnitsPerPx = u.posToVal(1, "x") - u.posToVal(0, "x");

                let onmove = (e: any) => {
                    e.preventDefault();

                    let left1 = e.clientX;
                    let dx = xUnitsPerPx * (left1 - left0);

                    customUPlot.SetRangeSource(scXMin0 - dx, scXMax1 - dx);
                    customUPlot.redrawRequired = true;
                };

                function onup(e: any) {
                    document.removeEventListener("mousemove", onmove);
                    document.removeEventListener("mouseup", onup);
                }

                document.addEventListener("mousemove", onmove);
                document.addEventListener("mouseup", onup);
            }
        });
    }

    return {
        hooks: {
            ready: readyHandler
        }
    };
}