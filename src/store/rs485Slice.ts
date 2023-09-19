import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DecoderType = "USB" | "RS485" | "VCOM" | "Faker";
export type BaudRate = 2400 | 4800 | 9600 | 14400 | 19200 | 38400 | 57600 | 115200;
export type StopBit = 1 | 2;

export type Rs485State = {
    deviceArrdess: number;
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
}

const initialState: Rs485State = {
    deviceArrdess: 1,
    baudRate: 115200,
    parity: "none",
    stopBits: 1,
}

const rs485Slice = createSlice({
    name: "rs485",
    initialState,
    reducers:{
        setDeviceArrdess(state, action: PayloadAction<number>){
           state.deviceArrdess = action.payload
        },
        setBaudRate(state, action: PayloadAction<BaudRate>){
            state.baudRate = action.payload
        },
        setParity(state, action: PayloadAction<ParityType>){
            state.parity = action.payload
        },
        setStopBit(state, action: PayloadAction<StopBit>){
            state.stopBits = action.payload
        },
        setAllSettings(state, action: PayloadAction<Rs485State>){
            state.deviceArrdess = action.payload.deviceArrdess;
            state.baudRate = action.payload.baudRate
            state.parity = action.payload.parity
            state.stopBits = action.payload.stopBits
        }
    }
  })

  export const 
  { 
    setDeviceArrdess,
    setBaudRate,
    setParity,
    setStopBit,
    setAllSettings
  } = rs485Slice.actions;

  export default rs485Slice.reducer;