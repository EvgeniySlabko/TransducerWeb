
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React, { useState } from 'react';
import { CreateSerialSensor } from '../SensorFactory';
import { SensorController } from '../SensorController';
import { Facker } from '../Sensor/SingleComponentSensor.ts/FackerSensor';
import { Channel } from '../Channel/Channel/Channel';
import { RecordController } from '../RecordController';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { Snapshot } from '../ReportListener/Snapshot';
import { Button, Dropdown, Menu, notification } from 'antd';
import { AimOutlined, ArrowLeftOutlined, BarsOutlined, BorderOutlined, CameraOutlined, CaretRightFilled, CaretRightOutlined, DownloadOutlined, FolderOpenOutlined, PauseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Group } from './App';

export interface Props {
    sensorService: SensorController,
	recordController: RecordController,
	plotViewController? : ViewController,
	groups: Group[],
	recordingState: boolean;
	enable: boolean
	streaming: boolean,
	reportVieving: boolean,


	clear: () => void
	toggleStreaming: () => void,
	openReportCallback: (file: File) => void
	setStreamingModeView: () => void
	toggleRecording: () => void
}

  interface IState {
	saveDialog: boolean;
	startStop: boolean;
  }

  export class Navbar extends React.Component<Props, IState>
  {
	constructor(prop: Props)
	{
		super(prop);

		this.state = {
			saveDialog: false,
			startStop: false,
		  };

		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
		this.handleFakerClick = this.handleFakerClick.bind(this);
	}
	
	handleOpenFile = async () =>{
		
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = async () => {
			if(input.files && input.files?.length != 1) return;
				let file = input.files?.item(0);
				if (!file) return;
			
			this.props.openReportCallback(file);
		};

		input.click();
	}

	handleClearClick() {
		
		this.props.plotViewController?.Clear();
		this.props.plotViewController?.ClearLabels();
		this.props.groups.forEach(g => g.channelsInfo.resetAbsoluteAnalizer());
		this.props.clear();
	}

	private async handleAddClick() {
		try
		{
			let port = await navigator.serial.requestPort();    //запрашиваем выбор порта у пользователя
			var sensor = await CreateSerialSensor(port);
			await this.props.sensorService.AddSensor(sensor);
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

	async handleFakerClick() {
		let facker = new Facker();
		await this.props.sensorService.AddSensor(facker);
	}

	handleScreen = async () => {
		let screen = await this.props.plotViewController?.MakeScreen();
		if (screen)
		{
			var anchor = document.createElement('a');
			anchor.setAttribute('download', 'screen.png');
			anchor.setAttribute('href', screen);
			anchor.click();
		}
	}
	
	render(){
		return (
			<div className='nav-tab-container'>
				
				<div className="btn-group" role="group" aria-label="First group">

					<Button title="Начать измерение" size='large' id="Start" shape="default" disabled = {!this.props.enable && !this.props.reportVieving}
					icon = {
						this.props.reportVieving ? <ArrowLeftOutlined /> : 
						this.props.streaming?  <PauseOutlined /> : <CaretRightOutlined/>
					} 
					onClick= { this.props.reportVieving ? this.props.setStreamingModeView : this.props.toggleStreaming
					}/>

					<Button title="Очистить результаты" 
					disabled = { !this.props.enable || this.props.streaming } 
					size='large' 
					id="clear"
					shape="default"  
					icon={<BorderOutlined />} 
					onClick={this.handleClearClick}/>

					<Button title="Добавить датчик" 
					size='large' 
					disabled = { this.props.streaming || this.props.reportVieving } 
					id="open" 
					shape="default"  
					icon={<PlusCircleOutlined />} 
					onClick={this.handleAddClick}/>

					<Button title="Начать запись в файл" size='large' id="StartRec" 
					disabled = { !this.props.enable || (this.props.streaming && !this.props.recordingState) }
					icon={<AimOutlined style={{ color: this.props.recordingState ? "red": "inherit" }}/>} 
					shape="default"  
					onClick={this.props.toggleRecording}
					style={{ borderColor: this.props.recordingState ? "red": "#d9d9d9" }}/>

					<Button title="Сделать скриншот" 
					size='large' 
					id="screen" 
					shape="default"  
					icon={<CameraOutlined />} 
					onClick={this.handleScreen}/>

					<Button title="Открыть отчет" 
					size='large' 
					id="openfile" 
					shape="default"  
					icon={<FolderOpenOutlined />} 
					onClick={this.handleOpenFile}/>

					

				</div>
			</div>
		)
    }
  }

  /*
  <Dropdown overlay=
					{
						<Menu
							items={[
							{
								key: '1',
								disabled: this.props.enable,
								label: (
								<a  onClick={this.handleFakerClick} target="_blank" rel="noopener noreferrer">
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
						<Button size='large' icon={<BarsOutlined />}/>
					</Dropdown>
  */