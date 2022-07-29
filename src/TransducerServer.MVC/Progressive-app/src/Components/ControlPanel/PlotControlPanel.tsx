import { CaretLeftOutlined, CaretRightOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DoubleRightOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import React from 'react';
import { PlotsManager } from '../../uPlot/PlotsManager';
const { Panel } = Collapse;


export interface Props {
        plotsManager?: PlotsManager;
        reportVieving: boolean;
}

interface IState {
}

export class PlotControlPanel extends React.Component<Props, IState>{

        step: number = 20;

        constructor(prop: Props) {
                super(prop);
                this.state = {
                }
        }

        render() {
                return (


                        <div className='cell-control-panel-row'>

                                <div style={{ marginLeft: "10px" }}>
                                        <Button key={1}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={this.props.plotsManager?.PressLeft}
                                                icon={<StepBackwardOutlined />} />
                                        <Button key={2}
                                                style={{ height: "20px", width: "20px" }}
                                                onClick={() => this.props.plotsManager?.MoveX(-this.step)}
                                                className='horizontal-padding'
                                                icon={<CaretLeftOutlined />} />
                                        <Button key={3}
                                                style={{ height: "20px", width: "20px" }}
                                                onClick={() => this.props.plotsManager?.MoveX(this.step)}
                                                className='horizontal-padding'
                                                icon={<CaretRightOutlined />} />
                                        <Button key={4}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={this.props.plotsManager?.PressRight}
                                                icon={<StepForwardOutlined />} />
                                </div>

                                <div style={{ marginLeft: "10px" }}>
                                        <Button key={5}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={() => this.props.plotsManager?.ZoomX(this.step)}
                                                icon={<ZoomInOutlined />} />
                                        <Button key={6}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={() => this.props.plotsManager?.ZoomX(-this.step)}
                                                icon={<ZoomOutOutlined />} />
                                        <Button key={7}
                                                style={{ height: "20px", width: "20px" }}
                                                onClick={this.props.plotsManager?.HorizontalAlign}
                                                className='horizontal-padding'
                                                icon={<ColumnWidthOutlined />} />
                                </div>

                                <div style={{ marginLeft: "10px" }}>
                                        <Button key={8}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={() => this.props.plotsManager?.ZoomY(this.step)}
                                                icon={<ZoomInOutlined />} />
                                        <Button key={9}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={() => this.props.plotsManager?.ZoomY(-this.step)}
                                                icon={<ZoomOutOutlined />} />
                                        <Button key={10}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                onClick={this.props.plotsManager?.VerticalAlign}
                                                icon={<ColumnHeightOutlined />} />
                                </div>

                                <div style={{ marginLeft: "10px" }}>
                                        <Button key={11}
                                                style={{ height: "20px", width: "20px" }}
                                                className='horizontal-padding'
                                                disabled={this.props.reportVieving}
                                                onClick={() => this.props.plotsManager?.SetStreaming()}
                                                icon={<DoubleRightOutlined />} />
                                </div>
                        </div>
                )
        }
}