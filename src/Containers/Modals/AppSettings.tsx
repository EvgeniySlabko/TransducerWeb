import { InputNumber, Modal, Select, Tabs } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector, usePlots, useSensorContexts } from "../../hooks/hook";
import { setPointsPerSecond, toggleSettingsScreenModal } from "../../store/uiSlice";
import { ADCFrequency } from "../../Sensor/SingleComponentSensor.ts/SingleComponentSensorBase";
import { MenuItem } from "../../Components/MenuItem";
import { setNumberOfPlots } from "../../store/groupsSlice";
const { TabPane } = Tabs;
const { Option } = Select;

export interface Props {
    visible: boolean;
}

export const AppSettingsTab = ({ visible }: Props) => {
    const {pointsPerSecond} = useAppSelector(state => state.ui);
    const plotContexts = useAppSelector(state => state.groups.plotContexts);
    
    const [pointsPerSecondState, setPointsPerSecondState] = useState(pointsPerSecond);
    const [numberOfPlotsState, setNumberOfPlotsState] = useState(plotContexts.length);
    
    const [plots] = usePlots();
    const groups = useAppSelector(state => state.groups.groups);
    const dispatch = useAppDispatch();
    const [contexts] = useSensorContexts()

    const onOk = () => {
        dispatch(toggleSettingsScreenModal())
        dispatch(setPointsPerSecond(pointsPerSecondState))
        dispatch(setNumberOfPlots(numberOfPlotsState))
    };

    const onPointsPerSecondChanged = (value: number) =>{
        setPointsPerSecondState(value);
    }

    const onNumberOfPlotsChanged = (value: number) =>{
        setNumberOfPlotsState(value);
    }

    return (
        <Modal
            title="Общие параметры"
            onOk={() => {
                onOk();
            }}
            onCancel={() => dispatch(toggleSettingsScreenModal())}
            okText={"Принять"}
            cancelText={"Отмена"}
            centered={false}
            open={visible}
        >
            {
                <Tabs defaultActiveKey="1">
                    <TabPane tabKey="1" tab="График" key="1">
                        <MenuItem label="Максимальное число точек в секунду на графике:">
                            <InputNumber
                                min={50} 
                                max={ADCFrequency} 
                                step={1} 
                                size="small" 
                                defaultValue={pointsPerSecond} 
                                onChange={num => onPointsPerSecondChanged(num!)} />
                        </MenuItem>

                        <MenuItem label="Стоповые биты:">
                            <Select value={numberOfPlotsState} onChange={onNumberOfPlotsChanged}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                            </Select>
                        
                        </MenuItem>
                    </TabPane>
                </Tabs>
            }
        </Modal>
    );
}
