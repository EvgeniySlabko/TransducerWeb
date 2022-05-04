
import { ColorsDefs } from "../../Common/Colors";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultStyle() : ChannelStyle{
    return {
        color: "green",
        legendTitle: "Default legend title",
        line: "solid",
        range: [100, 100],
        yTitle: "Default y Title",
    } as ChannelStyle
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
    } as ChannelStyle;
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
    } as ChannelStyle;
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
    } as ChannelStyle;
}
