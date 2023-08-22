import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { AllChannelsInfo, CreateAllChannels } from "../Channel/AllChannelsFactory";
import { ChangeGroupColor } from "../Common/ColorHelpers";
import { sleep } from "../Common/Common";
import { CreateCsvFileDialog, FileWorker } from "../Common/FileHelpers";
import { SetupGroup } from "../Common/GroupHelpers";
import { SetupPlotManager } from "../Common/PlotManagerHelpers";
import { RecordigGroup, RecordManager } from "../ReportListener/RecordManager";
import { Snapshot } from "../ReportListener/Snapshot";
import { FullSensorInfo } from "../Sensor/SensorDefinitions";
import { SensorControllerArgs } from "../Sensor/SensorsManager/SensorsManager";
import { SensorWorker } from "../Sensor/SensorWorker";
import { ApplayLocalStorageSettingsForGroups, ApplySensorParameters as ApplaySensorStorageParameters } from "../Storage/ChannelsDataStorage";
import { PlotsManager } from "../uPlot/PlotManager";
import { GroupsContainer } from "./GroupsContainer";
import { NavbarContainer } from "../Containers/NavBarContainer/navbar";
import { PlotContainer } from "./PlotContainer";
import { useAppDispatch, useAppSelector, useRecordManager, useSensorsService } from "../hooks/hook";
import { pause, reset, setStreamingView } from "../store/uiSlice";
import { TestComponent } from "./testComponent";

export interface Props {
    currentSnapshot: Snapshot | undefined;

    resetUi: () => void
    showSnapshot: (snapshot: Snapshot) => void
    pause: () => void
    setStreamingView: () => void
}

interface PropsFromDispatchers {
    streaming: boolean;
    firstStart: boolean;
    viewingReport: boolean;
}

export interface Group {
    node: SensorNode;
    channelsInfo: AllChannelsInfo;
}

export interface SensorNode {
    fullSensorInfo: FullSensorInfo;
    worker: SensorWorker;
}

const App = () => {
    const [fileWorker] = useState<FileWorker>(new FileWorker());
    const [plotsManager, setPlotsManager] = useState<PlotsManager>();
    const [groups, setGroups] = useState<Group[]>([]);
    const [sensorService] = useSensorsService();
    const [recordController] = useRecordManager();
    const dispatch = useAppDispatch();
    
    const streaming = useAppSelector(state => state.ui.streaming)
    const firstStart = useAppSelector(state => state.ui.firstStart)
    const viewingReport = useAppSelector(state => state.ui.viewingReport)

    useEffect(() => {
        sensorService.onDispatch.addListener("Add", newSensorHandler);
    });

    const ploatReady = (plotManager: PlotsManager) => {
        SetupPlotManager(plotManager);
        plotManager.AddChannels([]);
        setPlotsManager(plotManager);
    };

    const sensorCloseHandler = async (sensorWorker: SensorWorker, args: string) => {
        let index = groups.findIndex((g) => g.node.worker === sensorWorker);
        console.debug("Removing sensor with id: ", groups[index].node.fullSensorInfo.SensorId);
        setGroups(groups.splice(index, 1));

        if (!streaming && firstStart) {
            plotsManager?.Rebuild();
        }

        //await this.props.sensorService.StopAll();
        //if (this.state.groups.length === 0) {
        //    this.setState({
        //        streaming: false,
        //    });
        //}

        //this.forceUpdate();
    };

    const sensorManualCloseHandler = async (sensorWorker: SensorWorker) => {
        console.debug("Manual closing sensor.");
        sensorService.RemoveSensor(sensorWorker);
    };

    const newSensorHandler = async (args: SensorControllerArgs) => {
        console.debug("Adding new sensor.");
        if (plotsManager) {
            let allChannelsInfo = CreateAllChannels(args.worker, args.fullSensorInfo);
            ChangeGroupColor(allChannelsInfo.channelGroups, groups.length);
            ApplayLocalStorageSettingsForGroups(allChannelsInfo.channelGroups, args.fullSensorInfo.SensorId);

            let group: Group = {
                channelsInfo: allChannelsInfo,
                node: {
                    fullSensorInfo: args.fullSensorInfo,
                    worker: args.worker,
                },
            };

            await ApplaySensorStorageParameters(group, args.fullSensorInfo.SensorId);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            dispatch(reset());
            setGroups([...groups, group])

            allChannelsInfo.PeackDetectedEvent.sub((channel, peakArgs) => {
                let group = allChannelsInfo.channelGroups.find((g) => g.plotChannel === channel);
                plotsManager?.ClearLabels();
                plotsManager?.AddLabelForChannel({
                    channel: channel,
                    time: peakArgs.time,
                    text: peakArgs.peakValue.toFixed(group?.cellChannel.Style.accuracy) + " " + group?.cellChannel.Style.unitsName,
                    value: peakArgs.peakValue,
                });
            });

            //this.setState((prev, props) => ({}));
            plotsManager.AddChannels(allChannelsInfo.channelGroups.map((g) => g.plotChannel));
            let recodingChannels: RecordigGroup[] = groups.map((g) => {
                return {
                    savingChannels: g.channelsInfo.channelGroups.map((cg) => cg.savingChannel),
                    sensorWorker: g.node.worker,
                };
            });

            recordController.SetChannels(recodingChannels);
            args.worker.onClose.sub(sensorCloseHandler);

            notification.success({
                message: `Добавлен датчик ${args.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }
    };

    const saveReport = async () => {
        await fileWorker.OpenFile();
        let snapshot = recordController.StopListening();
        if (fileWorker.File) await snapshot.ToFile(fileWorker.File);

        notification.success({
            message: `Данные записаны в файл ${fileWorker.File?.name}`,
            duration: 4,
        });
    };

     return(
         <>
            <TestComponent />
            {
                <NavbarContainer plotsManager={plotsManager} />
            }

            <div className="all">
                <div className="middle-container">
                    {viewingReport ? (
                        <></>
                    ) : (
                        <div className="left-container">
                            <GroupsContainer allowSettings={!streaming && firstStart} 
                                             plotsManager={plotsManager}
                                             groups={groups}
                                             sensorRemove={sensorManualCloseHandler} />
                        </div>
                    )}

                    <PlotContainer 
                    reportVieving={viewingReport} 
                    plotsManager={plotsManager} 
                    plotReady={ploatReady}></PlotContainer>
                </div>
            </div>,
        </>
    )
}
    
export default App;