import { SaveOutlined } from "@ant-design/icons";
import { Button, Modal, notification, Tabs } from "antd";
import React from "react";
import { CellChannel } from "../../Channel/Channel/CellChannel";
import { FilterType, GetSensorParameters, SaveChannelGroupParameters, SaveSensorParameters, SensorStorageParameters } from "../../Storage/ChannelsDataStorage";
import { Group } from "../App";
import { FilterSettings } from "./FilterSettings";
import { SensorParameters } from "./SensorParameters";
const { TabPane } = Tabs;

export interface Props {
    group: Group;
    visible: boolean;
    setChannelVisibilty: (channelIndex: number, value: boolean) => void;
    onClose: () => void;
}

interface IState {
    tareAccuracy: number;
    dataReceived: boolean;

    trackMaximum: boolean;
    avgRatio: number;
    speedPeriod: number;
    externalSpeedSensor: boolean;
    offset: number;
    visibleChannels: [string, boolean][];
    enabled: boolean;
    absolute: boolean;
    invertion: boolean;
    fc: number;
    filterType: FilterType;
    order: number;
}

export class SensorSettingsTab extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        this.state = {
            absolute: false,
            invertion: false,
            tareAccuracy: 2,
            avgRatio: 1,
            dataReceived: false,
            enabled: false,
            externalSpeedSensor: false,
            fc: 100,
            filterType: "butterworth",
            offset: 0,
            order: 3,
            speedPeriod: 100,
            trackMaximum: false,
            visibleChannels: [],
        };
    }

    async componentDidMount() {
        try {
            let filterParameters = this.props.group.channelsInfo.getFilterParameters();
            let holdingRegisters = await this.props.group.node.worker.GetHoldingRegisters();
            let sensorparameters = await GetSensorParameters(this.props.group.node.fullSensorInfo.SensorId);
            this.setState(() => ({
                absolute: this.props.group.channelsInfo.getAbsoluteSourceState(),
                invertion: this.props.group.channelsInfo.getInvertorSourceState(),
                avgRatio: holdingRegisters.AverageRatio,
                speedPeriod: holdingRegisters.SpeedMeasurigPeriod,
                trackMaximum: this.props.group.channelsInfo.getPeackAnalizerState(),
                visibleChannels: this.props.group.channelsInfo.channelGroups.map((c) => c.cellChannel).map((ch) => [ch.Style.valueName, ch.Style.visible]),
                externalSpeedSensor: sensorparameters.externalSpeedSensor,

                offset: this.props.group.channelsInfo.getCurrentOffset(),
                enabled: filterParameters.enabled,
                fc: filterParameters.fc,
                filterType: filterParameters.filterType,
                order: filterParameters.order,
                dataReceived: true,
            }));
        } catch {
            notification.error({
                message: `Не удалось получить данные ${this.props.group.node.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }
    }

    onOk = async () => {
        this.props.group.channelsInfo.setPeackAnalizerState(this.state.trackMaximum);

        try {
            await this.props.group.node.worker.SetAverageRatio(this.state.avgRatio);
            await this.props.group.node.worker.SetSpeedPeriod(this.state.speedPeriod);
            await this.props.group.node.worker.SetExternalSpeedSensorState(this.state.externalSpeedSensor);
            this.props.group.channelsInfo.setFilterParameters({
                enabled: this.state.enabled,
                fc: this.state.fc,
                filterType: this.state.filterType,
                order: this.state.order,
            });
            this.props.group.channelsInfo.setPeackAnalizerState(this.state.trackMaximum);
            this.props.group.channelsInfo.setOffset(this.state.offset);
            this.props.group.channelsInfo.setAbsoluteSourceState(this.state.absolute);
            this.props.group.channelsInfo.setInvertiorSourceState(this.state.invertion);

            SaveSensorParameters(
                {
                    externalSpeedSensor: this.state.externalSpeedSensor,
                    offset: this.state.offset,
                    avgRatio: this.state.avgRatio,
                    invertion: this.state.invertion,
                    absolute: this.state.absolute,
                    speedPeriod: this.state.speedPeriod,
                    filterParameters: {
                        fc: this.state.fc,
                        enabled: this.state.enabled,
                        filterType: this.state.filterType,
                        order: this.state.order,
                    },
                },
                this.props.group.node.fullSensorInfo.SensorId
            );
        } catch {
            notification.error({
                message: `Не удалось записать данные ${this.props.group.node.fullSensorInfo.SensorType}`,
                duration: 2,
            });
        }

        for (let i = 0; i < this.state.visibleChannels.length; i++) this.props.setChannelVisibilty(i, this.state.visibleChannels[i][1]);
    };

    onSaveParamsToStorage = () => {
        SaveChannelGroupParameters(this.props.group.channelsInfo.channelGroups, this.props.group.node.fullSensorInfo.SensorId);

        notification.success({
            message: `Настройки каналов сохранены.`,
            duration: 2,
        });
    };

    onFilterEnabledChanged = (value: boolean) => this.setState(() => ({ enabled: value }));
    onFilterFcChanged = (value: number) => this.setState(() => ({ fc: value }));
    onFilterTypeChanged = (value: FilterType) => this.setState(() => ({ filterType: value }));
    onFilterOrderChanged = (value: number) => this.setState(() => ({ order: value }));

    onInvertionChanged = (value: boolean) => this.setState(() => ({ invertion: value }));
    onAbsoluteChanged = (value: boolean) => this.setState(() => ({ absolute: value }));

    onOffsetChanged = (value: number) => this.setState(() => ({ offset: value }));
    onAvgChanged = (value: number) => this.setState(() => ({ avgRatio: value }));
    onExternalSpeedSensorChanged = (value: boolean) => this.setState(() => ({ externalSpeedSensor: value }));
    onTrackMaximumChanged = (value: boolean) => this.setState(() => ({ trackMaximum: value }));
    onSpeedPeriodChanged = (value: number) => this.setState(() => ({ speedPeriod: value }));
    onVisibleChannelsChanged = (index: number, value: boolean) => {
        this.state.visibleChannels[index][1] = value;
        this.setState(() => ({ visibleChannels: this.state.visibleChannels }));
    };

    render() {
        return (
            <Modal
                title="Общие параметры"
                visible={this.props.visible}
                onOk={(event) => {
                    this.onOk();
                    this.props.onClose();
                }}
                onCancel={this.props.onClose}
                cancelText={"Отмена"}
                footer={[
                    <Button key={1} style={{ float: "left" }} title="Запомнить настройки датчика" icon={<SaveOutlined onClick={this.onSaveParamsToStorage} />} />,
                    <Button key={2} onClick={this.props.onClose} title="Отмена">
                        Отмена
                    </Button>,
                    <Button
                        key={3}
                        onClick={() => {
                            this.onOk();
                            this.props.onClose();
                        }}
                        title="Принять"
                    >
                        Принять
                    </Button>,
                ]}
                centered={false}
            >
                {!this.state.dataReceived ? (
                    <></>
                ) : (
                    <Tabs defaultActiveKey="1">
                        <TabPane tabKey="1" tab="Общие" key="1">
                            <SensorParameters key={2} group={this.props.group} absolute={this.state.absolute} invertion={this.state.invertion} tareAccuracy={2} avgRatio={this.state.avgRatio} externalSpeedSensor={this.state.externalSpeedSensor} offset={this.state.offset} speedPeriod={this.state.speedPeriod} visibleChannels={this.state.visibleChannels} trackMaximum={this.state.trackMaximum} onAbsoluteChanged={this.onAbsoluteChanged} onInvertionChanged={this.onInvertionChanged} onAvgChanged={this.onAvgChanged} onExternalSpeedSensorChanged={this.onExternalSpeedSensorChanged} onOffsetChanged={this.onOffsetChanged} onSpeedPeriodChanged={this.onSpeedPeriodChanged} onTrackMaximumChanged={this.onTrackMaximumChanged} onVisibleChannelsChanged={this.onVisibleChannelsChanged}></SensorParameters>
                        </TabPane>
                        <TabPane tabKey="2" tab="Фильтр" key="2">
                            <FilterSettings enabled={this.state.enabled} filterType={this.state.filterType} order={this.state.order} fc={this.state.fc} onFilterEnabledChanged={this.onFilterEnabledChanged} onFilterFcChanged={this.onFilterFcChanged} onFilterOrderChanged={this.onFilterOrderChanged} onFilterTypeChanged={this.onFilterTypeChanged} />
                        </TabPane>
                    </Tabs>
                )}
            </Modal>
        );
    }
}
