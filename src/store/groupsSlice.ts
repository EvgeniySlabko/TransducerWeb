import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullSensorInfo } from '../Sensor/SensorDefinitions';
import { PlotChannelStyle } from '../Channel/ChannelStyle/PlotChannelStyle';
import { CellChannelStyle } from '../Channel/ChannelStyle/CellChannelStyle';

export type GroupsState = {
    groups: Group[];
    uPlot: PlotContext | null;
}

export interface PlotContext
{
    uPlot: uPlot;
}

const initialState: GroupsState = {
    groups: [],
    uPlot: null
}

export interface Group {
    id: string;
    fullSensorInfo: FullSensorInfo;
    
    //plotChannels: PlotChannel[],
    //cellChannels: CellChannel[],
    //savingChannels: PlotChannel[],
    
    plotStyles: PlotChannelStyle[],
    savingStyles: PlotChannelStyle[],
    cellStyles: CellChannelStyle[]
}

const groupsSlice = createSlice({
    name: "groups",
    initialState,
    reducers:{ 
        addGroup(state, action: PayloadAction<Group>){
            state.groups.push(action.payload);
        },
        setChannelGroupsColor(state, action: PayloadAction<GroupPayload<string>>){
            const group = state.groups.find(x => x.id === action.payload.sensorId);
            if (group)
            {
                group.cellStyles[action.payload.groupId].color = action.payload.value;
                group.plotStyles[action.payload.groupId].color = action.payload.value
                group.savingStyles[action.payload.groupId].color = action.payload.value
            }
        },
        setLimits(state, action: PayloadAction<GroupPayload<boolean | undefined>>){
            const group = state.groups.find(x => x.id === action.payload.sensorId);
            if (group)
            {
                group.plotStyles[action.payload.groupId].drawLimits = action.payload.value
                group.savingStyles[action.payload.groupId].drawLimits = action.payload.value
            }
        },
        setAccurency(state, action: PayloadAction<GroupPayload<number>>){
            const group = state.groups.find(x => x.id === action.payload.sensorId);
            if (group)
            {
                group.cellStyles[action.payload.groupId].accuracy = action.payload.value
            }
        },
        setFontSize(state, action: PayloadAction<GroupPayload<number>>){
            const group = state.groups.find(x => x.id === action.payload.sensorId);
            if (group)
            {
                group.cellStyles[action.payload.groupId].fontSize = action.payload.value
            }
        },
        setChannelVisibility(state, action: PayloadAction<GroupPayload<boolean>>){
            const group = state.groups.find(x => x.id === action.payload.sensorId);
            if (group)
            {
                group.cellStyles[action.payload.groupId].visible = action.payload.value
            }
        },
        removeGroup(state, action: PayloadAction<string>){
            state.groups = state.groups.filter(x => x.id !== action.payload);
        },
    }
  })


  export interface GroupPayload<T>
  {
    sensorId: string
    groupId: number
    value: T
  }

  export const 
  { 
    setChannelGroupsColor,
    setLimits,
    setAccurency,
    addGroup,
    setFontSize,
    setChannelVisibility,
    removeGroup
  } = groupsSlice.actions;

  export default groupsSlice.reducer;