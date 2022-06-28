
import { ColorsDefs } from "../../Common/Colors";
import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { ChannelStyle } from "./ChannelStyle";
import { GetColorBySeed } from "./ColorFactory";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./StyleCommon";

let count: number = 0;
export function CreateDefaultCellStyle() : CellChannelStyle{
    return {
        id: count++,
        sensorId: Math.random(),
        valueName: "undefined",
        unitsName: "V",
        cellStyle: "",
        fontSize: 15,
        fontStyle: "",
        sensorType: "Undefined",
        accurency: 2,
        valueType: "torque",
        visible: true,
    } 
}

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.UnitValueName,
        cellStyle:"cell-torque-style",
        fontSize: 15,
        fontStyle: torqueBaseColor,
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
        valueType: "torque",
        maxValue: sensorInfo.MaxValue,
        minValue: sensorInfo.MinValue,
        limits: true,
        visible: true,
    }
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Скорость вр.",
        unitsName: "rpm",
        fontStyle: speedBaseColor,
        fontSize: 15,
        cellStyle: "cell-speed-style",
        sensorType: sensorInfo.SensorType,
        accurency: 0,
        valueType: "speed",
        maxValue: sensorInfo.MaxSpeed,
        limits: false,
        visible: true,
    } 
}

export function CreatetemperatureCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Температура",
        unitsName: "C",
        fontStyle: tmpBaseColor,
        fontSize: 15,
        cellStyle: "cell-tmp-style",
        sensorType: sensorInfo.SensorType,
        accurency: 1,
        valueType: "tmp",
        visible: true,
    }
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        fontStyle: powerBaseColor,
        fontSize: 15,
        cellStyle: "cell-power-style",
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
        valueType: "power",
        maxValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue),
        minValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue),
        limits: false,
        visible: true,
    } 
}