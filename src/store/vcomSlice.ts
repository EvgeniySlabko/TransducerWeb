import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaudRate, StopBit } from './rs485Slice';

export type VCOMState = {
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
}

const initialState: VCOMState = {
    baudRate: 115200,
    parity: "none",
    stopBits: 1,
}

const vcomSlice = createSlice({
    name: "vcom",
    initialState,
    reducers:{
        setAllSettings(state, action: PayloadAction<VCOMState>){
            state.baudRate = action.payload.baudRate
            state.parity = action.payload.parity
            state.stopBits = action.payload.stopBits
        }
    }
  })

  export const 
  {
    setAllSettings
  } = vcomSlice.actions;

  export default vcomSlice.reducer;