import { InputComplex } from "../../SensorDefinitions";
import { ISingleComponentSensor } from "../ISingleComponentSensor";

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
    sensor: ISingleComponentSensor;
}

export declare class DataParams {
    data: InputComplex;
    time: number;
}
