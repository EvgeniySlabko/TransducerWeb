import { Channel } from "../Channel/Channel";
import { Plot } from "./plot";

//обслуживает график
export class PlotConntroller
{
    private plot: Plot;
    
    public constructor(plot: Plot)
    {
        if (plot == null) throw "plot is null";
        this.plot = plot;
    }   

    public AddChannel(channel: Channel) : void
    {
        if (channel == null) throw "channel null";
        
    }

    public RemoveChannel(channel: Channel)
    {

    }
}