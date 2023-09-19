import { SaveOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Tabs } from "antd";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { FilterType, GetSensorParameters, SaveChannelGroupParameters, SaveSensorParameters } from "../../Storage/ChannelsDataStorage";
import { FilterSettings } from "../../Components/FilterSettings";
import { SensorParameters } from "../../Components/SensorParameters";
import { Group } from "../../store/groupsSlice";
import { useSensorContext } from "../../hooks/hook";
import { StylesGroup } from "../../Channel/AllChannelsFactory";
import { InvisibleContainer } from "../../Components/InvisibleContainer";
import { UnpropagatableContainer } from "../../Components/UnpropagatableContainer";
const { TabPane } = Tabs;

export interface Props extends HTMLAttributes<HTMLDivElement>{
    group: Group;
    visible: boolean;
    setChannelVisibilty: (channelIndex: number, value: boolean) => void;
    onClose: () => void;
}

export const SensorSettingsTab = ({group, visible, setChannelVisibilty, onClose, ...rest}: Props) => {

    const [absolute, setAbsolute] = useState(false);
    const [invertion, setInvertion] = useState(false);
    const [tareAccuracy, setTareAccuracy] = useState(2);
    const [avgRatio, setAvgRatio] = useState(1);
    const [dataReceived, setDataReceived] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [externalSpeedSensor, setExternalSpeedSensor] = useState(false);
    const [fc, setFc] = useState(100);
    const [filterType, setFilterType] = useState<FilterType>("butterworth");
    const [offset, setOffset] = useState(0);
    const [order, setOrder] = useState(3);
    const [speedPeriod, setSpeedPeriod] = useState(100);
    const [trackMaximum, setTrackMaximum] = useState(false);
    const [visibleChannels, setVisibleChannels] = useState<[string, boolean][]>([]);
    const [sensorWorker, pipeline, channelsGroup] = useSensorContext(group.id);

    useEffect(() => {
        (async () => {
            try {
                let filterParameters = pipeline.getFilterParameters();
                let holdingRegisters = await sensorWorker.GetHoldingRegisters();
                let sensorparameters = await GetSensorParameters(group.fullSensorInfo.SensorId);
                
                setAbsolute(pipeline.getAbsoluteSourceState());
                setInvertion(pipeline.getInvertorSourceState());
                setAvgRatio(holdingRegisters.AverageRatio);
                setSpeedPeriod(holdingRegisters.SpeedMeasurigPeriod);
                setTrackMaximum(pipeline.getPeackAnalizerState());
                setVisibleChannels(group.cellStyles.map(x => [x.valueName, x.visible]));
                setExternalSpeedSensor(sensorparameters.externalSpeedSensor);
                setOffset(pipeline.getCurrentOffset());
                setEnabled(filterParameters.enabled);
                setFc(filterParameters.fc);
                setFilterType(filterParameters.filterType);
                setOrder(filterParameters.order);
                setDataReceived(true);
            } catch {
                notification.error({
                    message: `Не удалось получить данные ${group.fullSensorInfo.SensorType}`,
                    duration: 2,
                });
            }
        })();
      }, []);

    const onOk = async () => {
        pipeline.setPeackAnalizerState(trackMaximum);

        try {
            await sensorWorker.SetAverageRatio(avgRatio);
            await sensorWorker.SetSpeedPeriod(speedPeriod);
            await sensorWorker.SetExternalSpeedSensorState(externalSpeedSensor);
            pipeline.setFilterParameters({
                enabled: enabled,
                fc: fc,
                filterType: filterType,
                order: order,
            });
            pipeline.setPeackAnalizerState(trackMaximum);
            pipeline.setOffset(offset);
            pipeline.setAbsoluteSourceState(absolute);
            pipeline.setInvertiorSourceState(invertion);

            SaveSensorParameters(
                {
                    externalSpeedSensor: externalSpeedSensor,
                    offset: offset,
                    avgRatio: avgRatio,
                    invertion: invertion,
                    absolute: absolute,
                    speedPeriod: speedPeriod,
                    filterParameters: {
                        fc: fc,
                        enabled: enabled,
                        filterType: filterType,
                        order: order,
                    },
                },
                group.fullSensorInfo.SensorId
            );
        } catch {
            notification.error({
                message: `Не удалось записать данные ${group.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }

        for (let i = 0; i < visibleChannels.length; i++) 
            setChannelVisibilty(i, visibleChannels[i][1]);
    };

    const onSaveParamsToStorage = () => {
        
        const stylesGroups: StylesGroup[] = []
        for (let i = 0; i < group.cellStyles.length; i++) {
            stylesGroups.push({
                cellStyle: group.cellStyles[i],
                plotStyle: group.plotStyles[i],
                savingStyle: group.savingStyles[i]
            })
        }
        
        SaveChannelGroupParameters(stylesGroups, group.fullSensorInfo.SensorId);

        notification.success({
            message: `Настройки каналов сохранены.`,
            duration: 2,
        });
    };

    const onVisibleChannelsChanged = (index: number, value: boolean) => {
        visibleChannels[index][1] = value;
        setVisibleChannels(visibleChannels);
    };

    return (
        <UnpropagatableContainer>
            <Modal 
                {...rest}
                title="Общие параметры"
                open={visible}
                onOk={(event) => {
                    onOk();
                    onClose();
                }}
                onCancel={onClose}
                cancelText={"Отмена"}
                footer={
                <>
                    <Button key={1} 
                    style={{ float: "left" }} 
                    title="Запомнить настройки датчика" 
                    icon={<SaveOutlined onClick={onSaveParamsToStorage} />} />,
                    <Button key={2} onClick={onClose} title="Отмена">
                        Отмена
                    </Button>
                    <Button
                        key={3}
                        onClick={() => {
                            onOk();
                            onClose();
                        }}
                        title="Принять"
                    >
                        Принять
                    </Button>
                </>
                }
                centered={false}
            >
                <InvisibleContainer visible={dataReceived}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tabKey="1" tab="Общие" key="1">
                            <SensorParameters
                            key={2}
                            group={group}
                            absolute={absolute}
                            invertion={invertion}
                            tareAccuracy={tareAccuracy}
                            avgRatio={avgRatio}
                            externalSpeedSensor={externalSpeedSensor}
                            offset={offset}
                            speedPeriod={speedPeriod}
                            visibleChannels={visibleChannels}
                            trackMaximum={trackMaximum}
                            onAbsoluteChanged={setAbsolute}
                            onInvertionChanged={setInvertion}
                            onAvgChanged={setAvgRatio}
                            onExternalSpeedSensorChanged={setExternalSpeedSensor}
                            onOffsetChanged={setOffset}
                            onSpeedPeriodChanged={setSpeedPeriod}
                            onTrackMaximumChanged={setTrackMaximum}
                            onVisibleChannelsChanged={onVisibleChannelsChanged}
                            minAvgRatio={sensorWorker.DecoderParams.minAvgRatio}
                            ></SensorParameters>
                        </TabPane>
                        <TabPane tabKey="2" tab="Фильтр" key="2">
                            <FilterSettings 
                            enabled={enabled} 
                            filterType={filterType}
                            order={order}
                            fc={fc}
                            onFilterEnabledChanged={setEnabled}
                            onFilterFcChanged={setFc}
                            onFilterOrderChanged={setOrder}
                            onFilterTypeChanged={setFilterType} />
                        </TabPane>
                    </Tabs>
                </InvisibleContainer>
            </Modal>
        </UnpropagatableContainer>
    );
}
