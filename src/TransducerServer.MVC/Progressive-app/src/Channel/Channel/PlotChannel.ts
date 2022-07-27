import { ChannelStyle } from "../ChannelStyle/ChannelStyle";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";
import { EventDispatcher } from "strongly-typed-events";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
//import { CreateDefaultStyle } from "./ChannelStyleFactory";

export type ChannelDataArgs =
    {
        sensor: ISingleComponentSensor;
        data: SensorData;
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
export class PlotChannel {
    private style: ChannelStyle;
    
    // Фабричный метод создание каналов из Sensor
    private _onData = new EventDispatcher<PlotChannel, ChannelDataArgs>();
    private _onMessage = new EventDispatcher<PlotChannel, ChannelMessageArgs>();
    private _onClose = new EventDispatcher<PlotChannel, ChannelCloseArgs>();

    public constructor(dataSource: ISensorDataProvider, style: ChannelStyle) {
        this.style = style;
        dataSource.onData?.sub((sensor, args) => {
            this._onData.dispatch(this, {
                data: args,
                sensor: sensor,
            })
        });

        dataSource.onClose?.sub((sensor, args) => {
            this._onClose.dispatch(this, {
                sensor: sensor,
                msg: args,
            })
        });

        dataSource.onMessage?.sub((sensor, args) => {
            this._onMessage.dispatch(this, {
                sensorMsgArgs: args,
                sensor: sensor,
            })
        });
    }

    public get Style() {
        return this.style;
    }

    public get onData() { return this._onData.asEvent(); }

    public get onMessage() { return this._onMessage.asEvent(); }

    public get onClose() { return this._onClose.asEvent(); }
}