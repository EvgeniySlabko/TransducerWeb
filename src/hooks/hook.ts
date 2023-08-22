import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useState } from 'react';
import { SensorController } from '../Sensor/SensorsManager/SensorsManager';
import { PlotsManager } from '../uPlot/PlotManager';
import { RecordManager } from '../ReportListener/RecordManager';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSensorsService = () =>{
    const service = useState(new SensorController())
    return service
}

export const useRecordManager = () =>{
    const service = useState(new RecordManager());
    return service
}