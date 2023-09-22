import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
import { PlotChannelStyle } from "./PlotChannelStyle";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./ChanneStyleCommon";

const rescaleRatio: number = 0.2;
export function CreateTorqueStyle(sensorInfo: FullSensorInfo, id: string): PlotChannelStyle {
    let maxValScaled = sensorInfo.MaxValue * sensorInfo.valueRatio;
    let minValScaled = sensorInfo.MinValue * sensorInfo.valueRatio;
    return {
        id: id,
        sensorId: sensorInfo.id,
        grid: true,
        color: torqueBaseColor,
        axisColor: torqueBaseColor,
        legendTitle: sensorInfo.SensorType + `:Torque(${sensorInfo.UnitValueName})`,
        line: "solid",
        range: [minValScaled - 0.2 * maxValScaled, maxValScaled + 0.2 * maxValScaled],
        yTitle: `Torque (${sensorInfo.Unitname})`,
        unitName: sensorInfo.Unitname,
        valueType: "torque",
        legendValueAccuracy: sensorInfo.Accuracy,
        yAxeSide: "left",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        visible: true,
        width: 1,
        valueRatio: sensorInfo.valueRatio,
        mnogitel: sensorInfo.valueRatio,
        drawLimits: true,
        minValue: minValScaled,
        maxValue: maxValScaled,
    };
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo, id: string): PlotChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        grid: false,
        color: speedBaseColor,
        axisColor: speedBaseColor,
        legendTitle: sensorInfo.SensorType + `:Speed(${sensorInfo.speedUnitsName})`,
        line: "solid",
        range: [-20, 30000],
        yTitle: `Speed (${sensorInfo.speedUnitsName})`,
        unitName: "hz",
        valueRatio: 1,
        valueType: "speed",
        legendValueAccuracy: 0,
        yAxeSide: "right",
        rescaleRationBottom: 0,
        rescaleRationTop: rescaleRatio,
        visible: true,
        width: 1,
        mnogitel: 1,
        maxValue: sensorInfo.MaxSpeed,
    };
}

export function CreateTemperatureStyle(sensorInfo: FullSensorInfo, id: string): PlotChannelStyle {
    return {
        id: id,
        sensorId: sensorInfo.id,
        grid: false,
        color: tmpBaseColor,
        axisColor: tmpBaseColor,
        legendTitle: sensorInfo.SensorType + `:Tmp(°C)`,
        line: "solid",
        range: [-60, 60],
        valueRatio: 1,
        legendValueAccuracy: 1,
        yTitle: `Temperature (C)`,
        unitName: "Dg",
        valueType: "tmp",
        yAxeSide: "right",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        visible: false,
        width: 1,
        mnogitel: 1,
    };
}

export function CreatePowerStyle(sensorInfo: FullSensorInfo, id: string): PlotChannelStyle {
    let minPower = CalculatePower(sensorInfo.MaxSpeed + 0.1 * sensorInfo.MaxSpeed, sensorInfo.MinValue + 0.1 * sensorInfo.MinValue);
    let maxPower = -minPower;
    return {
        id: id,
        sensorId: sensorInfo.id,
        grid: false,
        color: powerBaseColor,
        axisColor: powerBaseColor,
        legendTitle: sensorInfo.SensorType + `:Power(${sensorInfo.powerUnitsName})`,
        line: "solid",
        valueRatio: 1,
        range: [minPower, maxPower],
        yTitle: `Power (W)`,
        unitName: sensorInfo.powerUnitsName,
        valueType: "power",
        yAxeSide: "left",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        visible: false,
        width: 1,
        mnogitel: 1,
        legendValueAccuracy: sensorInfo.Accuracy,
        maxValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue),
        minValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue),
    };
}
