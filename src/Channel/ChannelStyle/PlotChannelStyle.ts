import { ChannelDataType } from "./ChanneStyleCommon";

export declare interface PlotChannelStyle {
    id: string;
    sensorId: number;
    color: string;
    grid: boolean;
    unitName: string;
    valueType: ChannelDataType;
    yTitle: string;
    axisColor: string;
    legendTitle: string;
    legendValueAccuracy: number;
    range: number[];
    line: "dash" | "solid";
    yAxeSide: "right" | "left";
    rescaleRationTop: number;
    rescaleRationBottom: number;
    visible: boolean;
    width: number;
    drawLimits?: boolean;
    valueRatio: number;
    mnogitel: number;
    minValue?: number;
    maxValue?: number;
}
