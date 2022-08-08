import { ChannelDataType } from "./ChanneStyleCommon";

export declare interface CellChannelStyle {
    id: number; // id fo react
    sensorId: number;
    visible: boolean;
    color: string;
    fontSize: number;
    valueName: string;
    unitsName: string;
    sensorType: string;
    accurency: number;
    valueType: ChannelDataType;
    maxValue?: number;
    minValue?: number;
    limits?: boolean;
}