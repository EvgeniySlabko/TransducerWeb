import { InputComplex } from "../../SensorDefinitions";
import { ISingleComponentSensorBase } from "../ISingleComponentSensorBase";

export declare class ExchangerArgs {
    Message: ExchangerMessage;
    args: any;
}

export enum ExchangerMessage {
    Start,
    Stop,
    Error,
    Data,
}

export declare class StartReadingParams {
    intervalReading: number;
    timeBase: number;
    sensor: ISingleComponentSensorBase;
}

export declare class DataParams {
    data: InputComplex;
    time: number;
}
