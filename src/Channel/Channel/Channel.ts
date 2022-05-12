import { ChannelStyle } from "../ChannelStyle/ChannelStyle";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";
import { CreateDefaultStyle } from "../ChannelStyle/ChannelStyleFactory";
import { EventDispatcher, IEvent } from "strongly-typed-events";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { type } from "jquery";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
//import { CreateDefaultStyle } from "./ChannelStyleFactory";

export type ChannelDataArgs =
{
    sensor: ISingleComponentSensor;
    data: dataEventArgs;
}

export type ChannelMessageArgs =
{
    sensor: ISingleComponentSensor;
    sensorMsgArgs: SensorMessageEventArgs;
}

export type ChannelCloseArgs =
{
    sensor: ISingleComponentSensor;
    msg: string;
}

// Содержит информацию для отображения на графике. подает данные на график
export class Channel
{
    private dataSourse: ISensorDataProvider;
    private style: ChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;
    // Фабричный метод создание каналов из Sensor

    private _onData = new EventDispatcher<Channel, ChannelDataArgs>();
    private _onMessage = new EventDispatcher<Channel, ChannelMessageArgs>();
    private _onClose = new EventDispatcher<Channel, ChannelCloseArgs>();

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
                sensor: sensor,
                msg: args,
            } as ChannelCloseArgs)
        });

        dataSource.onMessage?.sub((sensor, args) => {
            this._onMessage.dispatch(this, {
                sensorMsgArgs: args,
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

    public get onClose() {return this._onClose.asEvent();}
}