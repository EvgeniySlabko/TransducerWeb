
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React, { useState } from 'react';
import { CreateSerialSensor } from '../SensorFactory';
import { SensorController } from '../SensorController';
import { Facker } from '../Sensor/SingleComponentSensor.ts/FackerSensor';
import { Channel } from '../Channel/Channel/Channel';
import { CreateAllSensorChannelsSaving } from '../Channel/Channel/ChannelFactory';
import { RecordController } from '../RecordController';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { Snapshot } from '../ReportListener/Snapshot';
import { Button, Dropdown, Menu, notification } from 'antd';
import { AimOutlined, BarsOutlined, BorderOutlined, CaretRightFilled, CaretRightOutlined, DownloadOutlined, PauseOutlined, PlusCircleOutlined } from '@ant-design/icons';

export interface Props {
    sensorService: SensorController,
	recordController: RecordController,
	plotViewController: () => ViewController | null
	isStreamingCallback: (stream: boolean) => void
}

  interface IState {
	sensorService: SensorController,
	recordController: RecordController,
	plotViewController: () => ViewController | null

	clearBtnOn: boolean;
	playButtonState: boolean;
	recordButtonStyle: string;
	reecording: boolean;
	startStop: boolean;
	firstStart: boolean;
	recording: boolean;
  }

  export class Navbar extends React.Component<Props, IState>
  {

	constructor(prop: Props)
	{
		super(prop);

		this.state = {
			sensorService: this.props.sensorService,
			recordController: this.props.recordController,
			plotViewController: this.props.plotViewController,

			clearBtnOn: true,
			playButtonState: true,
			recordButtonStyle: "text-primary",
			reecording: false,
			startStop: false,
			firstStart: true,
			recording: false,
		  };

		this.handleStartClick = this.handleStartClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
		this.handleFakerClick = this.handleFakerClick.bind(this);
	}
	
	starthandler = async () =>
	{
		let started = await this.state.sensorService.StartAll();
		if (!started) return;

		this.setState((prev, props) => ({
			playButtonState: false,
			clearBtnOn: false,
			
		  }));

		if (this.state.firstStart) 
		{
			this.setState((prev, props) => ({
					firstStart: false,
				}));

			await this.state.sensorService.SetT0();
		}

		this.setState((prev, props) => ({
			startStop: true,
		}));
	}

	async stophandler()
	{
		await this.state.sensorService.StopAll();
		this.setState((prev, props) => ({
			clearBtnOn: true,
			playButtonState: true,
			startStop: false,
		  }));
	}

	async startRecordingHandler()
	{
		this.state.recordController.StartListening();

		this.setState((prev, props) => ({
			recordButtonStyle: "text-danger",
			recording: true,
		  }));
	}

	async stopRecordingHandler()
	{
		var snapshot = this.state.recordController.StopListening();

		this.setState((prev, props) => ({
			recordButtonStyle: "text-primary",
			recording: false,
		  }));

		snapshot.ToFile();
		//saveStaticDataToFile(snapshot);
	}

	handleOpenFile = async () =>{
		
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = async () => {
			if(input.files && input.files?.length != 1) return;
				let file = input.files?.item(0);
			if (!file) return;
			
			var snapshot = new Snapshot();
			await snapshot.FromFile(file);
			this.state.plotViewController()?.UploadSnapshot(snapshot);  
			this.props.isStreamingCallback(false); 
			notification.success({
                message: `Просмотр отчета ${file.name}`,
                duration: 2,
            });
		};

		input.click();
	}

	handleStartClick = async () => {
		this.state.startStop ? await this.stophandler() : await this.starthandler();
	}

	handleClearClick() {

		this.state.plotViewController()?.Clear();
		this.setState((prev, props) => ({
			firstStart: true,
		}));
	}

	private async handleAddClick() {
		try
		{
			let port = await navigator.serial.requestPort();    //запрашиваем выбор порта у пользователя
			var sensor = await CreateSerialSensor(port);
			await this.state.sensorService.AddSensor(sensor);
		}
		catch(e: any)
		{
			if (e instanceof DOMException){
				//console.log('out of range');
			} else { 
				notification.error({
					message: e,
					duration: 2,
				});
			}		
		}
	}

	handleRecClick = async () => {
		this.state.recording ? await this.stopRecordingHandler() : this.startRecordingHandler();
	}

	async handleFakerClick() {
		let facker = new Facker();
		await this.state.sensorService.AddSensor(facker);
	}

	render(){
		return (
			<ul className ="nav-tabs">
				<div className="control-buttons">
					<div className="btn-group" role="group" aria-label="First group">
						<Button title="Начать измерение" size='large' id="Start" shape="default" 
						icon = {this.state.playButtonState ?  <CaretRightOutlined/> : <PauseOutlined />} onClick={this.handleStartClick}></Button>
						<Button title="Очистить результаты" size='large' disabled = {!this.state.clearBtnOn} id="clear" shape="default"  icon={<BorderOutlined />} onClick={this.handleClearClick}></Button>
						<Button title="Добавить датчик" size='large' disabled = {!this.state.clearBtnOn} id="open" shape="default"  icon={<PlusCircleOutlined />} onClick={this.handleAddClick}></Button>
						<Button title="Начать запись в файл" size='large' id="StartRec" icon={<AimOutlined />} shape="default"  onClick={this.handleRecClick}></Button>
						<Dropdown overlay=
						{
							<Menu
								items={[
								{
									key: '1',
									label: (
									<a onClick={this.handleFakerClick} target="_blank" rel="noopener noreferrer">
										Add faker
									</a>
									),
								},
								{
									key: '2',
									label: (
									<a onClick={this.handleOpenFile} target="_blank" rel="noopener noreferrer">
										Открыть очет
									</a>
									),
								},
								]}
							/>
						} arrow>
							<Button size='large' icon={<BarsOutlined />}></Button>
						</Dropdown>
					</div>
				</div>
			</ul>
		)
    }
  }