import { Collapse, Modal, Select } from "antd";
import React, { useState } from "react";
import { BaudRate, StopBit } from "../../Storage/ConnectionParams/ConnectionCommon";
import { MenuItem } from "../../Components/MenuItem";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { setAllSettings } from "../../store/vcomSlice";
import { toggleSensorScreenModal } from "../../store/uiSlice";
import styles from "./Modals.module.scss";
const { Option } = Select;

export interface IState {
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
}

export const VCOMSettings = () => {
    const { baudRate, parity, stopBits } = useAppSelector(state => state.vcom);
    
    const [baudRateState, setBaudRateState] = useState(baudRate);
    const [parityState, setParityState] = useState(parity);
    const [stopBitsState, setStopBitsState] = useState(stopBits);
    const dispatch = useAppDispatch();

    const onOk = () => {
        dispatch(setAllSettings({
            baudRate: baudRateState,
            parity: parityState,
            stopBits: stopBitsState,
        }));
    };

    return (
        <Modal
            title="Параметры подключения VCOM."
            onOk={(event) => {
                onOk();
                dispatch(toggleSensorScreenModal())
            }}
            onCancel={() => dispatch(toggleSensorScreenModal())}
            okText={"Принять"}
            cancelText={"Отмена"}
            centered={true}
            open = {true}
        >
            <MenuItem
                children={
                    <Select defaultValue={baudRateState} style={{ width: 120 }} onChange={setBaudRateState}>
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
                    <Select defaultValue={parityState} style={{ width: 200 }} onChange={setParityState}>
                        <Option value={"even"}>Дополнение до четного.</Option>
                        <Option value={"odd"}>Дополнение до нечетного.</Option>
                        <Option value={"none"}>Нет бита четности.</Option>
                    </Select>
                }
                label="Четность:"
            />

            <MenuItem
                children={
                    <Select defaultValue={stopBitsState} style={{ width: 120 }} onChange={setStopBitsState}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                    </Select>
                }
                label="Стоповые биты:"
            />

            <MenuItem
                children={
                    <Select defaultValue={"TILKOM"} style={{ width: 120 }}>
                        <Option>TILKOM</Option>
                    </Select>
                }
                label="Протокол:"
            />
        </Modal>
    );
}
