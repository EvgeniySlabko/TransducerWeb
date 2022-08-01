import { notification } from 'antd';
import React from 'react';
import { AllChannelsInfo, CreateAllChannels } from '../Channel/AllChannelsFactory';
import { changeGroupColor } from '../Common/ChannelColorChanger';
import { getRandomInt } from '../Common/Common';
import { GetMinAvgFactor } from '../Common/SensorsHelpers';
import { FileWorker } from '../Files/FileWorker';
import { RecordigGroup, RecordManager } from '../ReportListener/RecordManager';
import { Snapshot } from '../ReportListener/Snapshot';
import { SensorController, SensorControllerArgs } from '../Sensor/SensorsManager/SensorsManager';
import { SensorWorker } from '../Sensor/SensorWorker';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISingleComponentSensor';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { ParamsStorage } from '../Storage/AppStorage';
import { ApplayLocalStorageSettingsForGroups, ApplySensorParameters as ApplaySensorStorageParameters } from '../Storage/ChannelsDataStorage';
import { PlotsManager } from '../uPlot/PlotManager';
import { GroupsContainer } from './GroupsContainer';
import { Navbar } from './navbar';
import { SaveModal } from './SaveModal/SaveModal';

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
}

export class App extends React.Component<Props, IState>
{
    private fileWorker: FileWorker = new FileWorker();

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
        }

        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.sensorManualCloseHandler = this.sensorManualCloseHandler.bind(this);
        this.props.sensorService.onDispatch.addListener("Add", this.newSensorHandler)
    }

    componentDidMount = () => {
        let plotController = new PlotsManager(document.getElementById('gd'));
        this.setState((prev, props) => ({
            plotsManager: plotController,
        }));
    }

    sensorCloseHandler = async (sensor: ISingleComponentSensor, args: string) => {
        let index = this.state.groups.findIndex(g => g.node.sensor == sensor);
        this.state.groups.splice(index, 1);
        if (this.state.recording)
        {
            await this.stopRecordingHandler();
        }
        if (this.state.groups.length == 0) {
            this.setState((prev, props) => ({
                streaming: false,
            }));
        }

        this.setState((prev, props) => ({}));
    }

    sensorManualCloseHandler = async (sensor: ISingleComponentSensor) => {
        this.props.sensorService.RemoveSensor(sensor);
    }

    sensorClose = async (sensor: ISingleComponentSensor) => {
        if (this.state.recording)
            this.handleRecClick();

        let group = this.state.groups.find(g => g.node.sensor == sensor);
        await group?.node.worker.Close();
    }

    newSensorHandler = async (args: SensorControllerArgs) => {
        if (this.state.plotsManager) {
            let allChannelsInfo = CreateAllChannels(args.sensor, args.fullSensorInfo, getRandomInt(10));
            changeGroupColor(allChannelsInfo.channelGroups, this.state.groups.length);
            ApplayLocalStorageSettingsForGroups(allChannelsInfo.channelGroups, args.fullSensorInfo.SensorId);
            
            let group : Group ={
                channelsInfo: allChannelsInfo,
                node: {
                    fullSensorInfo: args.fullSensorInfo,
                    sensor: args.sensor,
                    worker: args.worker,
                }
            } 

            await ApplaySensorStorageParameters(group, args.fullSensorInfo.SensorId);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.setState((prev, props) => ({
                firstStart: true,
                groups: this.state.groups.concat([group]
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
            let recodingChannels: RecordigGroup[] = this.state.groups.map(g => 
                {
                    return {
                        savingChannels: g.channelsInfo.channelGroups.map(cg => cg.savingChannel),
                        sensor: g.node.sensor,
                    }
                });

            this.props.recordController.SetChannels(recodingChannels);
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

        if (!this.state.viewingReport) this.state.groups.forEach(async (g) => this.props.sensorService.RemoveSensor(g.node.sensor));

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
            this.fileWorker.OpenFile();
        }
        catch (ex) {
            this.props.recordController.StopListening();
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
        if (this.fileWorker.File) 
            await snapshot.ToFile(this.fileWorker.File);

        notification.success({
            message: `Данные записаны в файл ${this.fileWorker.File?.name}`,
            duration: 4,
        });
        this.setState((prev, props) => ({
            recording: false,
            streaming: false,
            currentSnapshot: snapshot,
        }));

    }

    handleRecClick = async () => {
        this.state.recording ? await this.stopRecordingHandler() : this.startRecordingHandler();
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

    clear = async () => {
        if (this.state.recording)
            await this.stopRecordingHandler();

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
                toggleRecording={() => this.handleRecClick().then()}
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
