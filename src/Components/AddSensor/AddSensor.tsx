import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useMemo } from "react";
import { CeateSensorWorker } from "../../Sensor/SensorFactory";
import { SensorController } from "../../Sensor/SensorsManager/SensorsManager";
import { SensorWorker } from "../../Sensor/SensorWorker";
import { ConnectionSettings } from "./ConnectionSettings";
import { DecoderType, toggleSensorScreenModal } from "../../store/uiSlice";
import { useAppDispatch, useAppSelector, useSensorsService } from "../../hooks/hook";
import { useLocalStorage } from "../../hooks/useLocalStorage";
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

export const AddSensor = () => {
    const [selectedDecoder, setSelectedDecoder] = useLocalStorage<DecoderType>("USB");
    const showSensorsSettings = useAppSelector(state => state.ui.showSensorsSettings);
    const [sensorService] = useSensorsService();

    const streaming = useAppSelector(state => state.ui.streaming);
    const viewingReport = useAppSelector(state => state.ui.viewingReport);

    const enabled = useMemo(() => !(streaming || viewingReport), [streaming, viewingReport]);

    const dispatch = useAppDispatch();
    const onSelect = (decoderType: DecoderType) => {
        setSelectedDecoder(decoderType);
    };

    const handleAddClick = async () => {
        let sensorWorker: SensorWorker;
        try {
            sensorWorker = await CeateSensorWorker(selectedDecoder);
        } catch(ex) {
            console.warn("Failed to create SensorWorker.", ex);
            return;
        }

        try {
            await sensorService.AddSensor(sensorWorker);
        } catch(ex) {
            console.warn("Failed to add sensor.", ex);
        }
    }

    const onSettingsClick = (showSettings: boolean) => {
        dispatch(toggleSensorScreenModal())
    };

    return (
        <>
            <span className="horizontal-flex" style={{ paddingLeft: "40px" }}>
                <Select defaultValue={selectedDecoder} 
                        size={"large"}
                        style={{ width: 100 }}
                        onChange={onSelect} 
                        disabled={!enabled}>
                    <Option value="VCOM">VCOM</Option>
                    <Option value="RS485">RS485</Option>
                    <Option value="USB">USB</Option>
                    <Option value="Faker">Faker</Option>
                </Select>
                <Button title="Настройки."
                        disabled={!enabled} 
                        size="large" 
                        id="openfile"
                        shape="default"
                        icon={<SettingOutlined />} 
                        onClick={() => onSettingsClick(true)} />

                <Button title="Добавить датчик. (A)"
                        disabled={!enabled}
                        size="large"
                        id="open"
                        shape="default"
                        icon={<PlusCircleOutlined />}
                        onClick={handleAddClick} />

                {!showSensorsSettings ? 
                <></> : 
                <ConnectionSettings onClose={() => dispatch(toggleSensorScreenModal())} 
                                    decoderType={selectedDecoder} />}
            </span>
        </>
    );
}

