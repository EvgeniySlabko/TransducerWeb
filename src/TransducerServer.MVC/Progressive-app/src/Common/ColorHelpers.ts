import { ChannelsGroup } from "../Channel/AllChannelsFactory";
import { ChannelDataType } from "../Channel/ChannelStyle/ChanneStyleCommon";

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

export function ChangeGroupColor(groups: ChannelsGroup[], index: number) {
    groups.forEach(group => {
        group.cellChannel.Style.color = ChangeChannelColorAccordigIndex(group.cellChannel.Style.color, group.cellChannel.Style.valueType, index);
        group.plotChannel.Style.color = ChangeChannelColorAccordigIndex(group.plotChannel.Style.color, group.plotChannel.Style.valueType, index);
        group.savingChannel.Style.color = ChangeChannelColorAccordigIndex(group.savingChannel.Style.color, group.savingChannel.Style.valueType, index);
    })
}

export function IncreaseBrightness(hex: string, percent: number) {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
        ((0 | (1 << 8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}


export function ChangeChannelColorAccordigIndex(color: string, type: ChannelDataType, index: number): string {
    let arrIndex = index % mainColors.length
    switch (type) {
        case "torque": return mainColors[arrIndex];
        case "speed": return speedColors[arrIndex];
        case "power": return powerColors[arrIndex];
        default: return color;
    }
}








