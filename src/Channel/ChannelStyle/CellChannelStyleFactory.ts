
import { ColorsDefs } from "../../Common/Colors";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannelStyle } from "./CellChannelStyle";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultCellStyle() : CellChannelStyle{
    return {
        fontColor: "#000000",
        backgroundColor: "#c2db74",
        borderColor: "#a7d41c",

    } as CellChannelStyle
}


export function CreateTorqueCellStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        fontColor: "#000000",
        backgroundColor: "#7bbda1",
        borderColor: "#11ad77",

    } as CellChannelStyle
}

export function CreateCellSpeedStyle(sensorInfo: FullSensorInfo) : CellChannelStyle{
    return {
        fontColor: "#000000",
        backgroundColor: "#7f7ba8",
        borderColor: "#2b1dab",

    } as CellChannelStyle
}

export function CreatetemperatureCellStyle() : CellChannelStyle{
    return {
        fontColor: "#000000",
        backgroundColor: "#b08696",
        borderColor: "#782f4b",

    } as CellChannelStyle
}
