import { ChannelStyle } from "../ChannelStyle/ChannelStyle";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";
import { CreateDefaultStyle } from "../ChannelStyle/ChannelStyleFactory";
import { EventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { type } from "jquery";
import Sensor from "../../Sensor/sensor";
//import { CreateDefaultStyle } from "./ChannelStyleFactory";

// Содержит информацию для отображения на графике. подает данные на график
export type ChannelDataArgs =
{
    data: dataEventArgs;
    sensor: Sensor;
}

export type ChannelMessageArgs =
{
    message: string;
    sensor: Sensor;
}

export class Channel
{
    private dataSourse: ISensorDataProvider;
    private style: ChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;
    // Фабричный метод создание каналов из Sensor

    private _onData = new EventDispatcher<Channel, ChannelDataArgs>();
    private _onMessage = new EventDispatcher<Channel, ChannelMessageArgs>();
    private _onClose = new EventDispatcher<Channel, ChannelMessageArgs>();

    public constructor (dataSource: ISensorDataProvider, style: ChannelStyle = CreateDefaultStyle())
    {
        this.style = style;
        this.dataSourse = dataSource;
        dataSource.onData?.sub((sensor, args) => {
            this._onData.dispatch(this, {
                data: args,
                sensor: sensor,
            } as ChannelDataArgs)
        });

        dataSource.onClose?.sub((sensor, args) => {
            this._onClose.dispatch(this, {
                message: args,
                sensor: sensor,
            } as ChannelMessageArgs)
        });

        dataSource.onMessage?.sub((sensor, args) => {
            this._onMessage.dispatch(this, {
                message: args,
                sensor: sensor,
            } as ChannelMessageArgs)
        });
    }

    public get Style()
    {
        return this.style;
    }

    public get onData() {return this._onData.asEvent();}

    public get onMessage() {return this._onMessage.asEvent();}

    public get onError() {return this._onClose.asEvent();}
}