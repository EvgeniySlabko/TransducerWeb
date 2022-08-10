import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row, Select } from 'antd';
import React from 'react';
import { keyCodes as keyCode } from '../Common/KeyCodes';
import { CeateSensorWorker, DecoderType } from '../Sensor/SensorFactory';
import { SensorController } from '../Sensor/SensorsManager/SensorsManager';
import { SensorWorker } from '../Sensor/SensorWorker';
import { GetConnectedDecoderType, SetConnectedDecoderType } from '../Storage/AppStorage';
const { Option } = Select;

export interface Props {
	sensorService: SensorController
    enabled: boolean
}

export interface IState {
	decoderType: DecoderType,
    dataReceived: boolean,
}

export class AddSensor extends React.Component<Props, IState>
{
	constructor(prop: Props) {
		super(prop);

        this.state = {
            decoderType: "VCOM",
            dataReceived: false,
        };

		document.addEventListener('keydown', async (event: any) => {
			switch (event.keyCode) {
				case keyCode.KEY_A: await this.onAddClick(); break;
				default:
					break;
			}
			
		  }, false);
	}

    componentDidMount() {
        let decoderType = GetConnectedDecoderType();
        this.setState((prev, props) => ({
            dataReceived: true,
            decoderType: decoderType,
        }));
    }

    onSelect = (decoderType: DecoderType) => 
    {
        this.setState({
            decoderType: decoderType,
            dataReceived: true,
        });

        SetConnectedDecoderType(decoderType);
    }

	async handleAddClick() {
        let sensorWorker: SensorWorker;
        try{
            sensorWorker = await CeateSensorWorker(this.state.decoderType);
        }
        catch{
            console.warn("Failed to create SensorWorker.");
            return;
        }

        try{
            await this.props.sensorService.AddSensor(sensorWorker);
        }
        catch
        {
            console.warn("Failed to add sensor.");
        }
	}

	private onAddClick = async () =>{
        await this.handleAddClick()
	}
    
	render() {
		return (
            !this.state.dataReceived ? <></> : 
            <div className="horizontal-flex">
                <Row>
                <Select defaultValue={this.state.decoderType} size={'large'} style={{ width: 100 }} onChange={this.onSelect}>
                    <Option value="VCOM">VCOM</Option>
                    <Option value="RS485">RS485</Option>
                </Select>
                <Button title="Добавить датчик. (A)"
                    disabled={!this.props.enabled}
                    size='large'
                    id="open"
                    shape="default"
                    icon={<PlusCircleOutlined />}
                    onClick={ this.onAddClick} />
                </Row>
            </div>	
		)
	}
}