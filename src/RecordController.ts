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

    public SetChannels(channels: Channel[])
    {
        this.listener.Reset();
        this.listener.SetChannels(channels);
    }

    public StartListening()
    {
        this.listener.StartListening();
    }

    public StopListening() : Snapshot
    {
        this.listener.StopListening();
        var snapshot = this.listener.GetSnapshot();
        this.listener.Reset();
        return snapshot;
    }

    public GetSnapshot() : Snapshot
    {
        return this.listener.GetSnapshot();
    }
}