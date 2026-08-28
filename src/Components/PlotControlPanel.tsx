import { CaretLeftOutlined, CaretRightOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DoubleRightOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import React from "react";
import { MyUPlotBase } from "../uPlot/PlotBase";
import styles from "./Components.module.scss"

export interface Props {
    plotsManager?: MyUPlotBase;
}

export const step = 20;
export const PlotControlPanelContainer = ({plotsManager}: Props) => {
    
    const size = "40px";
    return (
        <div className={styles.cell_control_panel_row}>
            <div style={{ marginLeft: "0px" }}>
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.MoveX(-20)} icon={<StepBackwardOutlined />} />
                <Button style={{ height: size, width: size }} onClick={() => plotsManager?.MoveX(-step)} className={styles.horizontal_padding} icon={<CaretLeftOutlined />} />
                <Button style={{ height: size, width: size }} onClick={() => plotsManager?.MoveX(step)} className={styles.horizontal_padding} icon={<CaretRightOutlined />} />
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.MoveX(20)} icon={<StepForwardOutlined />} />
            </div>

            <div style={{ marginLeft: "10px" }}>
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.ZoomX(step)} icon={<ZoomInOutlined />} />
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.ZoomX(-step)} icon={<ZoomOutOutlined />} />
                {
                /*
                    <Button style={{ height: size, width: size }} onClick={plotsManager?.HorizontalAlign} className="horizontal-padding" icon={<ColumnWidthOutlined />} />
                */
                }
            </div>

            <div style={{ marginLeft: "10px" }}>
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.ZoomY(step)} icon={<ZoomInOutlined />} />
                <Button style={{ height: size, width: size }} className={styles.horizontal_padding} onClick={() => plotsManager?.ZoomY(-step)} icon={<ZoomOutOutlined />} />
                {
                    /*
                    <Button style={{ height: size, width: size }} className="horizontal-padding" onClick={plotsManager?.VerticalAlign} icon={<ColumnHeightOutlined />} /> -->
                    */
                }
            </div>

            <div style={{ marginLeft: "10px" }}>
            {
                /*
                    <Button style={{ height: size, width: size }} className="horizontal-padding" disabled={reportVieving} onClick={() => plotsManager?.SetStreaming()} icon={<DoubleRightOutlined />} />
                */
            }
            </div>
        </div>
    );
}