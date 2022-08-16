import { Collapse, InputNumber, Modal, Select } from "antd";
import React from "react";
import { BaudRate, Parity, StopBit } from "../../Storage/ConnectionParams/ConnectionCommon";
import { GetRS485Params, GetVCOMParams, SetRS485Params } from "../../Storage/ConnectionParams/ConnectionStorage";
import { MenuItem } from "../MenuItem";
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
    deviceArrdess: number;
}

export class RS485Settings extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        let params = GetRS485Params();
        this.state = {
            deviceArrdess: params.address,
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

    onStopDeviceAddressChanged = (address: number) => {
        this.setState({ deviceArrdess: address });
    };

    onOk = () => {
        SetRS485Params({
            baudRate: this.state.baudRate,
            parity: this.state.parity,
            stopBits: this.state.stopBits,
            address: this.state.deviceArrdess,
        });
    };

    render() {
        return (
            <Modal
                title="Параметры подключения для RS485"
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
                {
                    <>
                        <MenuItem 
                        label="Адрес устройсва:"
                        children={<InputNumber 
                        className="vertical-align" min={1} max={255} step={1} 
                        size="middle" defaultValue={this.state.deviceArrdess} 
                        onChange={this.onStopDeviceAddressChanged} />} />
                        <COMPortParams baudRate={this.state.baudRate} 
                        parity={this.state.parity} stopBit={this.state.stopBits} 
                        onParityChanged={this.onParityChanged} 
                        onSpeedChanged={this.onSpeedChanged} 
                        onStopBitChanged={this.onStopBitChanged} />
                    </>
                }
            </Modal>
        );
    }
}
