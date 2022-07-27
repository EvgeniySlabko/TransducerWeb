import React from 'react';
import { Navbar } from './navbar';
import { GroupsContainer } from './GroupsContainer';
import { SensorController, SensorControllerArgs } from '../Sensor/SensorsManager/SensorsManager';
import { RecordManager } from '../ReportListener/RecordManager';
import { PlotsManager } from '../uPlot/plotsManager';
import { AllChannelsInfo, ChannelsGroup, CreateAllChannels } from '../Channel/AllChannelsFactory';
import { CellChannel, ChannelCloseArgs } from '../Channel/Channel/CellChannel';
import { PlotChannel } from '../Channel/Channel/PlotChannel';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISingleComponentSensor';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorWorker } from '../Sensor/SensorWorker';
import { notification } from 'antd';
import { Snapshot } from '../ReportListener/Snapshot';
import { CreateTxtFileDialog, getRandomInt } from '../Common/Common';
import { ParamsStorage } from '../Storage/Storage';
import { changeGroupColor } from '../Common/ChannelColorChanger';
import { SaveModal } from './SaveModal/SaveModal';
import { GetMinAvgFactor } from '../Common/SensorsHelpers';

export interface Props {
    sensorService: SensorController;
    recordController: RecordManager;
    storage: ParamsStorage;
}

export interface Group {
    node: SensorNode;
    channelsInfo: AllChannelsInfo
}

export interface SensorNode {
    sensor: ISingleComponentSensor,
    fullSensorInfo: FullSensorInfo
    worker: SensorWorker,
}

interface IState {
    groups: Group[],
    plotsManager?: PlotsManager;
    viewingReport: boolean;
    recording: boolean;
    saveDialog: boolean;
    streaming: boolean;
    currentSnapshot: Snapshot | undefined;
    firstStart: boolean;
    currentFile: FileSystemFileHandle | undefined;
}

export class App extends React.Component<Props, IState>
{
    //private plotViewController: ViewController | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            recording: false,
            plotsManager: undefined,
            groups: [],
            viewingReport: false,
            saveDialog: false,
            streaming: false,
            currentSnapshot: undefined,
            firstStart: true,
            currentFile: undefined
        }

        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.sensorManualCloseHandler = this.sensorManualCloseHandler.bind(this);
        this.props.sensorService.onDispatch.addListener("Add", this.newSensorHandler)
    }

    getGroupByPlotChannel = (channel: PlotChannel) => this.state.groups.find(g => g.channelsInfo.channelGroups.find(g => g.plotChannel == channel));
    getGroupByCellChannelChannel = (channel: CellChannel) => this.state.groups.find(g => g.channelsInfo.channelGroups.find(g => g.cellChannel == channel));
    getGroupBySensor = (sensor: ISingleComponentSensor) => this.state.groups.find(g => g.node.sensor == sensor);
    getGroupIndexBySensor = (sensor: ISingleComponentSensor) => this.state.groups.findIndex(g => g.node.sensor == sensor);
    getChannelsGroupBy = (predicate: (group: ChannelsGroup) => boolean): ChannelsGroup | undefined => {
        for (let i = 0; i < this.state.groups.length; i++) {
            for (let j = 0; j < this.state.groups[i].channelsInfo.channelGroups.length; j++) {
                if (predicate(this.state.groups[i].channelsInfo.channelGroups[j])) {
                    return this.state.groups[i].channelsInfo.channelGroups[j];
                }
            }
        }

        return undefined;
    }

    componentDidMount = () => {
        let plotController = new PlotsManager(document.getElementById('gd'));
        this.setState((prev, props) => ({
            plotsManager: plotController,
        }));
    }

    sensorCloseHandler = (sensor: ISingleComponentSensor, args: string) => {
        let index = this.getGroupIndexBySensor(sensor);
        this.state.groups.splice(index, 1);
        if (this.state.groups.length == 0) {
            if (this.state.recording)
                this.stopRecordingHandler();
            this.setState((prev, props) => ({
                streaming: false,
            }));
        }

        this.setState((prev, props) => ({}));
    }

    sensorManualCloseHandler = async (sensor: ISingleComponentSensor) => {
        this.props.sensorService.RemoveSensor(sensor);
        this.setState((prev, props) => ({}));
    }

    sensorClose = async (sensor: ISingleComponentSensor) => {
        sensor.onClose.unsub(this.sensorCloseHandler);
        let group = this.getGroupBySensor(sensor);
        await group?.node.worker.Close();
    }

    newSensorHandler = (args: SensorControllerArgs) => {
        if (this.state.plotsManager) {
            let allChannelsInfo = CreateAllChannels(args.sensor, args.fullSensorInfo, getRandomInt(10));
            changeGroupColor(allChannelsInfo.channelGroups, this.state.groups.length);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.setState((prev, props) => ({
                firstStart: true,
                groups: this.state.groups.concat([{
                    channelsInfo: allChannelsInfo,
                    node: {
                        fullSensorInfo: args.fullSensorInfo,
                        sensor: args.sensor,
                        worker: args.worker,
                    }
                }]
                )
            }));

            allChannelsInfo.absolutePeackDetected.sub((channel, peakArgs) => {
                let group = allChannelsInfo.channelGroups.find(g => g.plotChannel === channel)
                this.state.plotsManager?.ClearLabels();
                this.state.plotsManager?.AddLabelForChannel({
                    channel: channel,
                    time: peakArgs.time,
                    text: peakArgs.peakValue.toFixed(group?.cellChannel.Style.accurency) + " " + group?.cellChannel.Style.unitsName,
                    value: peakArgs.peakValue,
                })
            }
            )

            //this.setState((prev, props) => ({}));
            this.state.plotsManager.AddChannels(allChannelsInfo.channelGroups.map(g => g.plotChannel));
            let allSavingChannels: PlotChannel[] = [];

            this.state.groups.forEach(g => g.channelsInfo.channelGroups.forEach(c => allSavingChannels.push(c.savingChannel)));
            this.props.recordController.SetChannels(allSavingChannels);
            args.sensor.onClose.sub(this.sensorCloseHandler);

            notification.success({
                message: `Добавлен датчик ${args.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }
    }

    openFileHandler = async (file: File) => {
        var snapshot = new Snapshot();
        try {
            await snapshot.FromFile(file);
        }
        catch
        {
            notification.error({
                message: `Не удалось открыть отчет ${file.name}`,
                duration: 3,
            });

            return;
        }

        if (!this.state.viewingReport)
            this.state.groups.forEach(async (g) => this.props.sensorService.RemoveSensor(g.node.sensor));

        try {
            this.state.plotsManager?.UploadSnapshot(snapshot);
        }
        catch (ex) {
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
    }

    startRecordingHandler = async () => {
        try {
            this.props.recordController.StartListening();
            let currentFile = await CreateTxtFileDialog();

            this.setState((prev, props) => ({
                currentFile: currentFile,
            }));
        }
        catch (ex) {
            return;
        }

        this.setState((prev, props) => ({
            recording: true,
        }));
    }

    stopRecordingHandler = async () => {
        if (this.state.streaming)
            await this.stophandler();


        let snapshot = this.props.recordController.StopListening();
        if (this.state.currentFile) await snapshot.ToFile(this.state.currentFile);

        this.setState((prev, props) => ({
            recording: false,
            //saveDialog: true,
            streaming: false,
            currentSnapshot: snapshot,
        }));

    }

    handleRecClick = async () => {
        this.state.recording ? this.stopRecordingHandler() : this.startRecordingHandler();
    }

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
    }

    starthandler = async () => {
        let started = await this.props.sensorService.StartAll();
        if (!started) return;

        this.setState((prev, props) => ({
            streaming: true,
        }));

        if (this.state.firstStart) {
            this.setState((prev, props) => ({
                firstStart: false,
            }));

            await this.props.sensorService.SetT0();
        }

        this.setState((prev, props) => ({
            streaming: true,
        }));
    }

    stophandler = async () => {
        await this.props.sensorService.StopAll();
        this.setState(() => ({ streaming: false }));
    }

    handleStartClick = async () => {
        this.state.viewingReport ?

            this.setState((prev, props) => ({
                viewingReport: false,
            }))
            :
            this.state.streaming ? await this.stophandler() : await this.starthandler();
    }

    clear = () => {
        if (this.state.recording)
            this.stopRecordingHandler();

        this.setState(() => ({
            firstStart: true,
            recording: false,
        }));
    }

    export = () => this.setState(() => ({ saveDialog: true }));


    render() {
        return [
            <Navbar key={1}
                sensorService={this.props.sensorService}
                recordController={this.props.recordController}
                openReportCallback={async (file) => await this.openFileHandler(file)}
                enable={this.state.groups.length > 0}
                streaming={this.state.streaming}
                toggleStreaming={this.handleStartClick}
                groups={this.state.groups}
                reportVieving={this.state.viewingReport}
                clear={this.clear}
                export={this.export}
                toggleRecording={this.handleRecClick}
                recordingState={this.state.recording}
                setStreamingModeView={this.streamingModeViewHandler}
                plotsManager={this.state.plotsManager} />,

            <div key={2} className="all">
                <div className="middle-container">
                    {
                        this.state.viewingReport ? <></> :
                            <div className="left-container">
                                <GroupsContainer storage={this.props.storage}
                                    allowSettings={!this.state.streaming}
                                    plotsManager={this.state.plotsManager}
                                    groups={this.state.groups}
                                    sensorRemove={this.sensorManualCloseHandler} />
                            </div>
                    }
                    <div id="gd" className="plot" />
                </div>
            </div>,

            <SaveModal key={3}
                onClose={() => this.setState({ saveDialog: false })}
                maxAvgFactor={async () => await GetMinAvgFactor(this.state.groups.map(g => g.node.sensor))}
                snapshot={this.state.currentSnapshot}
                visible={this.state.saveDialog} />
        ]
    }
}
