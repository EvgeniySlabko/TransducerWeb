import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Checkbox, Col, Collapse, Dropdown, InputNumber, Row, Slider } from 'antd';
import { SketchPicker } from 'react-color';
import Icon, { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

  export interface Props {
      
  }

   interface IState {
   }

  export class PlotControlPannel extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);
    }

    render(){
      return (
        <div style={{
            display: "flex",
            width: "auto",
            margin:"2px"
        }}>
 

            <Button size='small' icon = { <CaretRightOutlined/>}></Button> 
        </div>
      )
    }
  }