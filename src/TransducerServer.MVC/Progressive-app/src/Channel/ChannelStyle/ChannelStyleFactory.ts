import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { PlotChannelStyle } from "./PlotChannelStyle";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./ChanneStyleCommon";


const rescaleRatio: number = 0.2;
export function CreateTorqueStyle(sensorInfo: FullSensorInfo): PlotChannelStyle {
    let maxValScaled = sensorInfo.MaxValue * sensorInfo.valueRatio;
    let minValScaled = sensorInfo.MinValue * sensorInfo.valueRatio;
    return{
        sensorId: sensorInfo.id,
        grid: true,
        color: torqueBaseColor,
        axisColor: torqueBaseColor,
        legendTitle: sensorInfo.SensorType + ":Torque",
        line: "solid",
        range: [minValScaled - 0.2 * maxValScaled, maxValScaled + 0.2 * maxValScaled],
        yTitle: `Torque (${sensorInfo.Unitname})`,
        unitName: sensorInfo.Unitname,
        valueType: "torque",
        yAxeSide: "left",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        visible: true,
        width: 1,
        mnogitel: sensorInfo.valueRatio,
        legendValueAcurency: sensorInfo.MasEdRazm.toString().length - 1,
        drawLimits: true,
        minValue: minValScaled,
        maxValue: maxValScaled,
    }
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo): PlotChannelStyle {
    return{
        sensorId: sensorInfo.id,
        grid: false,
        color: speedBaseColor,
        axisColor: speedBaseColor,
        legendTitle: sensorInfo.SensorType + ":Speed",
        line: "solid",
        range: [-20, 30000],
        yTitle: `Speed (${sensorInfo.speedUnitsName})`,
        unitName: "hz",
        valueType: "speed",
        yAxeSide: "right",
        rescaleRationBottom: 0,
        rescaleRationTop: rescaleRatio,
        visible: true,
        width: 1,
        legendValueAcurency: 0,
        mnogitel: 1,
        maxValue: sensorInfo.MaxSpeed,
    }
}

export function CreatetemperatureStyle(sensorInfo: FullSensorInfo): PlotChannelStyle {
    return{
        sensorId: sensorInfo.id,
        grid: false,
        color: tmpBaseColor,
        axisColor: tmpBaseColor,
        legendTitle: sensorInfo.SensorType + ":Tmp",
        line: "solid",
        range: [-60, 60],
            yTitle: `Temperature (C)`,
        unitName: "Dg",
        valueType: "tmp",
        yAxeSide: "right",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        visible: false,
        width: 1,
        mnogitel: 1,
        legendValueAcurency: 1,
    }
}

export function CreatePowerStyle(sensorInfo: FullSensorInfo): PlotChannelStyle {
    let minPower = CalculatePower(sensorInfo.MaxSpeed + 0.1 * sensorInfo.MaxSpeed, sensorInfo.MinValue + 0.1 * sensorInfo.MinValue);
    let maxPower = -minPower;
    return{
        sensorId: sensorInfo.id,
        grid: false,
        color: powerBaseColor,
        axisColor: powerBaseColor,
        legendTitle: sensorInfo.SensorType + ":Power",
        line: "solid",
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
        legendValueAcurency: 0,
        maxValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue),
        minValue: CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue),
    }
}