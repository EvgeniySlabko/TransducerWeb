import { ChannelsGroup } from "../Channel/AllChannelsFactory";
import { ValueType } from "../Channel/ChannelStyle/ChanneStyleCommon";
import { Group } from "../Components/App";

let mainColors =
    [
        "#00851f",
        "#9e027c",
        "#007858",
        "#008773"
    ]

let speedColors =
    [
        "#0000ff",
        "#02a0bf",
        "#32017a",
        "#3d0087"
    ]

let powerColors =
    [
        "#a0a000",
        "#826400",
        "#5c7300",
        "#4a2500"
    ]

export function changeGroupColor(groups: ChannelsGroup[], index: number) {
    groups.forEach(g => {
        g.cellChannel.Style.color = changeChannelColorAccordigIndex(g.cellChannel.Style.color, g.cellChannel.Style.valueType, index);
        g.plotChannel.Style.color = changeChannelColorAccordigIndex(g.plotChannel.Style.color, g.plotChannel.Style.valueType, index);
        g.savingChannel.Style.color = changeChannelColorAccordigIndex(g.savingChannel.Style.color, g.savingChannel.Style.valueType, index);
    })
}

export function changeChannelColorAccordigIndex(color: string, type: ValueType, index: number): string {
    let arrIndex = index % mainColors.length
    switch (type) {
        case "torque": return mainColors[arrIndex];
        case "speed": return speedColors[arrIndex];
        case "power": return powerColors[arrIndex];
        default: return color;
    }
}








