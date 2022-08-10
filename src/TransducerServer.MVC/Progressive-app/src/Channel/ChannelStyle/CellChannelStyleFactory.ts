import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./ChanneStyleCommon";

let count: number = 0;

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo): CellChannelStyle {
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.UnitValueName,
        fontSize: 15,
        color: torqueBaseColor,
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
        valueType: "torque",
        maxValue: sensorInfo.MaxValue,
        minValue: sensorInfo.MinValue,
        limits: true,
        visible: true,
    }
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo): CellChannelStyle {
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Скорость вр.",
        unitsName: "rpm",
        color: speedBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accurency: 0,
        valueType: "speed",
        maxValue: sensorInfo.MaxSpeed,
        limits: false,
        visible: true,
    }
}

export function CreatetemperatureCellStyle(sensorInfo: FullSensorInfo): CellChannelStyle {
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Температура",
        unitsName: "C",
        color: tmpBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accurency: 1,
        valueType: "tmp",
        visible: true,
    }
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo): CellChannelStyle {
    return {
        id: count++,
        sensorId: sensorInfo.id,
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        color: powerBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accurency: sensorInfo.MasEdRazm.toString().length - 1,
        valueType: "power",
        maxValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue),
        minValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue),
        limits: false,
        visible: true,
    }
}