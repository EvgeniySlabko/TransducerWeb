import { PlotChannel } from "../Channel/Channel/PlotChannel";
import { ReportListener } from "./ReportListener";
import { Snapshot } from "./Snapshot";
export class RecordManager {
    private listener: ReportListener;

    constructor() {
        this.listener = new ReportListener();
    }

    public SetChannels(channels: PlotChannel[]) {
        this.listener.Reset();
        this.listener.SetChannels(channels);
    }

    public StartListening() {
        this.listener.StartListening();
    }

    public StopListening(): Snapshot {
        this.listener.StopListening();
        var snapshot = this.listener.GetSnapshot();
        return snapshot;
    }

    public GetSnapshot(): Snapshot {
        return this.listener.GetSnapshot();
    }
}