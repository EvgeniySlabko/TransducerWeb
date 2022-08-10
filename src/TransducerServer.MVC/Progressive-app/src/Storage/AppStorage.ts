import { DecoderType } from "../Sensor/SensorFactory";
import { GetParameterOrDefault, SetParameter } from "./StorageCommon";

const PointsPerSecondKey = "PointsPerSecondKey";
const ConnectedDecoderTypeKey = "ConnectedDecoderType";

export function GetPointsPerSecond() : number {
   return GetParameterOrDefault<number>(PointsPerSecondKey, 50, val => val >=50 && val <= 5000);
}

export function SetPointsPerSecond(value: number) {
    SetParameter(PointsPerSecondKey, value);
}

// ConnectedDecoderType
export function GetConnectedDecoderType() : DecoderType {
    return GetParameterOrDefault<DecoderType>(ConnectedDecoderTypeKey, "VCOM");
 }
 
 export function SetConnectedDecoderType(value: DecoderType) {
     SetParameter(ConnectedDecoderTypeKey, value);
 }