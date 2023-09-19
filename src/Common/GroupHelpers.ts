
import { PipelineController } from "../Channel/AllChannelsFactory";

export function SetupGroup(pipelines: PipelineController[], pointsPerSecond: number) {
    let plotDt = 1 / pointsPerSecond;
    pipelines.forEach((pipelines) => {
        pipelines.setGridAlignmentInterval(plotDt);
    });
}
