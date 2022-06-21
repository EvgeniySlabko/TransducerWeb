import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Card, Checkbox, Collapse, InputNumber, Menu, Modal, notification } from 'antd';
import { CloseOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Cell } from './Cell';
import { Group } from './App';

import { Channel } from '../Channel/Channel/Channel';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { PlotPeackController } from '../ViewsControllers/PeacksController';
const { Panel } = Collapse;

  export type PeackMode = "none" | "absolute" | "relative";

  export interface Props {
    group: Group,
    plotViewController: ViewController | null;
    sensorRemove: (sensor: ISingleComponentSensor) => void,
    setThreshold: (upperThreshold: number, lowerThreshold: number) => void;
    peackController: PlotPeackController | null;
  }

  interface IState {
    modalVisible: boolean,
    absoluteAnalizer: boolean,
    treshold: number,
   }

  export class CellsGroup extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
       treshold: 0.1 * this.props.group.node.fullSensorInfo.MaxValue,
       absoluteAnalizer: false,
       modalVisible: false,
      }
    }

    tresholdChanged = (value: number) =>
    {
      this.setState((prev, props) => ({
          treshold: value,
        }));        
    }

    onOk = () =>
    {
      this.setState((prev, props) => ({
        modalVisible: false,
      }));

      this.props.setThreshold(this.state.treshold, this.state.treshold - 0.0003);
      this.props.group.channelsInfo.setAbsoluteAnalizer(this.state.absoluteAnalizer);
    }

    onShow = () =>
    {
      this.setState((prev, props) => ({
        modalVisible: true,
      }));
    }

    onCancel = () =>
    {
      this.setState((prev, props) => ({
        modalVisible: false,
      }));
    }

    detectorHandler = (state: boolean) =>
    {
      this.props.group.channelsInfo.setAbsoluteAnalizer(state)
    }

    setZeroClick = () =>
    {
      let currentOffset = this.props.group.channelsInfo.currentValueOffsetSetter();
      notification.success({
        message: `Смещение установлено для датчика ${this.props.group.node.fullSensorInfo.SensorType} - ${currentOffset.toFixed(2)}${this.props.group.node.fullSensorInfo.UnitValueName}`,
        duration: 2,
      });
    }
    
    render() {
      return (
        <Collapse defaultActiveKey={['1']}>
              <Panel  key="1" header=
              {
                <>
                <Button key={1} icon={<SettingOutlined onClick={event => { event.stopPropagation(); this.onShow(); } } />} />
                <Button key={2} onClick={event =>{ event.stopPropagation(); this.setZeroClick()}} >0</Button>
                <Button key={4} icon={<CloseOutlined onClick={event => { event.stopPropagation(); this.props.sensorRemove(this.props.group.node.sensor); } } />}></Button>
                <div key={3} onClick={e => e.stopPropagation()}>
                  <Modal title="Basic Modal" visible={this.state.modalVisible} onCancel={e => this.onCancel()} onOk={event => { this.onOk(); } }>

                    <Checkbox defaultChecked = {false} onChange ={(c) => 
                      {
                        this.setState((prev, props) => ({
                          absoluteAnalizer: c.target.checked,
                        }));
                      }}>Отслеживать максимум.</Checkbox>

                  </Modal>
                </div>
              </>
              }>
              {
              this.props.group.channelsInfo.channelGroups.map(c => <Cell key={c.cellChannel.Style.id}
                                                       channelGroup={c} 
                                                       plotViewController={this.props.plotViewController}
                                                       ></Cell>)
            }

            </Panel>   
        </Collapse>     
    )
  }
}