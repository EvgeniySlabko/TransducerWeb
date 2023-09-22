import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./ChanneStyleCommon";

export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo, id: string): CellChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        valueName: sensorInfo.ValueName,
        unitsName: sensorInfo.UnitValueName,
        fontSize: 15,
        color: torqueBaseColor,
        sensorType: sensorInfo.SensorType,
        accuracy: sensorInfo.Accuracy,
        valueType: "torque",
        maxValue: sensorInfo.MaxValue,
        minValue: sensorInfo.MinValue,
        limits: true,
        visible: true,
    };
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo, id: string): CellChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        valueName: "Скорость вр.",
        unitsName: "rpm",
        color: speedBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accuracy: 0,
        valueType: "speed",
        maxValue: sensorInfo.MaxSpeed,
        limits: false,
        visible: false,
    };
}

export function CreateTemperatureCellStyle(sensorInfo: FullSensorInfo, id: string): CellChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        valueName: "Температура",
        unitsName: "C",
        color: tmpBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accuracy: 1,
        valueType: "tmp",
        visible: false,
    };
}

export function CreatePowerCellStyle(sensorInfo: FullSensorInfo, id: string): CellChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        valueName: "Мощность",
        unitsName: sensorInfo.powerUnitsName,
        color: powerBaseColor,
        fontSize: 15,
        sensorType: sensorInfo.SensorType,
        accuracy: sensorInfo.Accuracy,
        valueType: "power",
        maxValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue),
        minValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue),
        limits: false,
        visible: true,
    };
}
