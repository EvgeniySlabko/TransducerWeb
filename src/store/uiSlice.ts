import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Snapshot } from '../ReportListener/Snapshot';
import { SensorNode } from '../Components/App';
import { AllChannelsInfo } from '../Channel/AllChannelsFactory';

export type DecoderType = "USB" | "RS485" | "VCOM" | "Faker";

export type UiState = {
    streaming: boolean,
    firstStart: boolean,
    snapshot: Snapshot | undefined,
    viewingReport: boolean,
    settings: boolean,
    groups: Group[],
    tutorialVisible: boolean,
    selectedDecoderType: DecoderType
    showSensorsSettings: boolean
}

const initialState: UiState = {
    streaming: false,
    firstStart: true,
    snapshot: undefined,
    viewingReport: false,
    settings: false,
    groups: [],
    tutorialVisible: false,
    selectedDecoderType: "USB",
    showSensorsSettings: false
}

export interface Group {
    node: SensorNode;
    channelsInfo: AllChannelsInfo;
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers:{
        toogleStreaming(state){
            //{ ...state, streaming: !state.streaming, firstStart: !state.streaming }
            state.streaming = !state.streaming
            state.firstStart = false
        },
        reset(state){
            state.firstStart = true, 
            state.streaming = false, 
            state.viewingReport = false 
        },
        showReport(state, action: PayloadAction<Snapshot>){
            state.firstStart = true, 
            state.streaming = false, 
            state.viewingReport = false
            state.snapshot = action.payload
        },
        setStreamingView(state){ 
            state.viewingReport = false 
        },
        pause(state){ 
            state.viewingReport = false 
        },
        toggleSettingsScreenModal(state){ 
            state.settings = !state.settings 
        },
        toggleTutorialScreenModal(state){ 
            state.tutorialVisible = !state.tutorialVisible 
        },
        toggleSensorScreenModal(state){ 
            state.showSensorsSettings = !state.showSensorsSettings 
        },
        addGroup(state, action: PayloadAction<Group>){ 
            state.groups.push(action.payload)
        },
        setDecoderType(state, action: PayloadAction<DecoderType>){ 
            state.selectedDecoderType = action.payload;
            state.showSensorsSettings = false;
        },
    }
  })

  export const 
  { 
    toogleStreaming,
    reset,
    showReport,
    setStreamingView,
    pause,
    toggleSettingsScreenModal,
    toggleTutorialScreenModal,
    toggleSensorScreenModal,
    addGroup,
  } = uiSlice.actions;

  export default uiSlice.reducer;