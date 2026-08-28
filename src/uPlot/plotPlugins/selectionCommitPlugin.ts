import uPlot, { Plugin } from "../uplot";
import { CustomUPlot } from "../types";

export const SelectionCommitPlugin = () : Plugin =>{
    function selectionCommitedHandler(u: uPlot) {
        const customPlot = u as CustomUPlot;
        customPlot.select.left
        if (u.select.width === 0) return;
        let min = customPlot.posToVal(u.select.left, "x");
        let max = customPlot.posToVal(u.select.left + u.select.width, "x");
        customPlot.SetRangeSource(min, max);
    }

    return {
        hooks: {
            setSelect: selectionCommitedHandler
        }
    };
}