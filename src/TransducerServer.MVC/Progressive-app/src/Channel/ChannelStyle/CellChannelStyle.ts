import { ValueType } from "./StyleCommon";

export declare class CellChannelStyle{
    // id fo react
    id: number;
    //unique datasource id
    sensorId: number;
    visible: boolean;
    cellStyle: string;
    fontStyle: string;
    fontSize: number;
    valueName: string;
    unitsName: string;   
    sensorType: string;
    accurency: number;
    valueType: ValueType;
    maxValue?: number;
    minValue?: number;
    limits?: boolean;
}