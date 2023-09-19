import uPlot, { Plugin } from "../uplot";
import { CustomUPlot } from "../types";

export const AxisHoverAnimationPlugin = () : Plugin =>{
    
    let initFont: string | undefined;
    function handleYAxisHover(event: any, i: number, u: CustomUPlot) {
        // When the mouse enters the yAxis, add a class to make the font bold
        let a = u.axes[i];
        initFont = a.font;
        a.font = '20px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
        
    }

    function handleYAxisHoverExit(event: any, i: number, u: CustomUPlot) {
        // When the mouse leaves the yAxis, remove the class to revert to normal font weight
        let a = u.axes[i];
        a.font = initFont;
  
    }

    const readyHandler = (u: uPlot) => {
        const customUPlot = u as CustomUPlot;
        const self = u as CustomUPlot;

        const yAxis = self.root.getElementsByClassName('u-axis');
        
        for (let i = 1; i < yAxis.length; i++) {
        
            // Listen for mouseover and mouseout events on the yAxis element
            yAxis[i].addEventListener('mouseenter', (event) => handleYAxisHover(event, i, customUPlot));
            yAxis[i].addEventListener('mouseout', (event) => handleYAxisHoverExit(event, i, customUPlot));
        }
    }

    const destroyHandler = (u: uPlot) => {
        const customUPlot = u as CustomUPlot;
        const self = u as CustomUPlot;

        const yAxis = self.root.getElementsByClassName('u-axis');
        
        for (let i = 1; i < yAxis.length; i++) {
        
            yAxis[i].removeEventListener('mouseenter', (event) => handleYAxisHover(event, i, customUPlot));
            yAxis[i].removeEventListener('mouseout', (event) => handleYAxisHoverExit(event, i, customUPlot));
        }
    }

    return {
        hooks: {
            ready : readyHandler,
            destroy: destroyHandler
        }
    };
}