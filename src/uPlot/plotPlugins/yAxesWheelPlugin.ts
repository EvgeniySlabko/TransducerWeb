import uPlot, { Plugin } from "../uplot";
import { CustomAxis, CustomUPlot } from "../types";

export const YAxesWheelPlugin = () : Plugin =>{
    function handleDrags(u: uPlot) {
        const customPlot = u as CustomUPlot;
        let axisDivs = u.root.getElementsByClassName("u-axis");
 
        for (let i = 1; i < axisDivs.length; i++) {
            
            let scale = u.scales["y" + (i - 1).toString()];
            let axe = u.axes[i] as CustomAxis;

            axisDivs[i].addEventListener("mousewheel", (e: any) => {
                e.preventDefault();
                let dir = e.deltaY > 0 ? 1 : -1;
    
                let rangeVal = scale.max! - scale.min!;
                let dyTop = axe.rescaleRatio[1] * rangeVal;
                let dyBottom = axe.rescaleRatio[0] * rangeVal;
                let newRange = [scale.min! - dyBottom * dir, scale.max! + dyTop * dir];
    
                scale.range = () => [newRange[0], newRange[1]]
                customPlot.redrawRequired = true;
            });
        }
    }

    return {
        hooks: {
            init: handleDrags
        }
    };
}