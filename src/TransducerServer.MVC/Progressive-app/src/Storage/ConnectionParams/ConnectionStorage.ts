import { GetParameterOrDefault, SetParameter } from "../StorageCommon";
import { RS485ConnectioParams, VCOMConnectioParams } from "./ConnectionCommon";

let RS485ParamsKey = "RS485Params";
let VCOMParamsKey = "VCOMParams";

let defaultRS485Params: RS485ConnectioParams = {
    address: 1,
    baudRate: 115200,
    parity: "none",
    stopBits: 1,
};

let defaultVCOMParams: VCOMConnectioParams = {
    baudRate: 115200,
    parity: "none",
    stopBits: 1,
};

export function GetRS485Params(): RS485ConnectioParams {
    return GetParameterOrDefault<RS485ConnectioParams>(RS485ParamsKey, defaultRS485Params);
}

export function SetRS485Params(parameters: RS485ConnectioParams) {
    SetParameter(RS485ParamsKey, parameters);
}

export function GetVCOMParams(): VCOMConnectioParams {
    return GetParameterOrDefault<VCOMConnectioParams>(VCOMParamsKey, defaultVCOMParams);
}

export function SetVCOMParams(parameters: VCOMConnectioParams) {
    SetParameter(VCOMParamsKey, parameters);
}
