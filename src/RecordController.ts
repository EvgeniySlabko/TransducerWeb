import { Channel } from "./Channel/Channel/Channel";
import { ReportListener } from "./ReportListener/ReportListener";
import { Snapshot } from "./ReportListener/Snapshot";
export class RecordController
{
    private listener: ReportListener;

    constructor()
    {
        this.listener = new ReportListener();
    }

    public StartListening(channels: Channel[])
    {
        this.listener.Reset();
        this.listener.SetChannels(channels);
        this.listener.StartListening();
    }

    public StopListening() : Snapshot
    {
        this.listener.StopListening();
        var snapshot = this.listener.GetSnapshot();
        return snapshot;
    }

    public GetSnapshot() : Snapshot
    {
        return this.listener.GetSnapshot();
    }
}