import { CustomAxis, CustomUPlot } from "../types";
import uPlot, { Plugin } from "../uplot";


const handleAxis = (el: Element, axis: CustomAxis, scale: uPlot.Scale, setRange: (min: number, max: number) => void) : (e: any) => void => {
    const handler = (e: any) => {
        e.preventDefault();
        let dir = e.deltaY > 0 ? 1 : -1;

        let rangeVal = scale.max! - scale.min!;
        let dyTop = axis.rescaleRatio[1] * rangeVal;
        let dyBottom = axis.rescaleRatio[0] * rangeVal;
        let newRange = [scale.min! - dyBottom * dir, scale.max! + dyTop * dir];

        setRange(newRange[0], newRange[1]);
    }

    el.addEventListener("mousewheel", handler);
    return handler;
}

export const YAxesWheelPlugin = () : Plugin =>{
    function handleDrags(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        let axisDivs = u.root.getElementsByClassName("u-axis");
 
        for (let i = 1; i < axisDivs.length; i++) {
            
            let scale = u.scales["y" + (i - 1).toString()];
            let axe = u.axes[i] as CustomAxis;
            handleAxis(axisDivs[i], axe, scale, (min, max) => {
                scale.range = () => [min, max]
                customUPlot.redrawRequired = true;
            });
        }
    }

    return {
        hooks: {
            init: handleDrags
        }
    };
}

export const XAxesWheelPlugin = () : Plugin =>{
    function handleDrags(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        let div = u.root.getElementsByClassName("u-axis")[0];
        let scale = u.scales["x"];
        let axe = u.axes[0] as CustomAxis;
        handleAxis(div, axe, scale, (min, max) => {
            customUPlot.SetRangeSource(min, max);
            customUPlot.redrawRequired = true
        });
        
    }

    return {
        hooks: {
            init: handleDrags
        }
    };
}