import { Collapse, Modal, Select } from "antd";
import React from "react";
import { BaudRate, Parity, StopBit } from "../../Storage/ConnectionParams/ConnectionCommon";
import { GetVCOMParams, SetVCOMParams } from "../../Storage/ConnectionParams/ConnectionStorage";
import { COMPortParams } from "./COMPortParams";
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {
    onClose: () => void;
}

export interface IState {
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
}

export class VCOMSettings extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        let params = GetVCOMParams();
        this.state = {
            baudRate: params.baudRate,
            parity: params.parity,
            stopBits: params.stopBits,
        };
    }

    onSpeedChanged = (baudRate: BaudRate) => {
        this.setState({ baudRate: baudRate });
    };

    onParityChanged = (parity: ParityType) => {
        this.setState({ parity: parity });
    };

    onStopBitChanged = (stopBits: StopBit) => {
        this.setState({ stopBits: stopBits });
    };

    onOk = () => {
        SetVCOMParams({
            baudRate: this.state.baudRate,
            parity: this.state.parity,
            stopBits: this.state.stopBits,
        });
    };

    render() {
        return (
            <Modal
                title="Параметры подключения для VCOM"
                visible={true}
                onOk={(event) => {
                    this.onOk();
                    this.props.onClose();
                }}
                onCancel={this.props.onClose}
                okText={"Принять"}
                cancelText={"Отмена"}
                centered={false}
            >
                {<COMPortParams baudRate={this.state.baudRate} 
                parity={this.state.parity} stopBit={this.state.stopBits}
                onParityChanged={this.onParityChanged} onSpeedChanged={this.onSpeedChanged} 
                onStopBitChanged={this.onStopBitChanged} />}
            </Modal>
        );
    }
}
