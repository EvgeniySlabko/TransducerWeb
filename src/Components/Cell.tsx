import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ChannelsGroup, StylesGroup } from "../Channel/AllChannelsFactory";
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from "../Channel/Channel/CellChannel";
import styles from "./Cell.module.scss";
import { CellValue } from "./CellValue";
import { UnpropagatableContainer } from "./UnpropagatableContainer";

export interface Props {
    stylesGroup: StylesGroup;
    channelsGroup: ChannelsGroup;
    allowSettings: boolean;
    onModalClick: () => void;
}

export const Cell = ({stylesGroup, channelsGroup, onModalClick} : Props) => {
    const [value, setValue] = useState("");
    const [overload, setOverload] = useState(false);
    

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
                        onModalClick();
                    }}
                    icon={
                        <SettingOutlined
                            onClick={(event) => {
                                onModalClick();
                            }}
                        />
                    }
                />
                
            </div>

            <CellValue
                className={styles.app_label} 
                fontSize={stylesGroup.cellStyle.fontSize} 
                fontColor={stylesGroup.cellStyle.color}
                value={value} />
        </UnpropagatableContainer>
    );
}
