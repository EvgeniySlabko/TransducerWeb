import { Modal } from "antd";
import React, { useState } from "react";
import { CreateCsvFileDialog } from "../../Common/FileHelpers";
import { Snapshot } from "../../ReportListener/Snapshot";
import { SaveModalItem } from "../../Components/SaveModalItem";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { toggleDownloadModal } from "../../store/uiSlice";
import styles from "./Modals.module.scss";
import { UnpropagatableContainer } from "../../Components/UnpropagatableContainer";

export interface Props {
    snapshot?: Snapshot;
    visible: boolean;
    onClose: () => void;
}

export const SaveModal = () => {
    const [csvName] = useState("Report.csv");
    const {snapshot, showDownloadModal} = useAppSelector(state => state.ui);

    const dispatch = useAppDispatch();
    
    const onCSVDownload = async () => {
        let currentFile = await CreateCsvFileDialog();
        snapshot?.ToCSV(currentFile);
    };

    const close = () => {
        dispatch(toggleDownloadModal())
    };

    return (
        <UnpropagatableContainer>
            <Modal title="Сохранить отчет: " 
                   open={showDownloadModal} 
                   onCancel={close}
                   onOk={close}
                   centered={false}>
                <div className="vertical-flex">
                    <SaveModalItem download={onCSVDownload} 
                                   label="Сохранить в формате CSV:" 
                                   placeHolder="Имя отчета" 
                                   defaultName={csvName} />
                </div>
            </Modal>
        </UnpropagatableContainer>
    );
}
