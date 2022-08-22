import { GetPointsPerSecond } from "../Storage/AppStorage";
import { PlotsManager } from "../uPlot/PlotManager";
import { MaxFrameSize } from "../uPlot/StreamingPlot/StreamingBufferManager";

export function SetupPlotManager(manager: PlotsManager) {
    let pointsPerSecond = GetPointsPerSecond();
    let maxScreenSize = MaxFrameSize / pointsPerSecond / 2;
    manager.SetParameters({
        maxStreamingPlotScreenSize: maxScreenSize,
        pointsPerSecond: pointsPerSecond,
    });

    //manager.RebuildIfNessesary();
}
