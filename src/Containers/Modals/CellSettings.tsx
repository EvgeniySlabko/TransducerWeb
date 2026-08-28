import { Checkbox, Collapse, Divider, InputNumber, Modal, Slider, Space } from "antd";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ChannelsGroup, StylesGroup } from "../../Channel/AllChannelsFactory";
import { PlotsManager } from "../../uPlot/PlotManager";
import { MenuItem } from "../../Components/MenuItem";
import { attachChannelToPlots, setAccurency, setChannelGroupsColor, setFontSize, setLimits } from "../../store/groupsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { UnpropagatableContainer } from "../../Components/UnpropagatableContainer";

export interface Props {
    channelId: string
    visible: boolean;
    onClose: () => void;
}

type PlotChannelModel = {
    plotId: number,
    plotName: string,
    isAttached: boolean
}
export const CellModal = ({channelId, visible, onClose} : Props) => {
    const cellChannelStyle = useAppSelector(s => s.groups.groups.flatMap(g => g.cellStyles).find(cs => cs.id == channelId))!
    const plotChannelStyle = useAppSelector(s => s.groups.groups.flatMap(g => g.plotStyles).find(cs => cs.id == channelId))!
    const savingChannelStyle = useAppSelector(s => s.groups.groups.flatMap(g => g.savingStyles).find(cs => cs.id == channelId))!

    const plotContexts = useAppSelector(s => s.groups.plotContexts)!
    const plotChannels = useAppSelector(s => s.groups.plotChannels.filter(pc => pc.channelId === channelId))
    const plotChannelAttachments = plotContexts.map<PlotChannelModel>(plotContext => {
        return{
            isAttached: plotChannels.some(pc => pc.plotId === plotContext.id),
            plotId: plotContext.id,
            plotName: plotContext.plotName
        }
    });

    const [accuracy, setAccuracy] = useState(cellChannelStyle.accuracy);
    const [color, setColor] = useState(cellChannelStyle.color);
    const [drawLimits, setDrawLimits] = useState(plotChannelStyle.drawLimits);
    const [channelAttachments, setChannelAttachments] = useState(plotChannelAttachments);

    const dispatch = useAppDispatch();

    const onOk = () => {
        if(!channelId)
            return;

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

        dispatch(attachChannelToPlots({
            channelId: channelId,
            plotIds: plotChannelAttachments.reduce<number[]>((acc, pa) => {
                if (pa.isAttached)
                    acc.push(pa.plotId);
                return acc;
            }, [])
        }));
    }; 

    const onFontSizeChanged = (size: number) =>
    {
        if(!channelId)
            return;
        dispatch(setFontSize({
            channelId: channelId,
            fontSize: size,
        }));
    }

    const onPlotAttachmentChanged = (plotId: number, isAttached: boolean) =>{
        const newAttachments = plotChannelAttachments.forEach(plotChannelAttachment => {
            if (plotChannelAttachment.plotId == plotId)
            {
                plotChannelAttachment.isAttached = isAttached;
            }
        });
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
                    <MenuItem label="Шрифт:">
                        <Slider
                            style={{ width: "200px" }}
                            defaultValue={cellChannelStyle.fontSize}
                            disabled={false}
                            min={10}
                            max={50}
                            onChange={onFontSizeChanged}
                        />
                    </MenuItem>

                    <MenuItem label="Цвет графика:">
                        <HexColorPicker 
                            color={cellChannelStyle.color} 
                            onChange={setColor} />
                    </MenuItem>

                    <MenuItem label="Знаков после запятой:">
                        <InputNumber 
                              className="vertical-alignment" 
                              size="small" 
                              style={{ height: "25px" }} 
                              step={1} min={0} max={5} 
                              value={accuracy} 
                              onChange={n => setAccuracy(n!)} />
                    </MenuItem>

                    <MenuItem label="Пределы измерений:">
                        <Checkbox 
                            disabled={cellChannelStyle.limits === undefined} 
                            defaultChecked={plotChannelStyle.drawLimits} 
                            onChange={(s) => setDrawLimits(s.target.checked)} />
                    </MenuItem>

                    
                    <Space size={"small"}/>
                    <MenuItem label="Отображать на графиках:">
                        {
                            plotChannelAttachments.map((plotChannelModel, i) => 
                            <Checkbox 
                                key={i} 
                                defaultChecked={plotChannelModel.isAttached} 
                                onChange={(e) => onPlotAttachmentChanged(plotChannelModel.plotId, e.target.checked)}>
                                {plotChannelModel.plotName}{" "}
                            </Checkbox>)
                        }
                    </MenuItem>

                    <Divider type="horizontal" />
                </div>
            </Modal>
        </UnpropagatableContainer>
    );
}
