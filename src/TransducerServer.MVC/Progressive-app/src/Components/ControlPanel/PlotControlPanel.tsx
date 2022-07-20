import { ISingleComponentSensor } from '../../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { Button, Card, Checkbox, Collapse, InputNumber, Menu, Modal, notification } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CloseOutlined, ColumnHeightOutlined, ColumnWidthOutlined, DoubleRightOutlined, SettingOutlined, StepBackwardOutlined, StepForwardOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Cell } from '../Cell';
import { Group } from '../App';
import { ViewController } from '../../ViewsControllers/PlotViewController';
const { Panel } = Collapse;

  export type PeackMode = "none" | "absolute" | "relative";

  export interface Props {
    plotViewController?: ViewController;
  }

  interface IState {
   }

  export class PlotControlPanel extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
      }
    }
    
    render() {
      return (
        

        <div className='cell-control-panel-row'>
        
        <div style={{marginLeft: "10px"}}>
            <Button key={1} 
                        style = {{height: "20px", width: "20px"}}
                        className='horizontal-padding' 
                        icon={<StepBackwardOutlined />} />

            <Button key={2} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<CaretLeftOutlined />} />

            <Button key={3} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<CaretRightOutlined />} />

            <Button key={4} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<StepForwardOutlined />} />
        </div>

        <div style={{marginLeft: "10px"}}>
            <Button key={5} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<ZoomInOutlined />} />
            <Button key={6} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<ZoomOutOutlined />} />
            <Button key={7} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<ColumnWidthOutlined />} />
            <Button key={8} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<ColumnHeightOutlined />} />
        </div>

        <div style={{marginLeft: "10px"}}>
            <Button key={9} 
                    style = {{height: "20px", width: "20px"}}
                    className='horizontal-padding' 
                    icon={<DoubleRightOutlined />} />
        </div>
        </div>   
    )
  }
}