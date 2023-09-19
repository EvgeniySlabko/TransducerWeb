import { AllChannelsInfo, ChannelsGroup, StylesGroup } from "../Channel/AllChannelsFactory"

export const GetGroupedChannels = (allChannelsInfo: AllChannelsInfo) : ChannelsGroup[] =>
{
    let groups: ChannelsGroup[] = [];
    for (let i = 0; i < allChannelsInfo.cellChannels.length; i++) {
        groups.push({
            cellChannel: allChannelsInfo.cellChannels[i],
            plotChannel: allChannelsInfo.plotChannels[i],
            savingChannel: allChannelsInfo.savingChannels[i]
        })
    }

    return groups;
}

export const GetGroupedStyles = (allChannelsInfo: AllChannelsInfo) : StylesGroup[] =>
{
    let groups: StylesGroup[] = [];
    for (let i = 0; i < allChannelsInfo.cellStyles.length; i++) {
        groups.push({
            cellStyle: allChannelsInfo.cellStyles[i],
            plotStyle: allChannelsInfo.plotStyles[i],
            savingStyle: allChannelsInfo.savingStyles[i]
        })
    }

    return groups;
}