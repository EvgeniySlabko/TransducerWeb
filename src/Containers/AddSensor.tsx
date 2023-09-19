import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { HTMLAttributes, useMemo } from "react";
import { CeateSensorWorker } from "../Sensor/SensorFactory";
import { SensorWorker } from "../Sensor/SensorWorker";
import { DecoderType, setDecoderType, toggleSensorScreenModal } from "../store/uiSlice";
import { useAppDispatch, useAppSelector, useSensorsService } from "../hooks/hook";
import { ConnectionSettings } from "../Components/ConnectionSettings";
import { InvisibleContainer } from "../Components/InvisibleContainer";
const { Option } = Select;

export interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const AddSensor = ({...rest}: Props) => {
    const [sensorService] = useSensorsService();
    
    const {showSensorsSettings, streaming, viewingReport, selectedDecoderType } = useAppSelector(state => state.ui);

    const enabled = useMemo(() => !(streaming || viewingReport), [streaming, viewingReport]);

    const dispatch = useAppDispatch();

    const handleAddClick = async () => {
        let sensorWorker: SensorWorker;
        try {
            sensorWorker = await CeateSensorWorker(selectedDecoderType);
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

    const onSelect = (decoderType: DecoderType) => dispatch(setDecoderType(decoderType))
    
    const onSettingsClick = () => dispatch(toggleSensorScreenModal())

    return (
        <div {...rest}>
            <Select defaultValue={selectedDecoderType} 
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
                    id="settings"
                    shape="default"
                    icon={<SettingOutlined />} 
                    onClick={onSettingsClick} />

            <Button title="Добавить датчик. (A)"
                    disabled={!enabled}
                    size="large"
                    id="open"
                    shape="default"
                    icon={<PlusCircleOutlined />}
                    onClick={handleAddClick} />

            <InvisibleContainer visible={showSensorsSettings}>
                <ConnectionSettings/>
            </InvisibleContainer>
        </div>
    );
}

