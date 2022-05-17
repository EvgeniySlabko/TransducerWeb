
import { ColorsDefs } from "../../Common/Colors";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultCellStyle() : CellChannelStyle{
    return {
        valueName: "undefined",
        unitsName: "V",
        cellStyle: "",
        fontStyle: ""
    } 
}

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.Unitname,
        cellStyle: "cell-main-style",
        fontStyle: "cell-main-font"


    } as CellChannelStyle
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        valueName: "Скорость вр.",
        unitsName: "rpm",
        fontStyle: "cell-speed-font",
        cellStyle: "cell-speed-style",
    } 
}

export function CreatetemperatureCellStyle() : CellChannelStyle{
    return {
        valueName: "Температура",
        unitsName: "C",
        fontStyle: "cell-tmp-font",
        cellStyle: "cell-tmp-style",
    } as CellChannelStyle
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        fontStyle: "cell-power-font",
        cellStyle: "cell-power-style",
    } as CellChannelStyle
}