import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useEffect, useMemo, useState } from 'react';
import { SensorController } from '../Sensor/SensorsManager/SensorsManager';
import { RecordManager } from '../ReportListener/RecordManager';
import { PlotsManager } from '../uPlot/PlotManager';
import { MyUPlotBase } from '../uPlot/PlotBase';
import { PipelineController, ChannelsGroup } from '../Channel/AllChannelsFactory';
import { SensorWorker } from '../Sensor/SensorWorker';


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();


//Sensor manager
const sensorController = new SensorController();
export const useSensorsService = () =>{
    return [sensorController]
}

//Plots
const plots: Map<number, MyUPlotBase> = new Map();
export const usePlots = () : [Map<number, MyUPlotBase>] =>{
    return [plots];
}

export const useRecordManager = () =>{
    const service = useState(new RecordManager());
    return service
}

type SensorContext = {
    pipelineController: PipelineController
    sensorController: SensorWorker
    channelGroups: ChannelsGroup[]
}
const sensorContexts: Map<string, SensorContext> = new Map();
export const useSensorContext = (key: string) : [SensorWorker, PipelineController, ChannelsGroup[]] => {
    const sensorContext = sensorContexts.get(key)!;
    return [sensorContext.sensorController, sensorContext.pipelineController, sensorContext.channelGroups];
}

export const useSensorContexts = () : [Map<string, SensorContext>] => {
    return [sensorContexts]
}