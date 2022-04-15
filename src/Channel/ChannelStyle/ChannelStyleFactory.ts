
import { ColorsDefs } from "../../Common/Colors";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
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
    return CreateDefaultStyle();
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
    return CreateDefaultStyle();
}

export function CreatetemperatureStyle() : ChannelStyle{
    return CreateDefaultStyle();
}
