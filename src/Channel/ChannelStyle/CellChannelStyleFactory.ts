
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
        fontSize: 15,
        fontStyle: "",
        sensorType: "Undefined",
        accurency: 2,
    } 
}

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.Unitname,
        cellStyle: "cell-main-style",
        fontSize: 15,
        fontStyle: "text-success",
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
    }
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Скорость вр.",
        unitsName: "rpm",
        fontStyle: "text-primary",
        fontSize: 15,
        cellStyle: "cell-speed-style",
        sensorType: sensorInfo.SensorType,
        accurency: 0,
    } 
}

export function CreatetemperatureCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Температура",
        unitsName: "C",
        fontStyle: "text-warning",
        fontSize: 15,
        cellStyle: "cell-tmp-style",
        sensorType: sensorInfo.SensorType,
        accurency: 1,
    }
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        fontStyle: "text-danger",
        fontSize: 15,
        cellStyle: "cell-power-style",
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
    } 
}