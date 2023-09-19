import { AllChannelsInfo } from '../Channel/AllChannelsFactory';
import { SensorWorker } from '../Sensor/SensorWorker';
import { FullSensorInfo } from '../Sensor/SensorDefinitions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlotChannelStyle } from '../Channel/ChannelStyle/PlotChannelStyle';


export type PlotState = {
    pointsPerSecond: number,
}

const initialState: PlotState = {
    pointsPerSecond: 5000,
}

const plotSlice = createSlice({
    name: "plot",
    initialState,
    reducers:{
        setPointsPerSecond(state, action: PayloadAction<number>){
            if (action.payload < 1 || action.payload > 5000)
                throw "Invalid points per second value"
            state.pointsPerSecond = action.payload;
        },
    }
  })

  export const 
  { 
 
  } = plotSlice.actions;

  export default plotSlice.reducer;
  