import { SensorData } from "../SensorDefinitions";
import { ISensorDataCommandEncoder } from "./ISensorDataEncoder";

export const DecoderClock = 62500;
export declare class ISensorStreamerDataEncoder extends ISensorDataCommandEncoder {
    GetHeader(): Promise<SreamigSensorDataHeader>;
    GetTorque(avgRatio: number, currentTime: number): Promise<SensorData>;
    GetSpeed(currentTime: number): Promise<SensorData>;
    GetTemperature(currentTime: number): Promise<SensorData>;
    GetMessage(): Promise<number[]>;
}

export function CalculateTime(timeL: number, timeH: number): number {
    return (timeL + (timeH << 16)) / DecoderClock;
}

export declare class SreamigSensorDataHeader {
    size: number;
    time: number;
}
