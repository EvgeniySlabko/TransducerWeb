import { Modal, Tabs } from "antd";
import React, { useState } from "react";
import { PlotSettings } from "../../Components/PlotSettings";
import { useAppDispatch, useAppSelector, usePlotManager, useSensorContexts } from "../../hooks/hook";
import { reset, setPointsPerSecond, toggleSettingsScreenModal } from "../../store/uiSlice";
import { SetupPlotManager } from "../../Common/PlotManagerHelpers";
import { PlotsManager } from "../../uPlot/PlotManager";
import { Group } from "../../store/groupsSlice";
const { TabPane } = Tabs;

export const AppSettingsTab = () => {
    const [werePlotSettingsChanges, setWerePlotSettingsChanges] = useState(false);
    const pointsPerSecond = useAppSelector(state => state.ui.pointsPerSecond);
    const [pointsPerSecondState, setPointsPerSecondState] = useState(pointsPerSecond);
    const {settings} = useAppSelector(state => state.ui);
    const [plotsManager] = usePlotManager();
    const groups = useAppSelector(state => state.groups.groups);
    const dispatch = useAppDispatch();
    const [contexts] = useSensorContexts()

    const onOk = () => {
        dispatch(setPointsPerSecond(pointsPerSecondState))
        dispatch(toggleSettingsScreenModal())
        if (werePlotSettingsChanges === true) {
            SetupPlotManager(plotsManager as PlotsManager);
            clear();
        }
    };

    const onPointsPerSecondChanged = (value: number) =>{
        setPointsPerSecondState(value);
        setWerePlotSettingsChanges(value !== pointsPerSecondState);
    }

    const clear = async () => {
        //plotsManager?.Clear();
        //plotsManager?.ClearLabels();
        //plotsManager?.RebuildIfNessesary();
        groups.forEach((group: Group) => contexts.get(group.id)?.pipelineController.resetPeackAnalizer());

        dispatch(reset());
    };

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
            open={settings}
        >
            {
                <Tabs defaultActiveKey="1">
                    <TabPane tabKey="1" tab="График" key="1">
                        <PlotSettings pointsPerSecond={pointsPerSecondState} 
                                      pointsPerSecondChanged={onPointsPerSecondChanged} />
                    </TabPane>
                </Tabs>
            }
        </Modal>
    );
}
