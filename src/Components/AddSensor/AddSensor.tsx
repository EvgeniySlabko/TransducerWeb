import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import React from "react";
import { keyCodes as keyCode } from "../../Common/KeyCodes";
import { CeateSensorWorker, DecoderType } from "../../Sensor/SensorFactory";
import { SensorController } from "../../Sensor/SensorsManager/SensorsManager";
import { SensorWorker } from "../../Sensor/SensorWorker";
import { GetConnectedDecoderType, SetConnectedDecoderType } from "../../Storage/AppStorage";
import { ConnectionSettings } from "./ConnectionSettings";
const { Option } = Select;

export interface Props {
    sensorService: SensorController;
    enabled: boolean;
}

export interface IState {
    decoderType: DecoderType;
    dataReceived: boolean;
    showSettings: boolean;
}

export class AddSensor extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);

        this.state = {
            decoderType: "VCOM",
            dataReceived: false,
            showSettings: false,
        };

        document.addEventListener(
            "keydown",
            async (event: any) => {
                switch (event.keyCode) {
                    case keyCode.KEY_A:
                        await this.onAddClick();
                        break;
                    default:
                        break;
                }
            },
            false
        );
    }

    componentDidMount() {
        let decoderType = GetConnectedDecoderType();
        this.setState((prev, props) => ({
            dataReceived: true,
            decoderType: decoderType,
        }));
    }

    onSelect = (decoderType: DecoderType) => {
        this.setState({
            decoderType: decoderType,
            dataReceived: true,
        });

        SetConnectedDecoderType(decoderType);
    };

    async handleAddClick() {
        let sensorWorker: SensorWorker;
        try {
            sensorWorker = await CeateSensorWorker(this.state.decoderType);
        } catch(ex) {
            console.warn("Failed to create SensorWorker.", ex);
            return;
        }

        try {
            await this.props.sensorService.AddSensor(sensorWorker);
        } catch(ex) {
            console.warn("Failed to add sensor.", ex);
        }
    }

    onAddClick = async () => {
        await this.handleAddClick();
    };

    onSettingsClick = (showSettings: boolean) => {
        this.setState({ showSettings: true });
    };

    render() {
        return !this.state.dataReceived ? (
            <></>
        ) : (
            <span className="horizontal-flex" style={{ paddingLeft: "40px" }}>
                <Select defaultValue={this.state.decoderType} size={"large"} style={{ width: 100 }} onChange={this.onSelect} disabled={!this.props.enabled}>
                    <Option value="VCOM">VCOM</Option>
                    <Option value="RS485">RS485</Option>
                    <Option value="USB">USB</Option>
                </Select>
                <Button title="Настройки." disabled={!this.props.enabled} size="large" id="openfile" shape="default" icon={<SettingOutlined />} onClick={() => this.onSettingsClick(true)} />
                <Button title="Добавить датчик. (A)" disabled={!this.props.enabled} size="large" id="open" shape="default" icon={<PlusCircleOutlined />} onClick={this.onAddClick} />
                {!this.state.showSettings ? <></> : <ConnectionSettings onClose={() => this.setState({ showSettings: false })} decoderType={this.state.decoderType} />}
            </span>
        );
    }
}
