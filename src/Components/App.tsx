import React from 'react';
import { Navbar } from './navbar';
import { GroupsContainer } from './GroupsContainer';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { RecordController } from '../RecordController';
import {  ViewController } from '../ViewsControllers/PlotViewController';
import { AllChannelsInfo, ChannelsGroup, CreateAllChannels } from '../Channel/AllChannelsFactory';
import { CellChannel, ChannelCloseArgs } from '../Channel/Channel/CellChannel';
import { Channel } from '../Channel/Channel/Channel';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorWorker } from '../Sensor/SensorWorker';
import { notification } from 'antd';
import { Snapshot } from '../ReportListener/Snapshot';
import { getRandomInt } from '../Common/Common';
import { PlotPeackController } from '../ViewsControllers/PeacksController';
import { ParamsStorage } from '../Storage/Storage';
import { changeGroupColor } from '../Common/ChannelColorChanger';
import { SaveModal } from './SaveModal';
import { GetMinAvgFactor } from '../Common/SensorsHelpers';

export interface Props {
    sensorService: SensorController;
    recordController: RecordController;
    storage: ParamsStorage;
}

export interface Group{
    node: SensorNode;
    channelsInfo: AllChannelsInfo
  }

export interface SensorNode{
    sensor: ISingleComponentSensor,
    fullSensorInfo: FullSensorInfo
    worker: SensorWorker,
}

interface IState {
    groups: Group[],
    plotViewController: ViewController | null;
    peackController: PlotPeackController | null;
    viewingReport: boolean;
    recording: boolean;
    saveDialog: boolean;
    currentSnapshot: Snapshot | undefined;
}

export class App extends React.Component<Props, IState>
{
    //private plotViewController: ViewController | undefined;

    constructor(props: Props)
    {
        super(props);

        this.state = {
            recording: false,
            plotViewController: null,
            peackController: null,
            groups: [],
            viewingReport: false,
            saveDialog: false,
            currentSnapshot: undefined,
        }

        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.sensorManualCloseHandler = this.sensorManualCloseHandler.bind(this);
        this.props.sensorService.onDispatch.addListener("Add", this.NewSensorHandler)
    }

    getGroupByPlotChannel = (channel: Channel) => this.state.groups.find(g => g.channelsInfo.channelGroups.find(g => g.plotChannel == channel));
    getGroupByCellChannelChannel = (channel: CellChannel) => this.state.groups.find(g => g.channelsInfo.channelGroups.find(g => g.cellChannel == channel));
    getGroupBySensor = (sensor: ISingleComponentSensor) => this.state.groups.find(g => g.node.sensor == sensor);
    getGroupIndexBySensor = (sensor: ISingleComponentSensor) => this.state.groups.findIndex(g => g.node.sensor == sensor);
    getChannelsGroupBy = (predicate: (group: ChannelsGroup) => boolean) : ChannelsGroup | undefined =>
    {
        for (let i = 0; i < this.state.groups.length; i++) {
            for (let j = 0; j < this.state.groups[i].channelsInfo.channelGroups.length; j++) {
                if (predicate(this.state.groups[i].channelsInfo.channelGroups[j]))
                {
                    return this.state.groups[i].channelsInfo.channelGroups[j];
                }
            }
        }

        return undefined;
    }

    componentDidMount() {
        let plotController = new ViewController(document.getElementById('gd'));
        this.setState((prev, props) => ({
            plotViewController: plotController,
            peackController: new PlotPeackController(plotController)
        }));
    }

    sensorCloseHandler = (sensor: ISingleComponentSensor, args: string) =>
    {
        let index = this.getGroupIndexBySensor(sensor);
        this.state.groups.splice(index, 1);
        if (this.state.groups.length == 0)
        {
            if (this.state.recording)
                this.stopRecordingHandler();
        }

        this.setState((prev, props) => ({}));
    }

    sensorManualCloseHandler = async (sensor: ISingleComponentSensor) =>
    {
        this.props.sensorService.RemoveSensor(sensor);
        this.setState((prev, props) => ({}));
    }

    sensorClose = async (sensor: ISingleComponentSensor) => {
        sensor.onClose.unsub(this.sensorCloseHandler);
        let group = this.getGroupBySensor(sensor);
        await group?.node.worker.Close();
    }
    
    NewSensorHandler = (args: SensorControllerArgs) =>
    {
        if (this.state.plotViewController)
        {
            let allChannelsInfo = CreateAllChannels(args.sensor, args.fullSensorInfo, getRandomInt(10));
            changeGroupColor(allChannelsInfo.channelGroups, this.state.groups.length);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.setState((prev, props) => ({
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

            allChannelsInfo.absolutePeackDetected.sub((channel, peakArgs) =>
            {
                let group = allChannelsInfo.channelGroups.find(g => g.plotChannel === channel)
                this.state.plotViewController?.ClearLabels();
                this.state.plotViewController?.AddLabelForChannel({
                    channel: channel,
                    time: peakArgs.time,
                    text: peakArgs.peakValue.toFixed(group?.cellChannel.Style.accurency) + " " + group?.cellChannel.Style.unitsName,
                    value: peakArgs.peakValue,
                })
            } 
            )

            allChannelsInfo.peackDetected.sub((channel, args) =>
            {
                this.state.peackController?.AddPeack(channel, args);
            })

            //this.setState((prev, props) => ({}));
            this.state.plotViewController.AddChannels(allChannelsInfo.channelGroups.map(g => g.plotChannel));
            let allSavingChannels: Channel[] = [];

            this.state.groups.forEach(g => g.channelsInfo.channelGroups.forEach(c => allSavingChannels.push(c.savingChannel)));
            this.props.recordController.SetChannels(allSavingChannels);
            args.sensor.onClose.sub(this.sensorCloseHandler);

            notification.success({
                message: `Добавлен датчик ${args.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }
    }

    OpenFileHandler = async (file: File)  =>
    {
        var snapshot = new Snapshot();
        await snapshot.FromFile(file);
        if (!this.state.viewingReport)
        {
            this.state.groups.forEach(async (g) => this.props.sensorService.RemoveSensor(g.node.sensor));
        }

        try{
            this.state.plotViewController?.UploadSnapshot(snapshot); 
        }
        catch(ex)
        {
            notification.error({
                message: `Не удалось открыть отчет: ${ex}`,
                duration: 3,
            });
            return;
        }
        
        this.setState((prev, props) => ({
            viewingReport: true,
        }));

        notification.success({
            message: `Просмотр отчета ${file.name}`,
            duration: 2,
        });
    }
    
    async startRecordingHandler()
	{
		try{
			this.props.recordController.StartListening();
		}
		catch(ex)
		{
			
		}

		this.setState((prev, props) => ({
			recording: true,
		}));
	}
	
	stopRecordingHandler()
	{
        let snapshot = this.props.recordController.StopListening();
		this.setState((prev, props) => ({
			recording: false,
            saveDialog: true,
            currentSnapshot: snapshot,
		}));
		
		//saveStaticDataToFile(snapshot);
	}
	
	handleRecClick = async () => {
		this.state.recording ? this.stopRecordingHandler() : this.startRecordingHandler();
	}

    streamingModeViewHandler = () =>
    {
        this.state.plotViewController?.Reset();
        this.setState((prev, props) => ({
            viewingReport: false,
        }));

        notification.success({
            message: "Режим графика реального времени.",
            duration: 2,
        });
    }
    
    render(){
        return [
            <Navbar key = {1} sensorService={this.props.sensorService} 
                    recordController={this.props.recordController}
                    openReportCallback = { async (file) => await this.OpenFileHandler(file)}
                    ThereAreConnectedSensors = {() => this.state.groups.length > 0}
                    groups = {this.state.groups}
                    toggleRecording = {this.handleRecClick}
                    recordingState = {() => this.state.recording}
                    setStreamingModeView = { this.streamingModeViewHandler }
                    plotViewController={this.state.plotViewController}></Navbar>,
                    
            <div key = {2} className = "all">
                <div className="middle-container">
                    {
                        this.state.viewingReport ? <></> :
                        <div className="left-container">
                            <GroupsContainer 
                            storage={this.props.storage}
                            peackController={this.state.peackController}
                            plotViewController={this.state.plotViewController}
                            groups = {this.state.groups} 
                            sensorRemove = {this.sensorManualCloseHandler}
                            />
                        </div>
                    }


                    <div id="gd" className="plot"></div>
                </div>
            </div>,

            <SaveModal 
                key={3}
                onClose={() => this.setState((prev, props) => ({saveDialog: false}))}
                maxAvgFactor={async () => await GetMinAvgFactor(this.state.groups.map(g => g.node.sensor))}
                snapshot = {this.state.currentSnapshot}
                visible = {this.state.saveDialog}
            ></SaveModal>
        ]
    }
}
