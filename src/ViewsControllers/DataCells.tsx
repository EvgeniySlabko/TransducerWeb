import { CellChannel } from "../Channel/Channel/CellChannel";
import { CellChannelsInfo } from "../Channel/SensorDataProveder/ISensorDataProvider";


export class DataCells
{
    private sensorChannelnfo: CellChannelsInfo[] = [];

    public AddChannelInfo(info: CellChannelsInfo)
    {
        this.sensorChannelnfo.push(info);
    }

    public GetAllChannels = () : CellChannel[] =>
    {
        let allChannels = new Array<CellChannel>();

        this.sensorChannelnfo.forEach(info => {
            info.cellChannels.forEach(channel => {
                allChannels.push(channel);
            });
        });

        return allChannels;
    }

    public GetChannelsInfos = () => this.sensorChannelnfo;
}
