import { Modal, Tabs } from "antd";
import React from "react";
import { GetPointsPerSecond, SetPointsPerSecond } from "../../Storage/AppStorage";
import { PlotSettings } from "./PlotSettings";
const { TabPane } = Tabs;

export interface Props {
    visible: boolean;
    onClose: (werePlotSettingsChanges: boolean) => void;
}

interface IState {
    pointsPerSecond: number;

    dataReceived: boolean;
    werePlotSettingsChanges: boolean;
}

export class AppSettingsTab extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        this.state = {
            pointsPerSecond: 50,
            dataReceived: false,
            werePlotSettingsChanges: true,
        };
    }

    async componentDidMount() {
        this.setState({
            dataReceived: true,
            pointsPerSecond: GetPointsPerSecond(),
        });
    }

    onOk = () => {
        SetPointsPerSecond(this.state.pointsPerSecond);
    };

    onPointsPerSecondChanged = (value: number) =>
        this.setState({
            pointsPerSecond: value,
            werePlotSettingsChanges: value !== this.state.pointsPerSecond,
        });

    onClose = () => {
        this.props.onClose(this.state.werePlotSettingsChanges);
    };

    render() {
        return (
            <Modal
                title="Общие параметры"
                visible={this.props.visible}
                onOk={(event) => {
                    this.onOk();
                    this.onClose();
                }}
                onCancel={() => this.props.onClose(false)}
                okText={"Принять"}
                cancelText={"Отмена"}
                centered={false}
            >
                {
                    <Tabs defaultActiveKey="1">
                        <TabPane tabKey="1" tab="График" key="1">
                            <PlotSettings pointsPerSecond={this.state.pointsPerSecond} pointsPerSecondChanged={this.onPointsPerSecondChanged} />
                        </TabPane>
                    </Tabs>
                }
            </Modal>
        );
    }
}
