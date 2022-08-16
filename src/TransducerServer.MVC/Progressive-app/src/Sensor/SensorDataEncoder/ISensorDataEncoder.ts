import { SensorSK } from "../SensorDefinitions";

export declare class ISensorDataCommandEncoder {
    GetHoldingRegistersAnswer(): Promise<number[]>;
    GetInputRegistersAnswer(): Promise<number[]>;
    GetSingleCoilAnswer(): Promise<number[]>;
    GetPresetSingleRegisterAnswer(): Promise<number[]>;
    GetPresetMultipleRegisterAnswer(): Promise<number[]>;
    GetID(): Promise<SensorSK>;
    GetCommand(): Promise<number>;
}
