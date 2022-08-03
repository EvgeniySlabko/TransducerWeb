import { GetParameterOrDefault, SetParameter } from "./StorageCommon";

const PointsPerSecondKey = "PointsPerSecondKey";
export function GetPointsPerSecond() : number {
   return GetParameterOrDefault<number>(PointsPerSecondKey, 50, val => val >=50 && val <= 5000);
}

export function SetPointsPerSecond(value: number) {
    SetParameter(PointsPerSecondKey, value);
}