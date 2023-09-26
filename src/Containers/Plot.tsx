import { notification } from "antd";
import React, { HTMLAttributes, useEffect } from "react";
import { CreateAllChannels } from "../Channel/AllChannelsFactory";
import { ChangeGroupColor } from "../Common/ColorHelpers";
import { SensorControllerArgs } from "../Sensor/SensorsManager/SensorsManager";
import { ApplayLocalStorageSettingsForGroups, ApplySensorParameters as ApplaySensorStorageParameters } from "../Storage/ChannelsDataStorage";
import { useAppDispatch, useAppSelector, usePlots, useSensorContext, useSensorContexts, useSensorsService } from "../hooks/hook";
import { reset } from "../store/uiSlice";
import { Group, addGroup, setLegend, setAxisHide } from "../store/groupsSlice";
import { GetGroupedChannels, GetGroupedStyles } from "../utils/channelsUtils";
import styles from "./Plot.module.scss";
import { MyUPlotBase } from "../uPlot/PlotBase";
import { PlotLayoutContext, PlotsLayout } from "../Components/plotLayout";

export interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const Plot = ({...rest}: Props) => {
    const { groups, plotChannels, plotContexts, defaultPointsPerSecond } = useAppSelector(state => state.groups);

    const [sensorService, setSensorService] = useSensorsService();
    const dispatch = useAppDispatch();
    const [plots] = usePlots();
    const [sensorContexts] = useSensorContexts();

    const plotStyles = groups.map(x => x.plotStyles).flat();
    
    //const allPlotChannels = groups.map(x => contexts.get(x.id)!.channelGroups.map(c => c.plotChannel)).flat();
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

        sensorContexts.set(allChannelsInfo.id, {
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

    const onPlotCreated = (key: number, plot: MyUPlotBase) => plots.set(key, plot)
    const onPlotDestroyed = (key: number, plot: MyUPlotBase) => plots.delete(key)
    const onLegengChanged = (key: number, legend: boolean) => dispatch(setLegend({plotId: key, value: legend}))
    const onHidedAxiesChanged = (key: number, hidedAxies: string[]) => dispatch(setAxisHide({plotId: key, hidedAxies: hidedAxies}))

    const allChannelGroups = Array.from(sensorContexts.values())
                                  .flatMap(sc => sc.channelGroups);
    const allPlotStyles = groups.flatMap(g => g.plotStyles);

    const contexts = plotContexts.map<PlotLayoutContext>(plotContext => {

        const plotChannelsIds = plotChannels.filter(p => p.plotId === plotContext.id).map(p => p.channelId);

        return {
            key: plotContext.id,
            hidedAxies: plotContext.hideAxes,
            order: plotContext.order,
            legend: plotContext.legend,
            pointsPerSecond: plotContext.pointsPerSecond,
            layoutPlotChannels: allChannelGroups.map(pc => pc.plotChannel).filter(pc => plotChannelsIds.includes(pc.id)),
            layoutPlotStyles: allPlotStyles.filter(ps => plotChannelsIds.includes(ps.id))
        }
    })

    return(
        <div className={styles.col} {...rest}>
            <PlotsLayout
                plotContexts={contexts}
                onPlotCreated={onPlotCreated} 
                onPlotDestroyed={onPlotDestroyed}
                onLegengChanged={onLegengChanged}
                onHidedAxiesChanged={onHidedAxiesChanged}
                ></PlotsLayout>
        </div>
    )
}