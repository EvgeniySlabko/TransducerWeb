
import { ColorsDefs } from "../../Common/Colors";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { ChannelStyle } from "./ChannelStyle";

let count: number = 0;
export function CreateDefaultCellStyle() : CellChannelStyle{
    return {
        id: count++,
        valueName: "undefined",
        unitsName: "V",
        cellStyle: "",
        fontStyle: "",
        sensorType: "Undefined",
    } 
}

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.Unitname,
        cellStyle: "cell-main-style",
        fontStyle: "text-success",
        sensorType: sensorInfo.SensorType,
    }
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Скорость вр.",
        unitsName: "rpm",
        fontStyle: "text-primary",
        cellStyle: "cell-speed-style",
        sensorType: sensorInfo.SensorType,
    } 
}

export function CreatetemperatureCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Температура",
        unitsName: "C",
        fontStyle: "text-warning",
        cellStyle: "cell-tmp-style",
        sensorType: sensorInfo.SensorType,
    }
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        fontStyle: "text-danger",
        cellStyle: "cell-power-style",
        sensorType: sensorInfo.SensorType,
    } 
}