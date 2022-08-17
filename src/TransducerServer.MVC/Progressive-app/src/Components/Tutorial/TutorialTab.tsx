import { Modal, Tabs } from "antd";
import React from "react";
import { CommonInfo } from "./CommonInfo";
import { ControlInfo } from "./ControlInfo";
const { TabPane } = Tabs;

export interface Props {
    onClose: () => void;
    visible: boolean;
}

interface IState {
}

export class TutorialTab extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);
        this.state = {
        };
    }

    onOk = async () => {
        
    };

    render() {
        return (
            <Modal
                title="Общие параметры"
                visible={this.props.visible}
                onOk={(event) => {
                    this.props.onClose();
                }}
                width={1000}
                onCancel={this.props.onClose}
                centered={false}
            >
                
            <Tabs defaultActiveKey="1">
                <TabPane tabKey="1" tab="Общая информация" key="1">
                    <CommonInfo/>
                </TabPane>
                <TabPane tabKey="2" tab="Краткая инструкция" key="2">
                    <ControlInfo />
                </TabPane>
            </Tabs>
                
            </Modal>
        );
    }
}
