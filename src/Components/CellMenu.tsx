import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Col, Collapse, InputNumber, Row, Slider } from 'antd';
const { Panel } = Collapse;

  export interface Props {
   
  } 

   interface IState {
    value: number,
   }

  export class CellMenu extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        value: 0,
      }
    }

    render(){
      return (
        <Collapse defaultActiveKey={['0']}>
        <Panel header="This is panel" className='' key="1">
        <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={20}
            value={3}
          />
        </Col>
      </Row>
        </Panel>
      </Collapse>
      )
    }
  }