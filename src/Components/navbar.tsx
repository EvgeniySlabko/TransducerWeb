
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

export interface Props {
    sensorService: SensorController,
	recordController: RecordController,
	plotViewController: () => ViewController | null
}

  interface IState {
	sensorService: SensorController,
	recordController: RecordController,
	plotViewController: () => ViewController | null

	clearBtnOn: boolean;
	playButtonStyle: string;
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
			playButtonStyle: "glyphicon-play" ,
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
			playButtonStyle: 'glyphicon-pause',
			clearBtnOn: false,
			
		  }));

		if (this.state.firstStart) 
		{
			this.setState((prev, props) => ({
					firstStart: false,
				}));

			await this.state.sensorService.SetT0();
		}

		await this.state.sensorService.StartAll();
		this.setState((prev, props) => ({
			startStop: true,
		}));
	}

	async stophandler()
	{
		await this.state.sensorService.StopAll();
		this.setState((prev, props) => ({
			clearBtnOn: true,
			playButtonStyle: 'glyphicon-play',
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
		catch(error)
		{
			console.log(error)  
		}
	}

	handleRecClick = async () => {
		this.state.recording ? await this.stopRecordingHandler() : this.startRecordingHandler();
	}

	async handleFakerClick() {
		let facker = new Facker();
		await this.state.sensorService.AddSensor(facker);
	}

	fileOpenHanle() {
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = async () => {

			if(input.files && input.files?.length != 1) return;
			let file = input.files?.item(0);
			if (!file) return;
			
			var snapshot = new Snapshot();
			await snapshot.FromFile(file);
			this.state.plotViewController()?.UploadSnapshot(snapshot);   
		};

		input.click();
	}

	render(){
		return (
			<ul className ="nav nav-tabs">
			<li className="nav-item" >
				<div className="control-buttons">
					<div className="btn-group mr-2" role="group" aria-label="First group">
						<button type="button" title="Начать измерение" className="btn btn-outline-primary" id="Start" onClick={this.handleStartClick}>
							<span id = "StartStopSpan" className={`glyphicon ${this.state.playButtonStyle}`}></span></button>
						<button type="button" title="Очистить результаты" disabled = {!this.state.clearBtnOn} className="btn btn-outline-primary" id="clear" onClick={this.handleClearClick}>
							<span id = "StartStopSpan" className= "glyphicon glyphicon-stop"></span></button>
						<button type="button" title="Добавить датчик" className="btn btn-outline-primary" id="open" onClick={this.handleAddClick}>
							<span id = "StartStopSpan" className="glyphicon glyphicon-plus"></span></button>
						<button type="button" title="Начать запись в файл" className="btn btn-outline-primary" id="StartRec" onClick={this.handleRecClick}>
							<span id = "StartStopSpan" className={`glyphicon glyphicon-record ${this.state.recordButtonStyle}`}></span></button>
					</div>
				</div>
			</li>

			<li className="nav-item" >
				<div className="zoom-buttons">
					<div className="btn-group mr-2" role="group" aria-label="First group">
						<button type="button" title="поднять выбранную ось вверх" className="btn btn-outline-primary" id="pushAxisUp"><span id = "StartStopSpan" className="glyphicon glyphicon-chevron-up"></span></button>
						<button type="button" title="поднять выбранную ось вверх" className="btn btn-outline-primary" id="pushAxisUp"><span id = "StartStopSpan" className="glyphicon glyphicon-chevron-down"></span></button>
					</div>
				</div>
			</li>
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
				<ul className="dropdown-menu">
				<li><button className="dropdown-item" id="Facker" onClick={this.handleFakerClick}>Add facker</button></li>
				<li><button id="file-input-button" onClick={this.handleOpenFile} >Open</button></li>
				</ul>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Link</a>
			</li>
			</ul>
		)
    }
  }


