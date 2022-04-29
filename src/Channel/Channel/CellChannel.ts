import { CellChannelStyle } from "../ChannelStyle/CellChannelStyle";
import { CreateDefaultCellStyle } from "../ChannelStyle/CellChannelStyleFactory";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";

export class CellChannel
{
    private dataSourse: ISensorDataProvider;
    private style: CellChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;

    constructor(dataSourse: ISensorDataProvider, style: CellChannelStyle = CreateDefaultCellStyle())
    {
        this.style = style;
        this.dataSourse = dataSourse;
    }

    public get Style()
    {
        return this.style;
    }

    public get onData() {return this.dataSourse.onData.asEvent();}

    public get onMessage() {return this.dataSourse.onMessage.asEvent();}

    public get onError() {return this.dataSourse.onClose.asEvent();}
}