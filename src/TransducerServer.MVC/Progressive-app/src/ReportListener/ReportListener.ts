import { ChannelCloseArgs } from "../Channel/Channel/CellChannel";
import { PlotChannelDataArgs, PlotChannel } from "../Channel/Channel/PlotChannel";
import { SensorData } from "../Sensor/SensorDefinitions";
import { Snapshot, TrackData } from "./Snapshot";

export class ReportListener {
    private channelMap: Map<PlotChannel, Array<SensorData>> = new Map();
    private isListening: boolean = false;
    private isInit: boolean = false;

    public get ThereIsData(){
        let thereIsData = false;
        this.channelMap.forEach((a, v) => {
            if(a.length > 0) thereIsData = true;
        });

        return thereIsData;
    }

    public SetChannels(channels: PlotChannel[]) {
        if (channels.length == 0) throw "There are no channels for listening";

        channels.forEach(channel => {
            this.channelMap.set(channel, new Array<SensorData>());
            channel.onData.sub(this.DataHandler);
            channel.onClose.sub(this.CloseHandler);
        })

        this.isInit = true;
    }

    public StartListening() {
        if (!this.isInit) throw "There are no channels for listening";

        this.isListening = true;
    }

    public StopListening() {
        this.isListening = false;
    }

    public Clean() {
        this.channelMap.forEach((a, v) => {
            a = new Array<SensorData>();
        });
    }

    public Reset() {
        this.channelMap.forEach((a, v) => {
            v.onData.unsub(this.DataHandler);
        });

        this.channelMap = new Map();
        this.isInit = false;
    }

    public GetSnapshot(): Snapshot {
        if (!this.isInit) throw "There are no channels for listening";
        if (this.isListening) throw "Stop listening for getting snapshot";

        var trackData = new Array<TrackData>();

        this.channelMap.forEach((sensorData, plotChannel) => {
            var dataArr: SensorData =
            {
                data: [],
                time: []
            }

            sensorData.forEach(data => {
                data.data.forEach(d => dataArr.data.push(d))
                data.time.forEach(t => dataArr.time.push(t))
            });

            trackData.push({
                data: dataArr,
                style: plotChannel.Style,
            });
        });
        
        return new Snapshot({
            trackData: trackData,
        });
    }

    private DataHandler = (channel: PlotChannel, args: PlotChannelDataArgs) => {
        if (this.isListening) {
            if (this.channelMap.has(channel)) {
                let dataBuffer = this.channelMap.get(channel);
                var copy = {
                    data: args.data.data.slice(),
                    time: args.data.time.slice(),
                } as SensorData
                dataBuffer?.push(copy);
            }
        }
    }

    private CloseHandler = (channel: PlotChannel, args: ChannelCloseArgs) => {
        if (this.channelMap.has(channel)) {
            channel.onData.unsub(this.DataHandler);
            channel.onClose.unsub(this.CloseHandler);
        }
    }
}