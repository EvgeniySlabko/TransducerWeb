import { Checkbox, Collapse, InputNumber, Modal, Slider } from "antd";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ChannelsGroup, StylesGroup } from "../../Channel/AllChannelsFactory";
import { PlotsManager } from "../../uPlot/PlotManager";
import { MenuItem } from "../../Components/MenuItem";
import { setAccurency, setChannelGroupsColor, setFontSize, setLimits } from "../../store/groupsSlice";
import { useAppDispatch } from "../../hooks/hook";
import { UnpropagatableContainer } from "../../Components/UnpropagatableContainer";

export interface Props {
    channelId: string
    stylesGroup: StylesGroup;
    visible: boolean;
    onClose: () => void;
}

export const CellModal = ({channelId, visible, onClose, stylesGroup} : Props) => {
    const [accuracy, setAccuracy] = useState(stylesGroup.cellStyle.accuracy);
    const [color, setColor] = useState(stylesGroup.cellStyle.color);
    const [drawLimits, setDrawLimits] = useState(stylesGroup.plotStyle.drawLimits);
    const dispatch = useAppDispatch();

    const onOk = () => {
        dispatch(setChannelGroupsColor({
            channelId: channelId,
            color: color
        }));

        dispatch(setLimits({
            channelId: channelId,
            drawLimits: drawLimits,
        }));

        dispatch(setAccurency({
            channelId: channelId,
            accuracy: accuracy,
        }));
    }; 

    const onFontSizeChanged = (size: number) =>
    {
        dispatch(setFontSize({
            channelId: channelId,
            fontSize: size,
        }));
    }

    return (
        <UnpropagatableContainer>
            <Modal
                title="Параметры канала"
                open={visible}
                onOk={() => {
                    onOk();
                    onClose();
                }}
                onCancel={onClose}
                centered={false}
            >
                <div className="vertical-flex">
                    <MenuItem
                        label="Шрифт:"
                        children={
                            <Slider
                                style={{ width: "200px" }}
                                defaultValue={stylesGroup.cellStyle.fontSize}
                                disabled={false}
                                min={10}
                                max={50}
                                onChange={onFontSizeChanged}
                            />
                        }
                    />

                    <MenuItem label="Цвет графика:" 
                              children={<HexColorPicker 
                              color={stylesGroup.cellStyle.color} 
                              onChange={setColor} />} />

                    <MenuItem label="Знаков после запятой:"
                              children={<InputNumber 
                              className="vertical-alignment" 
                              size="small" 
                              style={{ height: "25px" }} 
                              step={1} min={0} max={5} 
                              value={accuracy} 
                              onChange={n => setAccuracy(n!)} />} />

                    <MenuItem label="Пределы измерений:" 
                              children={<Checkbox 
                              disabled={stylesGroup.cellStyle.limits === undefined} 
                              defaultChecked={stylesGroup.plotStyle.drawLimits} 
                              onChange={(s) => setDrawLimits(s.target.checked)} />} />
                </div>
            </Modal>
        </UnpropagatableContainer>
    );
}
