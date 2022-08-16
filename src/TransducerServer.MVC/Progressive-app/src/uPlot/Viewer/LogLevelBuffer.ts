import { AlignedData } from "uplot";
import { Snapshot, TrackData } from "../../ReportListener/Snapshot";
import { MaxFrameSize, PlotBufferManager } from "../StreamingPlot/StreamingBufferManager";

export class LogLevelBugger {
    private rangeGetter: () => [number, number];

    private readonly levels = [0.0002, 0.0004, 0.0008, 0.0016, 0.0032, 0.0062, 0.02]; //dt
    private buffers: PlotBufferManager[] = [];
    private currentDt: number = 0.02;
    constructor(rangeGetter: () => [number, number]) {
        this.rangeGetter = rangeGetter;
    }

    public get Dt(): number {
        return this.currentDt;
    }

    public get Source(): AlignedData {
        let range = this.rangeGetter();
        let rangeValue = (range[1] - range[0]) * 4;
        let maxPointsPerSecond = MaxFrameSize / rangeValue;
        let currentDt = 1 / maxPointsPerSecond;
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] >= currentDt) {
                //console.log(i);
                this.currentDt = this.buffers[i].Dt;
                return this.buffers[i].Source;
            }
        }

        this.currentDt = this.buffers[this.buffers.length - 1].Dt;
        return this.buffers[this.buffers.length - 1].Source;
    }

    public FromSnapshot(snapshot: Snapshot) {
        var trackData = snapshot.GetTrackData();

        let sourceBuffer = this.CreateBufferManager(snapshot.dt, trackData);

        this.buffers = new Array<PlotBufferManager>(this.levels.length);
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] <= snapshot.dt) this.buffers[i] = sourceBuffer;
            else {
                this.buffers[i] = this.CreateBufferManager(this.levels[i], trackData);
            }
        }
    }

    private CreateBufferManager(dt: number, trackData: TrackData[]): PlotBufferManager {
        let bufferManager = new PlotBufferManager(this.rangeGetter, {
            segments: trackData.length,
            dt: dt,
        });

        for (let i = 0; i < trackData.length; i++) {
            bufferManager.SetRange(i, trackData[i].data);
        }

        return bufferManager;
    }
}
