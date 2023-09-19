import { notification } from "antd";
import React, { HTMLAttributes, useEffect } from "react";
import { CreateAllChannels } from "../Channel/AllChannelsFactory";
import { ChangeGroupColor } from "../Common/ColorHelpers";
import { SensorControllerArgs } from "../Sensor/SensorsManager/SensorsManager";
import { ApplayLocalStorageSettingsForGroups, ApplySensorParameters as ApplaySensorStorageParameters } from "../Storage/ChannelsDataStorage";
import { useAppDispatch, useAppSelector, useSensorContext, useSensorContexts, useSensorsService } from "../hooks/hook";
import { reset } from "../store/uiSlice";
import { Group, addGroup } from "../store/groupsSlice";
import { StreamingPlot } from "../Components/StreamingPlot";
import { GetGroupedChannels, GetGroupedStyles } from "../utils/channelsUtils";
import styles from "./Plot.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const Plot = ({...rest}: Props) => {
    const { groups } = useAppSelector(state => state.groups)
    const [sensorService, setSensorService] = useSensorsService();
    const dispatch = useAppDispatch();

    const [contexts] = useSensorContexts();

    const plotStyles = groups.map(x => x.plotStyles).flat();
    const allPlotChannels = groups.map(x => contexts.get(x.id)!.channelGroups.map(c => c.plotChannel)).flat();
    useEffect(() => {
        sensorService.onDispatch.sub(newSensorHandler);
        return () => sensorService.onDispatch.unsub(newSensorHandler);
    }, groups);

    const newSensorHandler = async (args: SensorControllerArgs) => {
        console.debug("Adding new sensor.");
       
        const allChannelsInfo = CreateAllChannels(args.worker, args.fullSensorInfo);
        const groups = GetGroupedChannels(allChannelsInfo);
        const channeldGroups = GetGroupedChannels(allChannelsInfo);
        const stylesGroups = GetGroupedStyles(allChannelsInfo);
        ChangeGroupColor(stylesGroups, groups.length);
        ApplayLocalStorageSettingsForGroups(stylesGroups, args.fullSensorInfo.SensorId);
         
        //setPipeline(allChannelsInfo.id, allChannelsInfo.pipelineController);
        //setSensorWorker(allChannelsInfo.id, allChannelsInfo.sensorWorker);
        let group: Group = {
            id: allChannelsInfo.id,
            cellStyles: allChannelsInfo.cellStyles,
            plotStyles: allChannelsInfo.plotStyles,
            savingStyles: allChannelsInfo.savingStyles,
            //channelsInfo: allChannelsInfo,
            fullSensorInfo: args.fullSensorInfo,
            //worker: args.worker,
        };

        contexts.set(allChannelsInfo.id, {
            channelGroups: channeldGroups,
            pipelineController: allChannelsInfo.pipelineController,
            sensorController: allChannelsInfo.sensorWorker
        });

        await ApplaySensorStorageParameters(allChannelsInfo.sensorWorker, allChannelsInfo.pipelineController, args.fullSensorInfo.SensorId);
        //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
        dispatch(reset());
        dispatch(addGroup(group));

        notification.success({
            message: `Добавлен датчик ${args.fullSensorInfo.SensorType}`,
            duration: 2,
        });
    }; 



    return(
        <div className={styles.col} {...rest}>
        
        <StreamingPlot  style={{height: "20%"}} 
            plotStyles={plotStyles} 
            plotChannels={allPlotChannels} />

        <StreamingPlot  style={{height: "20%"}} 
                plotStyles={plotStyles} 
                plotChannels={allPlotChannels} />

        <StreamingPlot  style={{height: "20%"}} 
            plotStyles={plotStyles} 
            plotChannels={allPlotChannels} />

        <StreamingPlot  style={{height: "20%"}} 
                plotStyles={plotStyles} 
                plotChannels={allPlotChannels} />

        <StreamingPlot  style={{height: "20%"}} 
                plotStyles={plotStyles} 
                plotChannels={allPlotChannels} />
        </div>
    )
}