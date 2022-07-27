import { IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "../Channel/CellChannel";
import { PlotChannel } from "../Channel/PlotChannel";
import { PeakEventArgs } from "./PeakAnalyzer";

export interface ISensorDataProvider {
    get onData(): IEvent<ISingleComponentSensor, SensorData>;

    get onClose(): IEvent<ISingleComponentSensor, string>;

    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs>;
}

export enum DataSourseType {
    MainValue,
    Temperature,
    Speed,
}

export declare interface PlotCellChannelsInfo {
    plotChannels: PlotChannel[],
    offsetSetter: (offset: number) => void,
    avgSetter: (offset: number) => void,
    currentValueOffsetSetter: () => number,
    peakDetected: IEvent<PlotChannel, PeakEventArgs>
}

export declare interface SavingPlotChannelsInfo {
    plotChannels: PlotChannel[],
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => number,
}

export declare interface CellChannelsInfo {
    cellChannels: CellChannel[],
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => number,
}