import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Snapshot } from '../ReportListener/Snapshot';
import { AllChannelsInfo } from '../Channel/AllChannelsFactory';

export type DecoderType = "USB" | "RS485" | "VCOM" | "Faker";

export type UiState = {
    streaming: boolean,
    firstStart: boolean,
    snapshot: Snapshot | undefined,
    viewingReport: boolean,
    settings: boolean,
    tutorialVisible: boolean,
    selectedDecoderType: DecoderType
    showSensorsSettings: boolean,
    showDownloadModal: boolean,
    pointsPerSecond: number,
}

const initialState: UiState = {
    streaming: false,
    firstStart: true,
    snapshot: undefined,
    viewingReport: false,
    settings: false,
    tutorialVisible: false,
    selectedDecoderType: "USB",
    showSensorsSettings: false,
    showDownloadModal: false,
    pointsPerSecond: 50,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers:{
        toogleStreaming(state){
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
            state.streaming = false 
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
        toggleDownloadModal(state){ 
            state.showDownloadModal = !state.showDownloadModal 
        },
        setDecoderType(state, action: PayloadAction<DecoderType>){ 
            state.selectedDecoderType = action.payload;
            state.showSensorsSettings = false;
        },
        setPointsPerSecond(state, action: PayloadAction<number>){ 
            state.pointsPerSecond = action.payload;
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
    setDecoderType,
    setPointsPerSecond,
    toggleDownloadModal
  } = uiSlice.actions;

  export default uiSlice.reducer;