import { Collapse, Select } from "antd";
import React from "react";
import { BaudRate, Parity, StopBit } from "../../Storage/ConnectionParams/ConnectionCommon";
import { MenuItem } from "../MenuItem";
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {
    baudRate: BaudRate;
    parity: ParityType;
    stopBit: StopBit;

    onSpeedChanged: (baudRate: BaudRate) => void;
    onParityChanged: (parity: ParityType) => void;
    onStopBitChanged: (stopBits: StopBit) => void;
}

export class COMPortParams extends React.Component<Props> {
    constructor(prop: Props) {
        super(prop);
    }

    render() {
        return (
            <>
                <MenuItem
                    children={
                        <Select defaultValue={this.props.baudRate} style={{ width: 120 }} onChange={this.props.onSpeedChanged}>
                            <Option value={2400}>2400</Option>
                            <Option value={4800}>4800</Option>
                            <Option value={9600}>9600</Option>
                            <Option value={14400}>14400</Option>
                            <Option value={19200}>19200</Option>
                            <Option value={38400}>38400</Option>
                            <Option value={57600}>57600</Option>
                            <Option value={115200}>115200</Option>
                        </Select>
                    }
                    label="Скорость:"
                />

                <MenuItem
                    children={
                        <Select defaultValue={this.props.parity} style={{ width: 200 }} onChange={this.props.onParityChanged}>
                            <Option value={"even"}>Дополнение до четного.</Option>
                            <Option value={"odd"}>Дополнение до нечетного.</Option>
                            <Option value={"none"}>Нет бита четности.</Option>
                        </Select>
                    }
                    label="Четность:"
                />

                <MenuItem
                    children={
                        <Select defaultValue={this.props.stopBit} style={{ width: 120 }} onChange={this.props.onStopBitChanged}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                        </Select>
                    }
                    label="Стоповые биты:"
                />
            </>
        );
    }
}
