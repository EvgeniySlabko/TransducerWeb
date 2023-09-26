import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullSensorInfo } from '../Sensor/SensorDefinitions';
import { PlotChannelStyle } from '../Channel/ChannelStyle/PlotChannelStyle';
import { CellChannelStyle } from '../Channel/ChannelStyle/CellChannelStyle';

export type GroupsState = {
    groups: Group[];                //all sensor information and all channels
    plotContexts: PlotContext[],    //plot information
    plotChannels: PlotChannel[],    //plot - channel connection
    defaultPointsPerSecond: number
}

const initialState: GroupsState = {
    groups: [],
    plotChannels: [],
    plotContexts: [
        {
            hideAxes: [],
            id: 0,
            order: 0,
            legend: false,
            plotName: `Plot-1`,
            pointsPerSecond: 5000
        }
    ],
    defaultPointsPerSecond: 5000
}

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers:{ 
        addGroup(state, action: PayloadAction<Group>){
            state.groups.push(action.payload);
            if(state.plotContexts.length === 0)
                addNewPlot(state);
            
            const plot = state.plotContexts[0];
            
            action.payload.plotStyles.forEach((plotStyle) =>
            {
                state.plotChannels.push({
                    channelId: plotStyle.id,
                    plotId: plot.id
                })
            })
        },
        setChannelGroupsColor(state, action: PayloadAction<{channelId: string, color: string}>){
            for (const group of state.groups) {
                for (let i = 0; i < group.cellStyles.length; i++) {
                    if(group.cellStyles[i].id === action.payload.channelId)
                    {
                        group.cellStyles[i].color = action.payload.color;
                        group.plotStyles[i].color = action.payload.color;
                        group.savingStyles[i].color = action.payload.color;
                        return;
                    }
                }
            }
        },
        setLimits(state, action: PayloadAction<{channelId: string, drawLimits: boolean | undefined}>){
            for (const group of state.groups) {
                for (let i = 0; i < group.cellStyles.length; i++) {
                    if(group.cellStyles[i].id === action.payload.channelId)
                    {
                        group.plotStyles[i].drawLimits = action.payload.drawLimits;
                        group.savingStyles[i].drawLimits = action.payload.drawLimits;
                        return;
                    }
                }
            }
        },
        setAxisHide(state, action: PayloadAction<{plotId: number, hidedAxies: string[]}>){
            const plotContext = state.plotContexts.find(p => p.id === action.payload.plotId);
            if (plotContext)
            {
                plotContext.hideAxes = action.payload.hidedAxies
            }
        },
        setAccurency(state, action: PayloadAction<{channelId: string, accuracy: number}>){
            for (const group of state.groups) {
                for (let i = 0; i < group.cellStyles.length; i++) {
                    if(group.cellStyles[i].id === action.payload.channelId)
                    {
                        group.cellStyles[i].accuracy = action.payload.accuracy;
                        return;
                    }
                }
            }
        },
        setFontSize(state, action: PayloadAction<{channelId: string, fontSize: number}>){
            for (const group of state.groups) {
                for (let i = 0; i < group.cellStyles.length; i++) {
                    if(group.cellStyles[i].id === action.payload.channelId)
                    {
                        group.cellStyles[i].fontSize = action.payload.fontSize;
                        return;
                    }
                }
            }
        },
        setChannelVisibility(state, action: PayloadAction<{channelId: string, visible: boolean}>){
            for (const group of state.groups) {
                for (let i = 0; i < group.cellStyles.length; i++) {
                    if(group.cellStyles[i].id === action.payload.channelId)
                    {
                        group.cellStyles[i].visible = action.payload.visible;
                        return;
                    }
                }
            }
        },
        removeGroup(state, action: PayloadAction<{groupId: string}>){
            const groupToRemove = state.groups.find(x => x.id === action.payload.groupId);
            if(groupToRemove)
            {
                for (let i = 0; i < groupToRemove.cellStyles.length; i++) {
                    state.plotChannels.filter(p => p.channelId !== groupToRemove.cellStyles[i].id)
                }
            }
        },
        setPointsPerSecond(state, action: PayloadAction<number>){
            if (action.payload < 1 || action.payload > 5000)
                throw "Invalid points per second value";
            state.plotContexts.forEach(x => x.pointsPerSecond = action.payload);
            state.defaultPointsPerSecond = action.payload;
        },
        setLegend(state, action: PayloadAction<{plotId: number, value: boolean}>){
            const plotContext = state.plotContexts.find(p => p.id === action.payload.plotId);
            if (plotContext)
                plotContext.legend = action.payload.value;
        },
        addPlot(state){
            addNewPlot(state);
        },
        removePlot(state, action: PayloadAction<number>){
            removePlotById(state, action.payload);
        },
        attachChannelToPlots(state, action: PayloadAction<{plotIds: number[], channelId: string}>){
            state.plotChannels = state.plotChannels.filter(c => c.channelId !== action.payload.channelId);
            action.payload.plotIds.forEach(plotId => state.plotChannels.push({
                channelId: action.payload.channelId,
                plotId: plotId
            }))
        },
        setNumberOfPlots(state, action: PayloadAction<number>){
            if (action.payload > state.plotContexts.length)
            {
                const numberOfPlotsToAdd = action.payload - state.plotContexts.length;
                for(let i = 0; i < numberOfPlotsToAdd; i++){
                    addNewPlot(state);
                }
            }
            if (action.payload < state.plotContexts.length)
            {
                const numberOfPlotsToRemove = state.plotContexts.length - action.payload;
                const plotsIdsToRemove = state.plotContexts.map(pc => pc.id).sort().slice(-numberOfPlotsToRemove);
                plotsIdsToRemove.forEach(plotIdToRemove => {
                    removePlotById(state, plotIdToRemove)
                });
            }
        },
    }
})

function addNewPlot(state: GroupsState) {
    const allPlotContextsIds = state.plotContexts.map(x => x.id);
    const index = findFirstSkippedNumber(allPlotContextsIds);
    const order = findFirstSkippedNumber(state.plotContexts.map(x => x.order));
    state.plotContexts.push({
        id: index,
        plotName: `Plot-${index + 1}`,
        pointsPerSecond: state.defaultPointsPerSecond,
        order: order,
        legend: false,
        hideAxes: []
    });
    return state;
}

function removePlotById(state: GroupsState, plotId: number) {
    state.plotContexts = state.plotContexts.filter(c => c.id !== plotId);
    state.plotChannels = state.plotChannels.filter(c => c.plotId !== plotId);
}

export type PlotContext = {
    id: number,
    plotName: string
    pointsPerSecond: number,
    order: number
    legend: boolean
    hideAxes: string[]
}

export type PlotChannel = {
    channelId: string,
    plotId: number,
}

export interface Group {
    id: string; //should be unique id of sensor
    fullSensorInfo: FullSensorInfo;
    plotStyles: PlotChannelStyle[],
    savingStyles: PlotChannelStyle[],
    cellStyles: CellChannelStyle[]
}

export const { 
    setChannelGroupsColor,
    setLimits,
    setAccurency,
    addGroup,
    setFontSize,
    setChannelVisibility,
    removeGroup,
    setLegend,
    setAxisHide,
    addPlot,
    attachChannelToPlots,
    setNumberOfPlots
} = groupsSlice.actions;

const findFirstSkippedNumber = (arr: number[]): number => {
    arr.sort((a, b) => a - b);

    let smallestMissing = 0;

    for (const num of arr) {
        if (num > smallestMissing) {
            return smallestMissing;
        }
        smallestMissing = num + 1;
    }

    return smallestMissing;
}

export default groupsSlice.reducer;