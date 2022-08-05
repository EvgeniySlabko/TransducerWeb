import { ValueType } from './ChanneStyleCommon';


export declare interface PlotChannelStyle {
    sensorId: number;
    color: string;
    grid: boolean;
    unitName: string;
    valueType: ValueType;
    yTitle: string;
    axisColor: string;
    legendTitle: string;
    legendValueAccurency: number,
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

