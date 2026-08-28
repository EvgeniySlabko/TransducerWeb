import { EventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensorBase } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensorBase";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SensorDefinitions";
import { CellChannelStyle } from "../ChannelStyle/CellChannelStyle";
import { ISensorDataProvider } from "../SensorDataSource/ISensorDataProvider";
import { v4 as uuid } from 'uuid';

export type ChannelDataArgs = {
    sensor: ISingleComponentSensorBase;
    data: SensorData;
};

export type ChannelMessageArgs = {
    sensor: ISingleComponentSensorBase;
    sensorMsgArgs: SensorMessageEventArgs;
};

export type ChannelCloseArgs = {
    sensor: ISingleComponentSensorBase;
    msg: string;
};

export class CellChannel {
    public readonly id: string = uuid();

    private _onData = new EventDispatcher<CellChannel, ChannelDataArgs>();
    private _onMessage = new EventDispatcher<CellChannel, ChannelMessageArgs>();
    private _onClose = new EventDispatcher<CellChannel, ChannelCloseArgs>();

    constructor(dataSourсe: ISensorDataProvider, id: string) {
        this.id = id;
        dataSourсe.onData?.sub((sensor, args) => {
            this._onData.dispatch(this, {
                data: args,
                sensor: sensor,
            });
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

    public get onData() {
        return this._onData.asEvent();
    }

    public get onMessage() {
        return this._onMessage.asEvent();
    }

    public get onClose() {
        return this._onClose.asEvent();
    }
}
