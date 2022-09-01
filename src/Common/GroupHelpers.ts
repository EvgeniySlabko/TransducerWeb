import { Group } from "../Components/App";
import { PlotsManager } from "../uPlot/PlotManager";

export function SetupGroup(groups: Group[], plotsManager: PlotsManager) {
    let managerParameters = plotsManager.ManagerParameters;
    let plotDt = 1 / managerParameters.pointsPerSecond;
    groups.forEach((group) => {
        group.channelsInfo.setGridAlignmentInterval(plotDt);
    });
}
