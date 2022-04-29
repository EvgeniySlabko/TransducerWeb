import { ISensorDataProvider } from "../Channel/SensorDataProveder/ISensorDataProvider";
import { dataEventArgs } from "../Sensor/SensorDefinitions";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { Channel, ChannelDataArgs } from "../Channel/Channel/Channel";
import { Snapshot, TrackData } from "./Snapshot";

export class ReportListener
{
    private channelMap : Map<Channel, Array<dataEventArgs>> = new Map();
    private isListening: boolean = false;
    private isInit: boolean = false;

    constructor()
    {
        
    }

    public SetChannels(channels: Channel[])
    {
        if (channels.length == 0)
            throw "There are no channels for listening";

        channels.forEach(channel => {
            this.channelMap.set(channel, new Array());
            channel.onData.sub(this.DataHandler);
        })

        this.isInit = true;
    }

    public StartListening()
    {
        if(!this.isInit) throw "There are no channels for listening";
        if(this.isListening) throw "Already listen";

        this.isListening = true;
    }

    public StopListening()
    {
        if(!this.isInit) throw "There are no channels for listening";

        this.isListening = false;
    }

    public Clean()
    {
        this.channelMap.forEach((a, v) => {
            a = new Array<dataEventArgs>();
        });
    }

    public Reset()
    {
        if(this.isListening) throw "Recording in progress";
        this.channelMap.forEach((a, v) => {
            v.onData.unsub(this.DataHandler);
        });

        this.channelMap = new Map();
        this.isInit = false;

    }
    
    public GetSnapshot() : Snapshot
    {
        if(!this.isInit) throw "There are no channels for listening";
        if(this.isListening) throw "Stop listening for getting snapshot";

        var trackData = new Array<TrackData>();

        this.channelMap.forEach((k, v) => {
            trackData.push({
                data: k,
                style: v.Style,
            } as TrackData);
        });
        
        return new Snapshot(trackData);
    }

    private DataHandler = (channel: Channel, args: ChannelDataArgs) =>
    {
        if (this.isListening)
        {
            if (!this.channelMap.has(channel))
                throw "Не удалось найти ключ";
            this.channelMap.get(channel)?.push(args.data);
        }
    }
}