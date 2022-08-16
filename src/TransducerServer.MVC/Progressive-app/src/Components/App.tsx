import { notification } from "antd";
import React from "react";
import { AllChannelsInfo, CreateAllChannels } from "../Channel/AllChannelsFactory";
import { ChangeGroupColor } from "../Common/ColorHelpers";
import { sleep } from "../Common/Common";
import { CreateCsvFileDialog, FileWorker } from "../Common/FileHelpers";
import { SetupGroup } from "../Common/GroupHelpers";
import { SetupPlotManager } from "../Common/PlotManagerHelpers";
import { RecordigGroup, RecordManager } from "../ReportListener/RecordManager";
import { Snapshot } from "../ReportListener/Snapshot";
import { FullSensorInfo } from "../Sensor/SensorDefinitions";
import { SensorController, SensorControllerArgs } from "../Sensor/SensorsManager/SensorsManager";
import { SensorWorker } from "../Sensor/SensorWorker";
import { ApplayLocalStorageSettingsForGroups, ApplySensorParameters as ApplaySensorStorageParameters } from "../Storage/ChannelsDataStorage";
import { PlotsManager } from "../uPlot/PlotManager";
import { GroupsContainer } from "./GroupsContainer";
import { Navbar } from "./navbar";

export interface Props {
    sensorService: SensorController;
    recordController: RecordManager;
}

export interface Group {
    node: SensorNode;
    channelsInfo: AllChannelsInfo;
}

export interface SensorNode {
    fullSensorInfo: FullSensorInfo;
    worker: SensorWorker;
}

interface IState {
    groups: Group[];
    plotsManager?: PlotsManager;
    viewingReport: boolean;
    streaming: boolean;
    currentSnapshot: Snapshot | undefined;
    firstStart: boolean;
}

export class App extends React.Component<Props, IState> {
    private fileWorker: FileWorker = new FileWorker();

    constructor(props: Props) {
        super(props);

        this.state = {
            plotsManager: undefined,
            groups: [],
            viewingReport: false,
            streaming: false,
            currentSnapshot: undefined,
            firstStart: true,
        };

        this.props.sensorService.onDispatch.addListener("Add", this.newSensorHandler);
    }

    componentDidMount = () => {
        let plotsManager = new PlotsManager(document.getElementById("gd"));
        SetupPlotManager(plotsManager);
        this.setState((prev, props) => ({
            plotsManager: plotsManager,
        }));
    };

    sensorCloseHandler = async (sensorWorker: SensorWorker, args: string) => {
        let index = this.state.groups.findIndex((g) => g.node.worker == sensorWorker);
        this.state.groups.splice(index, 1);

        if (!this.state.streaming && this.state.firstStart) {
            this.state.plotsManager?.Rebuild();
        }

        if (this.state.groups.length == 0) {
            this.setState({
                streaming: false,
            });
        }

        this.forceUpdate();
    };

    sensorManualCloseHandler = async (sensorWorker: SensorWorker) => {
        this.props.sensorService.RemoveSensor(sensorWorker);
    };

    newSensorHandler = async (args: SensorControllerArgs) => {
        if (this.state.plotsManager) {
            let allChannelsInfo = CreateAllChannels(args.worker, args.fullSensorInfo);
            ChangeGroupColor(allChannelsInfo.channelGroups, this.state.groups.length);
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
            this.setState((prev, props) => ({
                firstStart: true,
                groups: this.state.groups.concat([group]),
            }));

            allChannelsInfo.PeackDetectedEvent.sub((channel, peakArgs) => {
                let group = allChannelsInfo.channelGroups.find((g) => g.plotChannel === channel);
                this.state.plotsManager?.ClearLabels();
                this.state.plotsManager?.AddLabelForChannel({
                    channel: channel,
                    time: peakArgs.time,
                    text: peakArgs.peakValue.toFixed(group?.cellChannel.Style.accuracy) + " " + group?.cellChannel.Style.unitsName,
                    value: peakArgs.peakValue,
                });
            });

            //this.setState((prev, props) => ({}));
            this.state.plotsManager.AddChannels(allChannelsInfo.channelGroups.map((g) => g.plotChannel));
            let recodingChannels: RecordigGroup[] = this.state.groups.map((g) => {
                return {
                    savingChannels: g.channelsInfo.channelGroups.map((cg) => cg.savingChannel),
                    sensorWorker: g.node.worker,
                };
            });

            this.props.recordController.SetChannels(recodingChannels);
            args.worker.onClose.sub(this.sensorCloseHandler);

            notification.success({
                message: `Добавлен датчик ${args.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }
    };

    openFileHandler = async (file: File) => {
        var snapshot = new Snapshot();
        try {
            await snapshot.FromFile(file);
        } catch {
            notification.error({
                message: `Не удалось открыть отчет ${file.name}`,
                duration: 3,
            });

            return;
        }

        if (!this.state.viewingReport) this.state.groups.forEach(async (g) => this.props.sensorService.RemoveSensor(g.node.worker));

        try {
            this.state.plotsManager?.UploadSnapshot(snapshot);
        } catch (ex) {
            notification.error({
                message: `Не удалось отобразить отчет: ${ex}`,
                duration: 3,
            });

            return;
        }

        this.setState((prev, props) => ({
            viewingReport: true,
            currentSnapshot: snapshot,
        }));

        notification.success({
            message: `Просмотр отчета ${file.name}`,
            duration: 2,
        });
    };

    streamingModeViewHandler = () => {
        this.state.plotsManager?.Reset();
        this.state.plotsManager?.SetChannels([]);
        this.setState((prev, props) => ({
            viewingReport: false,
            streaming: false,
            firstStart: true,
        }));

        notification.info({
            message: "Режим графика реального времени.",
            duration: 4,
        });
    };

    starthandler = async (): Promise<void> => {
        await this.props.recordController.StartListening();
        if (this.state.firstStart) {
            this.setState((prev, props) => ({
                firstStart: false,
            }));

            await this.props.sensorService.SetT0();
        }

        await this.props.sensorService.StartAll();

        SetupGroup(this.state.groups, this.state.plotsManager as PlotsManager); //настраиваем выравнивание даных согласно сетке графика.

        this.setState((prev, props) => ({
            streaming: true,
        }));
    };

    stophandler = async () => {
        await this.props.sensorService.StopAll();

        this.setState(() => ({ streaming: false }));
    };

    handleStartClick = async (): Promise<void> => {
        this.state.viewingReport
            ? this.setState((prev, props) => ({
                  viewingReport: false,
              }))
            : this.state.streaming
            ? await this.stophandler()
            : await this.starthandler();
    };

    clear = async () => {
        if (this.state.streaming) {
            await this.stophandler();
            await sleep(100);
        }
        this.state.plotsManager?.Clear();
        this.state.plotsManager?.ClearLabels();
        this.state.plotsManager?.RebuildIfNessesary();
        this.state.groups.forEach((g) => g.channelsInfo.resetPeackAnalizer());

        this.setState(() => ({
            firstStart: true,
        }));
    };

    saveReport = async () => {
        await this.fileWorker.OpenFile();
        let snapshot = this.props.recordController.StopListening();
        if (this.fileWorker.File) await snapshot.ToFile(this.fileWorker.File);

        notification.success({
            message: `Данные записаны в файл ${this.fileWorker.File?.name}`,
            duration: 4,
        });
    };

    onCSVDownload = async () => {
        let currentFile = await CreateCsvFileDialog();
        this.state.currentSnapshot?.ToCSV(currentFile);
    };

    render() {
        return [
            <Navbar key={1} allowSettings={!this.state.streaming && this.state.firstStart} thereAreDataForSaving={this.props.recordController.thereIsData} saveReport={this.saveReport} sensorService={this.props.sensorService} recordController={this.props.recordController} openReportCallback={this.openFileHandler} enable={this.state.groups.length > 0} streaming={this.state.streaming} toggleStreaming={this.handleStartClick} groups={this.state.groups} reportVieving={this.state.viewingReport} clear={this.clear} exportCsv={this.onCSVDownload} setStreamingModeView={this.streamingModeViewHandler} plotsManager={this.state.plotsManager} />,

            <div key={2} className="all">
                <div className="middle-container">
                    {this.state.viewingReport ? (
                        <></>
                    ) : (
                        <div className="left-container">
                            <GroupsContainer allowSettings={!this.state.streaming && this.state.firstStart} plotsManager={this.state.plotsManager} groups={this.state.groups} sensorRemove={this.sensorManualCloseHandler} />
                        </div>
                    )}
                    <div id="gd" className="plot" />
                </div>
            </div>,
        ];
    }
}
