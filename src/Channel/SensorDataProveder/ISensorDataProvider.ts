import { EventDispatcher, IEvent, ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { dataEventArgs, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "../Channel/CellChannel";
import { Channel } from "../Channel/Channel";

export interface ISensorDataProvider
{
    get onData() : IEvent<ISingleComponentSensor, dataEventArgs>;

    get onClose() : IEvent<ISingleComponentSensor, string>;

    get onMessage() : IEvent<ISingleComponentSensor, SensorMessageEventArgs>;
}

export enum DataSourseType{
    MainValue,
    Temperature,
    Speed,
}

export declare interface PlotCellChannelsInfo
{
    plotChannels: Channel[],
    offsetSetter: (offset: number) => void,
    avgSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}

export declare interface SavingPlotChannelsInfo
{
    plotChannels: Channel[],
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}

export declare interface CellChannelsInfo
{
    cellChannels: CellChannel[],
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}