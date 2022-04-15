import { ChannelStyle } from "../ChannelStyle/ChannelStyle";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";
import { CreateDefaultStyle } from "../ChannelStyle/ChannelStyleFactory";
//import { CreateDefaultStyle } from "./ChannelStyleFactory";

// Содержит информацию для отображения на графике. подает данные на график
export class Channel
{
    private dataSourse: ISensorDataProvider;
    private style: ChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;
    // Фабричный метод создание каналов из Sensor

    public constructor (dataSourse: ISensorDataProvider, style: ChannelStyle = CreateDefaultStyle())
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