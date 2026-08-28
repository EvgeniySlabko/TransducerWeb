import { Collapse, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";
import { MenuItem } from "../../Components/MenuItem";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { setAllSettings } from "../../store/rs485Slice";
import { toggleSensorScreenModal } from "../../store/uiSlice";
import styles from "./Modals.module.scss";
const { Option } = Select;

export const RS485Settings = () => {
    const {deviceArrdess, baudRate, parity, stopBits } = useAppSelector(state => state.rs485);

    const [deviceArrdessState, setDeviceArrdessState] = useState(deviceArrdess);
    const [baudRateState, setBaudRateState] = useState(baudRate);
    const [parityState, setParityState] = useState(parity);
    const [stopBitsState, setStopBitsState] = useState(stopBits);

    const dispatch = useAppDispatch();
    
    const onOk = () => {
        dispatch(setAllSettings({
            baudRate: baudRateState,
            deviceArrdess: deviceArrdessState,
            parity: parityState,
            stopBits: stopBitsState
        }))
    };

    return (
        <Modal
            title="Параметры подключения для RS485"
            onOk={(event) => {
                onOk();
                dispatch(toggleSensorScreenModal());
            }}
            
            onCancel={() => dispatch(toggleSensorScreenModal())}
            open = {true}
            okText={"Принять"}
            cancelText={"Отмена"}
            centered={true}
        >
            {
                <>
                    <MenuItem 
                    label="Адрес устройсва:"
                    children={<InputNumber 
                    className="vertical-align" min={1} max={255} step={1} 
                    size="middle" defaultValue={deviceArrdess} 
                    onChange={(n) => setDeviceArrdessState(n ? n : 1)} />} />
                    
                    
                    <MenuItem
                        children={
                            <Select defaultValue={baudRate} style={{ width: 120 }} onChange={setBaudRateState}>
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
                            <Select defaultValue={parity} style={{ width: 200 }} onChange={setParityState}>
                                <Option value={"even"}>Дополнение до четного.</Option>
                                <Option value={"odd"}>Дополнение до нечетного.</Option>
                                <Option value={"none"}>Нет бита четности.</Option>
                            </Select>
                        }
                        label="Четность:"
                    />

                    <MenuItem
                        children={
                            <Select defaultValue={stopBits} style={{ width: 120 }} onChange={setStopBitsState}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                            </Select>
                        }
                        label="Стоповые биты:"
                    />
                </>
            }
        </Modal>
    );
}
