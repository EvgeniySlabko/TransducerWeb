import { EventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannelStyle } from "../ChannelStyle/CellChannelStyle";
import { CreateDefaultCellStyle } from "../ChannelStyle/CellChannelStyleFactory";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";


export class CellChannel
{
    private style: CellChannelStyle;
    private traceId: number | undefined;
    private isAttached: boolean = false;

    private _onData = new EventDispatcher<CellChannel, dataEventArgs>();
    private _onMessage = new EventDispatcher<CellChannel,string>();
    private _onClose = new EventDispatcher<CellChannel, string>();

    constructor(dataSourсe: ISensorDataProvider, style: CellChannelStyle = CreateDefaultCellStyle())
    {
        this.style = style;
        dataSourсe.onData?.sub((sensor, args) => {
            this._onData.dispatch(this, {
                data: args.data,
                time: args.time,
            } as dataEventArgs)
        });

        dataSourсe.onClose?.sub((sensor, args) => {
            this._onClose.dispatch(this, args);
        });

        dataSourсe.onMessage?.sub((sensor, args) => {
            this._onMessage.dispatch(this, args);
        });
    }

    public get Style()
    {
        return this.style;
    }

    public get onData() {return this._onData.asEvent();}

    public get onMessage() {return this._onMessage.asEvent();}

    public get onError() {return this._onClose.asEvent();} //chandge

    public get onClose() {return this._onClose.asEvent();}
}