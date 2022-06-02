import React from 'react';
import { Navbar } from './navbar';
import { GroupsContainer } from './GroupsContainer';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { RecordController } from '../RecordController';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { CreateAllChannels } from '../Channel/AllChannelsFactory';
import { CellChannel, ChannelCloseArgs } from '../Channel/Channel/CellChannel';
import { Channel } from '../Channel/Channel/Channel';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorWorker } from '../Sensor/SensorWorker';
import { notification } from 'antd';
import { Snapshot } from '../ReportListener/Snapshot';


export interface Props {
    sensorService: SensorController;
    recordController: RecordController;
}

export interface Group{
    node: SensorNode;
    channels: CellChannel[],
  }

export interface SensorNode{
    sensor: ISingleComponentSensor,
    fullSensorInfo: FullSensorInfo
    worker: SensorWorker,
    setOffset: (offset: number) => void,
    setCurrentOffsetValue: () => number,
}

interface IState {
    groups: Group[],
    plotViewController: ViewController | null;
    savingChannels: Channel[];
    plotChannels: Channel[];
    viewingReport: boolean;
    recording: boolean;
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
            plotChannels: [],
            savingChannels: [],
            groups: [],
            viewingReport: false
        }

        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.sensorManualCloseHandler = this.sensorManualCloseHandler.bind(this);
        this.props.sensorService.onDispatch.addListener("Add", this.NewSensorHandler)
    }

    componentDidMount() {
        this.setState((prev, props) => ({
            plotViewController: new ViewController(document.getElementById('gd')),
        }));
    }

    plotChannelCloseHandler = (channel: Channel, channelCloseArgs: ChannelCloseArgs)=>
    {
      let index = this.state.plotChannels.findIndex(c => c === channel);
      this.state.plotChannels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    savingChannelCloseHandler = (channel: Channel, channelCloseArgs: ChannelCloseArgs) =>
    {
      let index = this.state.savingChannels.findIndex(c => c == channel);
      this.state.savingChannels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    sensorCloseHandler = (sensor: ISingleComponentSensor, args: string) =>
    {
         let index = this.state.groups.findIndex(c => c.node.sensor == sensor);
        this.state.groups.splice(index, 1);
        if (this.state.groups.length == 0)
        {
                if (this.state.recording)
                    this.stopRecordingHandler();
        }

        this.setState((prev, props) => ({
        }));
    }

    sensorManualCloseHandler = async (sensor: ISingleComponentSensor) =>
    {
        this.props.sensorService.RemoveSensor(sensor);
        this.setState((prev, props) => ({
        }));
    }

    sensorClose = async (sensor: ISingleComponentSensor) => {
        sensor.onClose.unsub(this.sensorCloseHandler);
        await sensor.CloseConnection();
        let index = this.state.groups.findIndex(c => c.node.sensor == sensor);
        this.state.groups.splice(index, 1);
        this.setState((prev, props) => ({
        }));
    }

    NewSensorHandler = (args: SensorControllerArgs) =>
    {
        if (this.state.plotViewController)
        {
            let allChannelsInfo = CreateAllChannels(args.sensor, args.fullSensorInfo);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.setState((prev, props) => ({
                plotChannels: this.state.plotChannels.concat(allChannelsInfo.plotChannels),
                savingChannels: this.state.savingChannels.concat(allChannelsInfo.savingChannels),
                groups: this.state.groups.concat([{
                    channels: allChannelsInfo.cellChannels,
                    node: {
                        fullSensorInfo: args.fullSensorInfo,
                        sensor: args.sensor,
                        worker: args.worker,
                        setCurrentOffsetValue: allChannelsInfo.currentValueOffsetSetter,
                        setOffset: allChannelsInfo.offsetSetter
                    }
                    
                }])
            }));

            this.state.plotViewController.AddChannels(allChannelsInfo.plotChannels);

            this.props.recordController.SetChannels(allChannelsInfo.savingChannels);

            allChannelsInfo.plotChannels.forEach(channel =>  { channel.onClose.sub(this.plotChannelCloseHandler);});
            allChannelsInfo.savingChannels.forEach(channel =>  { channel.onClose.sub(this.savingChannelCloseHandler) ;});
            //allChannelsInfo.cellChannels.forEach(channel =>  { channel.onClose.sub(this.cellChannelCloseHandler);});
            
            args.sensor.onClose.sub(this.sensorCloseHandler);

            this.props.recordController.SetChannels(this.state.savingChannels);

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
		var snapshot = this.props.recordController.StopListening();
		
		this.setState((prev, props) => ({
			recording: false,
		}));
		
		snapshot.ToFile();
		//saveStaticDataToFile(snapshot);
	}
	
	handleRecClick = async () => {
		this.state.recording ? this.stopRecordingHandler() : this.startRecordingHandler();
	}

    render(){
        return [
            <Navbar key = {1} sensorService={this.props.sensorService} 
                    recordController={this.props.recordController}
                    openReportCallback = { async (file) => await this.OpenFileHandler(file)}
                    ThereAreConnectedSensors = {() => this.state.groups.length > 0}
                    toggleRecording = {this.handleRecClick}
                    recordingState = {() => this.state.recording}
                    setStreamingModeView = { () => 
                        {
                            this.state.plotViewController?.Reset();
                            this.setState((prev, props) => ({
                                viewingReport: false,
                            }));

                            notification.success({
                                message: "Режим графика реального времени.",
                                duration: 2,
                            });
                        }}
                    
                    plotViewController={this.state.plotViewController}></Navbar>,
                    
            <div key = {2} className = "all">
                <div className="middle-container">

                    {
                        this.state.viewingReport ? <></> :
                        <div className="left-container">
                            <GroupsContainer groups={ this.state.groups}
                            sensorRemove = {this.sensorManualCloseHandler}
                            />
                        </div>
                    }

                    <div id="gd" className="plot"></div>
                </div>
            </div>
        ]
    }
}
