import { EventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { CellChannelStyle } from "../ChannelStyle/CellChannelStyle";
import { ISensorDataProvider } from "../SensorDataSource/ISensorDataProvider";

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

export class CellChannel {
    private style: CellChannelStyle;

    private _onData = new EventDispatcher<CellChannel, ChannelDataArgs>();
    private _onMessage = new EventDispatcher<CellChannel, ChannelMessageArgs>();
    private _onClose = new EventDispatcher<CellChannel, ChannelCloseArgs>();

    constructor(dataSourсe: ISensorDataProvider, style: CellChannelStyle) {
        this.style = style;
        dataSourсe.onData?.sub((sensor, args) => {
            this._onData.dispatch(this, {
                data: args,
                sensor: sensor,
            })
        });

        dataSourсe.onClose?.sub((sensor, args) => {
            this._onClose.dispatch(this, {
                msg: args,
                sensor: sensor,
            });
        });

        dataSourсe.onMessage?.sub((sensor, args) => {
            this._onMessage.dispatch(this, {
                sensor: sensor,
                sensorMsgArgs: args,
            });
        });
    }

    public get Style() {
        return this.style;
    }

    public get onData() { return this._onData.asEvent(); }

    public get onMessage() { return this._onMessage.asEvent(); }

    public get onClose() { return this._onClose.asEvent(); }
}