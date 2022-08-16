import { Collapse, Select } from "antd";
import React, { Component, ReactComponentElement } from "react";
import { DecoderType } from "../../Sensor/SensorFactory";
import { BaudRate, Parity, StopBit } from "../../Storage/ConnectionParams/ConnectionCommon";
import { MenuItem } from "../MenuItem";
import { RS485Settings } from "./RS485Settings";
import { VCOMSettings } from "./VCOMSettings";
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {
    onClose: () => void;
    decoderType: DecoderType;
}

export class ConnectionSettings extends React.Component<Props> {
    constructor(prop: Props) {
        super(prop);
    }

    onSpeedChanged = (baudRate: BaudRate) => {
        this.setState({ baudRate: baudRate });
    };

    onParityChanged = (parity: Parity) => {
        this.setState({ parity: parity });
    };

    onStopBitChanged = (stopBits: StopBit) => {
        this.setState({ stopBits: stopBits });
    };

    render() {
        let settings: any;
        switch (this.props.decoderType) {
            case "RS485": {
                settings = <RS485Settings onClose={this.props.onClose}></RS485Settings>;
                break;
            }
            case "VCOM": {
                settings = <VCOMSettings onClose={this.props.onClose}></VCOMSettings>;
                break;
            }
        }

        return <>{settings}</>;
    }
}
