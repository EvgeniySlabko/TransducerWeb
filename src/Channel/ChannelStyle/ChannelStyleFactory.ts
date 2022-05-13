
import { ColorsDefs } from "../../Common/Colors";
import { CalculatePower } from "../../Common/Common";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultStyle() : ChannelStyle{
    return {
        color: "green",
        legendTitle: "Default legend title",
        line: "solid",
        range: [100, 100],
        yTitle: "Default y Title",
        grid: false,
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
        unitName: "Undefined",
        valueType: "torque",
        yAxeSide: "left"
    } 
}


export function CreateTorqueStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
    return {
        grid: true,
        color: "green",
        legendTitle: "Torque",
        line: "solid",
        range: [sensorInfo.MinValue - 0.2 * sensorInfo.MaxValue, sensorInfo.MaxValue + 0.2 * sensorInfo.MaxValue],
        yTitle: "Torque",
        unitName: sensorInfo.Unitname,
        valueType: "torque",
        yAxeSide: "left",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
    };
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
    return {
        grid: false,
        color: "blue",
        legendTitle: "Speed",
        line: "solid",
        range: [0, 30000],
        yTitle: "Speed",
        unitName: "hz",
        valueType: "speed",
        yAxeSide: "right",
        rescaleRationBottom: 0,
        rescaleRationTop: rescaleRatio,
    };
}

export function CreatetemperatureStyle() : ChannelStyle{
    return {
        grid: false,
        color: "red",
        legendTitle: "Tmp",
        line: "dash",
        range: [-60, 60],
        yTitle: "Tmp",
        unitName: "Dg",
        valueType: "tmp",
        yAxeSide: "right",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
    };
}


export function CreatePowerStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
        let minPower = CalculatePower(sensorInfo.MaxSpeed + 0.1 * sensorInfo.MaxSpeed, sensorInfo.MinValue + 0.1 * sensorInfo.MinValue);
        let maxPower = -minPower;
    return {
        grid: false,
        color: "darkRed",
        legendTitle: "Power",
        line: "dash",
        range: [minPower, maxPower],
        yTitle: "Power",
        unitName: sensorInfo.powerUnitsName,
        valueType: "power",
        yAxeSide: "left",
        rescaleRationBottom: rescaleRatio,
        rescaleRationTop: rescaleRatio,
    };
}

let rescaleRatio = 0.2;
