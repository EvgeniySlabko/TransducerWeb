import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Collapse, notification } from "antd";
import React from "react";
import { SensorWorker } from "../Sensor/SensorWorker";
import { SetOffset } from "../Storage/ChannelsDataStorage";
import { PlotsManager } from "../uPlot/PlotManager";
import { Group } from "./App";
import { Cell } from "./Cell";
import { SensorSettingsTab } from "./SensorSettings/SensorSettingsTab";
const { Panel } = Collapse;

export type PeackMode = "none" | "absolute" | "relative";

export interface Props {
    group: Group;
    plotsManager?: PlotsManager;
    sensorRemove: (sensor: SensorWorker) => void;
    allowSettings: boolean;
}

interface IState {
    modalVisible: boolean;
    absoluteAnalizer: boolean;
    treshold: number;
}

export class CellsGroup extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        this.state = {
            treshold: 0.1 * this.props.group.node.fullSensorInfo.MaxValue,
            absoluteAnalizer: false,
            modalVisible: false,
        };
    }

    tresholdChanged = (value: number) => {
        this.setState(() => ({
            treshold: value,
        }));
    };

    onOk = () => {
        this.setState(() => ({
            modalVisible: false,
        }));

        this.props.group.channelsInfo.setPeackAnalizerState(this.state.absoluteAnalizer);
    };

    onShow = () => {
        this.setState(() => ({
            modalVisible: true,
        }));
    };

    onCancel = () => {
        this.setState(() => ({
            modalVisible: false,
        }));
    };

    setZeroClick = () => {
        let currentOffset = this.props.group.channelsInfo.setCurrentOffset();
        SetOffset(currentOffset, this.props.group.node.fullSensorInfo.SensorId);

        notification.success({
            message: `Смещение установлено для датчика ${this.props.group.node.fullSensorInfo.SensorType} - ${currentOffset.toFixed(this.props.group.node.fullSensorInfo.Accuracy)}${this.props.group.node.fullSensorInfo.UnitValueName}`,
            duration: 2,
        });
    };

    setChannelVisibilty = (channelindex: number, value: boolean) => {
        this.props.group.channelsInfo.channelGroups[channelindex].cellChannel.Style.visible = value;
        this.setState({});
    };

    render() {
        return (
            <Collapse defaultActiveKey={["0"]}>
                <Panel
                    key={0}
                    header={
                        <>
                            <Button
                                className="horizontal-padding"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.onShow();
                                }}
                                disabled={!this.props.allowSettings}
                                icon={<SettingOutlined />}
                            />

                            <Button
                                className="horizontal-padding"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.setZeroClick();
                                }}
                            >
                                {">0<"}
                            </Button>

                            <Button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.props.sensorRemove(this.props.group.node.worker);
                                }}
                                className="horizontal-padding"
                                disabled={!this.props.allowSettings}
                                icon={<CloseOutlined />}
                            />

                            <div className="vertical-flex">
                                <h6 className="cell-group-title">{this.props.group.node.fullSensorInfo.SensorType}</h6>
                                <h6 className="cell-group-title">ID: {this.props.group.node.fullSensorInfo.SensorId}</h6>
                            </div>

                            {this.state.modalVisible ? (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <SensorSettingsTab setChannelVisibilty={this.setChannelVisibilty} group={this.props.group} onClose={() => this.setState(() => ({ modalVisible: false }))} visible={this.state.modalVisible} />
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    }
                >
                    {this.props.group.channelsInfo.channelGroups
                        .filter((c) => c.cellChannel.Style.visible)
                        .map((c) => (
                            <Cell allowSettings={this.props.allowSettings} key={c.cellChannel.Style.id} channelGroup={c} plotsManager={this.props.plotsManager} />
                        ))}
                </Panel>
            </Collapse>
        );
    }
}
