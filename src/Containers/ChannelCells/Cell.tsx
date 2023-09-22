import { SettingOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { ChannelsGroup, StylesGroup } from "../../Channel/AllChannelsFactory";
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from "../../Channel/Channel/CellChannel";
import { CellValue } from "../../Components/CellValue";
import { CellModal } from "../Modals/CellSettings";
import styles from "./Cell.module.scss";
import { SensorWorker } from "../../Sensor/SensorWorker";
import { UnpropagatableContainer } from "../../Components/UnpropagatableContainer";

export interface Props {
    sensorId: string,
    channelId: string,
    stylesGroup: StylesGroup;
    channelsGroup: ChannelsGroup;
    sensorWorker: SensorWorker
    allowSettings: boolean;
}

export const Cell = ({sensorId, channelId, stylesGroup, channelsGroup} : Props) => {
    const [value, setValue] = useState("");
    const [overload, setOverload] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        channelsGroup.cellChannel.onClose.sub(closeHandler);
        channelsGroup.cellChannel.onData.sub(dataHandler);
        return () => {
            channelsGroup.cellChannel.onClose.unsub(closeHandler);
            channelsGroup.cellChannel.onData.unsub(dataHandler);
        }
    });

    const closeHandler = (channel: CellChannel, args: ChannelCloseArgs) => {
        setValue("");

        channelsGroup.cellChannel.onClose.unsub(closeHandler);
        channelsGroup.cellChannel.onData.unsub(dataHandler);
    };

    const dataHandler = (channel: CellChannel, args: ChannelDataArgs) => {
        let value = args.data.data[0];
        let newOverload : boolean = (stylesGroup.cellStyle.minValue && value <= stylesGroup.cellStyle.minValue) ||
                                    (stylesGroup.cellStyle.maxValue && value >= stylesGroup.cellStyle.maxValue) as boolean;

        if (overload !== newOverload) 
            setOverload(newOverload);

        setValue(args.data.data[0].toFixed(stylesGroup.cellStyle.accuracy));
    };

    const limitHandler = (state: boolean) => {
        stylesGroup.plotStyle.drawLimits = state;
    };

    const onModalClose = () => {
        setModalVisible(false);
    };

    const onShow = () => {
        setModalVisible(true);
    };
    
    return (
        <UnpropagatableContainer>
            <div className={styles.flex}>
                <div
                    className={styles.cell_name}
                    style={{
                        color: stylesGroup.cellStyle.color,
                        background: overload ? "red" : "white",
                    }}
                >
                    {stylesGroup.cellStyle.valueName + ` ${"(" + stylesGroup.cellStyle.unitsName + ")"}`}
                </div>

                <Button
                    className={styles.horizontal_padding}
                    onClick={(event) => {
                        onShow();
                    }}
                    icon={
                        <SettingOutlined
                            onClick={(event) => {
                                onShow();
                            }}
                        />
                    }
                />

                <CellModal
                    channelId={channelId}
                    stylesGroup={stylesGroup}
                    visible={modalVisible} 
                    onClose={onModalClose} /> 
                
            </div>

            <CellValue
                className={styles.app_label} 
                fontSize={stylesGroup.cellStyle.fontSize} 
                fontColor={stylesGroup.cellStyle.color}
                value={value} />
        </UnpropagatableContainer>
    );
}
