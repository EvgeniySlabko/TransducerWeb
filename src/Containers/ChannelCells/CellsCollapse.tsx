import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, notification } from "antd";
import React, { useState } from "react";
import { SetOffset } from "../../Storage/ChannelsDataStorage";
import { Cell } from "./Cell";
import { SensorSettingsTab } from "../Modals/SensorSettingsTab";
import { Group, removeGroup, setChannelVisibility } from "../../store/groupsSlice";
import styles from "./CellCollapse.module.scss";
import "./CellCollapse.scss";
import { PipelineController } from "../../Channel/AllChannelsFactory";
import { useAppDispatch, useSensorContext, useSensorsService } from "../../hooks/hook";
export type PeackMode = "none" | "absolute" | "relative";
const { Panel } = Collapse;

export interface Props {
    group: Group;
    pipelineController: PipelineController;
    allowSettings: boolean;
}

export const CellsCollapse = ({group, allowSettings} : Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch(); 
    const [sensorWorker, pipelineController, channelGroups] = useSensorContext(group.id);

    const onShow = () => setModalVisible(true);
    const onCancel = () => setModalVisible(false);
    const [sensorService] = useSensorsService();
    
    const setZeroClick = () => {
        let currentOffset = pipelineController.setCurrentOffset();
        SetOffset(currentOffset, group.fullSensorInfo.SensorId);

        notification.success({
            message: `Смещение установлено для датчика ${group.fullSensorInfo.SensorType} - ${currentOffset.toFixed(group.fullSensorInfo.Accuracy)}${group.fullSensorInfo.UnitValueName}`,
            duration: 2,
        });
    };
 
    const removeSensor = async () => {
        console.debug("Manual closing sensor.");
        await sensorService.RemoveSensor(sensorWorker);
        dispatch(removeGroup({groupId:  group.id}))
    };

    const setChannelVisibilty = (channelId: string, value: boolean) => {
        dispatch(setChannelVisibility({
            channelId: channelId,
            visible: value
        }));
    };

    return (
        <Collapse defaultActiveKey={["0"]}>
            <Panel
                key={0}
                header={
                    <>
                        <Button
                            className={styles.horizontal_padding}
                            onClick={(event) => {
                                event.stopPropagation();
                                onShow();
                            }}
                            disabled={!allowSettings}
                            icon={<SettingOutlined />}/>

                        <Button
                            className={styles.horizontal_padding}
                            onClick={(event) => {
                                event.stopPropagation();
                                setZeroClick();
                            }}>
                            {">0<"}
                        </Button>

                        <Button
                            onClick={(event) => {
                                event.stopPropagation();
                                removeSensor();
                            }}
                            className={styles.horizontal_padding}
                            disabled={!allowSettings}
                            icon={<CloseOutlined />}/>

                        <div className={styles.vertical_flex}>
                            <h6 className={styles.cell_group_title}>{group.fullSensorInfo.SensorType}</h6>
                            <h6 className={styles.cell_group_title}>ID: {group.fullSensorInfo.SensorId}</h6>
                        </div>
  
                        <SensorSettingsTab onClick={(e) => e.stopPropagation()}
                                            setChannelVisibilty={setChannelVisibilty}
                                            group={group} 
                                            onClose={onCancel} 
                                            visible={modalVisible} />
                    </>
                }
            >
            {
                group.cellStyles
                    .filter((c) => c.visible)
                    .map((cellChannelStyle, i) => 
                        <Cell allowSettings={allowSettings} 
                        sensorWorker = {sensorWorker}   
                        channelId={cellChannelStyle.id}
                        channelsGroup={{
                            plotChannel: channelGroups[i].plotChannel,
                            savingChannel: channelGroups[i].savingChannel,
                            cellChannel: channelGroups[i].cellChannel,
                        }}
                        sensorId = {group.id}
                        stylesGroup = {{
                            cellStyle: group.cellStyles[i],
                            plotStyle: group.plotStyles[i],
                            savingStyle: group.savingStyles[i],
                        }}/>
                    )
            }
            </Panel>
        </Collapse>
    );
}
