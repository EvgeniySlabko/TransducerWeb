import React from "react";

import { PlotsManager } from "../uPlot/PlotManager";
import { PlotControlPanel } from "./ControlPanel/PlotControlPanel";

export const Plot = (plotsManager: PlotsManager, streamingAvailable: boolean) => {
        return (
                <PlotControlPanel plotsManager={plotsManager} reportVieving={streamingAvailable} /> 
        )
}
