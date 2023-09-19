import { Modal, Tabs } from "antd";
import React from "react";
import { ControlInfo } from "../../Components/ControlInfo";
import { CommonInfo } from "../../Components/CommonInfo";
const { TabPane } = Tabs;

export interface Props {
    onClose: () => void;
    visible: boolean;
}

export const TutorialTab = ( {onClose, visible} : Props ) => {
    return (
        <Modal
            title="Общие параметры"
            onOk={onClose}
            width={1000}
            onCancel={onClose}
            centered={false}
            open={visible}
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
