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

const sensorController = new SensorController();
export const useSensorsService = () =>{
    return [sensorController]
}

let mplot: MyUPlotBase | undefined = undefined;
export const usePlotManager = () : [MyUPlotBase | undefined, (plot: MyUPlotBase) => void] =>{
    const setPlot = (plot : MyUPlotBase | undefined) => mplot = plot
    return [mplot, setPlot];
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
const contexts: Map<string, SensorContext> = new Map();
export const useSensorContext = (key: string) : [SensorWorker, PipelineController, ChannelsGroup[]] => {
    const sensorContext = contexts.get(key)!;
    return [sensorContext.sensorController, sensorContext.pipelineController, sensorContext.channelGroups];
}

export const useSensorContexts = () : [Map<string, SensorContext>] => {
    return [contexts]
}