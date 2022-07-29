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
    range: number[];
    line: "dash" | "solid";
    yAxeSide: "right" | "left";
    rescaleRationTop: number;
    rescaleRationBottom: number;
    visible: boolean;
    width: number;
    legendValueAcurency: number;
    drawLimits?: boolean;
    mnogitel: number;
    minValue?: number;
    maxValue?: number;
}

