import uPlot, { Plugin } from "../uplot";
import { CustomArray, CustomPlagin, CustomScale, CustomUPlot } from "../types";

export const YAxesDragPlugin = () : Plugin => {
    function handleDrags(u: uPlot) {
        let axisDivs = u.root.getElementsByClassName("u-axis");
        const customPlot = u as CustomUPlot;
        const customHooks = u.hooks as CustomArray;
        for (let i = 1; i < axisDivs.length; i++) {
            let dragStart = false;
            let yCoord = 0;
            let xCoord = 0;
            let initRange: [number?, number?];
            let initRangeValue: number;
            let axe = u.axes[i];
            let scale = u.scales[axe.scale!] as CustomScale;

            axisDivs[i].addEventListener("mousedown", (e: any) => {
                dragStart = true;
                u.axes;

                if (customHooks.dragAxis) 
                    customHooks.dragAxis.forEach(e => e!(u))

                yCoord = e.clientY;
                xCoord = e.clientX;
                
                initRange = [scale.min, scale.max];
                initRangeValue = scale.max! - scale.min!;

            });

            axisDivs[i].addEventListener("mouseup", (e: Event) => {
                dragStart = false;
            });
            axisDivs[i].addEventListener("mouseleave", (e: Event) => {
                dragStart = false;
            });
           
            axisDivs[i].addEventListener("mousemove", (e: any) => {
                if (dragStart) {
                    let curY = e.clientY;
                    let divHeigh = axisDivs[i].clientHeight;
                    let cursorDy = curY - yCoord;
                    let l = cursorDy / divHeigh;
                    let dY = initRangeValue * l;
                    let curMin = initRange[0]! + dY;
                    let curMax = initRange[1]! + dY;
                    scale.range = () => [curMin, curMax];
                    customPlot.redrawRequired = true;
                }
            });
        }
    }

    return {
        hooks: {
            init: handleDrags
        }
    }
};

export const XAxesDragPlugin = () : Plugin => {
    function handleDrags(u: uPlot) {
    let div = u.root.getElementsByClassName("u-axis")[0];
        const customPlot = u as CustomUPlot
        let dragStart = false;
        let yCoord = 0;
        let xCoord = 0;
        let initRange: [number?, number?];
        let initRangeValue: number;
        let axe = u.axes[0];
        let scale = u.scales[axe.scale!] as CustomScale;

        div.addEventListener("mousedown", (e: any) => {
            dragStart = true;
            yCoord = e.clientY;
            xCoord = e.clientX;
            
            initRange = [scale.min, scale.max];
            initRangeValue = scale.max! - scale.min!;

        });

        div.addEventListener("mouseup", (e: Event) => {
            dragStart = false;
        });
        div.addEventListener("mouseleave", (e: Event) => {
            dragStart = false;
        });
        
        div.addEventListener("mousemove", (e: any) => {
            if (dragStart) {
                let curX = e.clientX;
                let divLength = div.clientWidth;
                let cursorDx = curX - xCoord;
                let l = cursorDx / divLength;
                let dX = initRangeValue * l;
                let curMin = initRange[0]! - dX;
                let curMax = initRange[1]! - dX;
                scale.range = () => [curMin, curMax];
                customPlot.redrawRequired = true;
            }
        });
    }
    

    return {
        hooks: {
            init: handleDrags
        }
    };
};