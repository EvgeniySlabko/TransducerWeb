import { Channel } from "../Channel/Channel/Channel";
import { PeakEventArgs } from "../Channel/SensorDataProveder/PeakAnalyzer";
import { PeackMode } from "../Components/CellsGroup";
import { ChannelLabel, ViewController } from "./PlotViewController";

export class PlotPeackController
{
    private plotViewController: ViewController;
    private mode: PeackMode = "none";
    private currMaxPeack: number = 0;
    constructor(plotViewController: ViewController)
    {
        this.plotViewController = plotViewController;
    }

    public SetMode(mode: PeackMode)
    {
        this.mode = mode;
    }

    public AddPeack(channel: Channel, args: PeakEventArgs)
    {
        if (this.mode == "none") return;
        if (this.mode == "relative") 
        {
            let label : ChannelLabel = 
            {
                channel: channel,
                time: args.time,
                text: "!!!",
                value: args.peakValue,
            }
            this.plotViewController.AddLabelForChannel(label);
        }

        if (this.mode == "absolute") 
        {
            if (args.peakValue > this.currMaxPeack)
            {
                this.plotViewController.ClearLabels();
                this.currMaxPeack = args.peakValue;
                let label : ChannelLabel = 
                {
                    channel: channel,
                    time: args.time,
                    text: "!!!",
                    value: args.peakValue,
                }

                this.plotViewController.AddLabelForChannel(label);
            }
        }
    }

    public Reset()
    {
        this.currMaxPeack = 0;
        this.plotViewController.ClearLabels();
    }
}