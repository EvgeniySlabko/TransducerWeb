import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ChannelStyle } from "./ChannelStyle";
import { GetColorBySeed } from "./ColorFactory";
import { powerBaseColor, speedBaseColor, tmpBaseColor, torqueBaseColor } from "./StyleCommon";


export function CreateTorqueStyle(sensorInfo: FullSensorInfo, colorSeed: number) : ChannelStyle{

    let style = new ChannelStyle();
    style.sensorId = sensorInfo.id;
    style.grid= true;
    style.color = GetColorBySeed(torqueBaseColor, colorSeed);
    style.axisColor = torqueBaseColor;
    style.legendTitle = sensorInfo.SensorType + ":Torque";
    style.line = "solid";
    style.range = [sensorInfo.MinValue - 0.2 * sensorInfo.MaxValue, sensorInfo.MaxValue + 0.2 * sensorInfo.MaxValue],
    style.yTitle = `Torque (${sensorInfo.UnitValueName})`;
    style.unitName = sensorInfo.Unitname;
    style.valueType = "torque";
    style.yAxeSide = "left";
    style.rescaleRationBottom = rescaleRatio;
    style.rescaleRationTop = rescaleRatio;
    style.visible = true;
    style.width = 1;
    style.mnogitel = sensorInfo.valueRatio;
    style.legendValueAcurency = sensorInfo.MasEdRazm.toString().length - 1;
    style.drawLimits = true;
    style.minValue = sensorInfo.MinValue;
    style.maxValue = sensorInfo.MaxValue;
    
    return style;
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo, colorSeed: number) : ChannelStyle{
    let style = new ChannelStyle();
    style.sensorId = sensorInfo.id;
    style.grid= false;
    style.color = GetColorBySeed(speedBaseColor, colorSeed);
    style.axisColor = speedBaseColor;
    style.legendTitle = sensorInfo.SensorType + ":Speed";
    style.line = "solid";
    style.range = [0, 30000];
    style.yTitle = `Speed (${sensorInfo.speedUnitsName})`;
    style.unitName = "hz";
    style.valueType = "speed";
    style.yAxeSide = "right";
    style.rescaleRationBottom = 0;
    style.rescaleRationTop = rescaleRatio;
    style.visible = true;
    style.width = 1;
    style.legendValueAcurency = 0;
    style.mnogitel = 1;
    style.maxValue = sensorInfo.MaxSpeed;

    return style;
}

export function CreatetemperatureStyle(sensorInfo: FullSensorInfo, colorSeed: number) : ChannelStyle{
    let style = new ChannelStyle();
    style.sensorId = sensorInfo.id;
    style.grid= false;
    style.color = GetColorBySeed(tmpBaseColor, colorSeed);
    style.axisColor = tmpBaseColor;
    style.legendTitle = sensorInfo.SensorType +  ":Tmp";
    style.line = "solid";
    style.range = [-60, 60],
    style.yTitle = `Temperature (C)`;
    style.unitName = "Dg";
    style.valueType = "tmp";
    style.yAxeSide = "right";
    style.rescaleRationBottom = rescaleRatio;
    style.rescaleRationTop = rescaleRatio;
    style.visible = false;
    style.width = 1;
    style.mnogitel = 1;
    style.legendValueAcurency = 1;

    return style;
}

export function CreatePowerStyle(sensorInfo: FullSensorInfo, colorSeed: number) : ChannelStyle{
    let minPower = CalculatePower(sensorInfo.MaxSpeed + 0.1 * sensorInfo.MaxSpeed, sensorInfo.MinValue + 0.1 * sensorInfo.MinValue);
    let maxPower = -minPower;

    let style = new ChannelStyle();
    style.sensorId = sensorInfo.id;
    style.grid= false;
    style.color = GetColorBySeed(powerBaseColor, colorSeed);
    style.axisColor = powerBaseColor;
    style.legendTitle = sensorInfo.SensorType + ":Power";
    style.line = "solid";
    style.range = [minPower, maxPower],
    style.yTitle = `Power (W)`;
    style.unitName = sensorInfo.powerUnitsName,
    style.valueType = "power",
    style.yAxeSide = "left",
    style.rescaleRationBottom = rescaleRatio;
    style.rescaleRationTop = rescaleRatio;
    style.visible = false;
    style.width = 1;
    style.mnogitel = 1;
    style.legendValueAcurency = 0;
    style.maxValue = CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MaxValue);
    style.minValue = CalculatePower(sensorInfo.MaxSpeed, sensorInfo.MinValue);

    return style;
}

let rescaleRatio = 0.2;