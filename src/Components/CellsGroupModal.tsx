import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Card, Checkbox, Collapse, Dropdown, InputNumber, Menu, Modal, notification, Radio, Space } from 'antd';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Cell } from './Cell';
import { Group } from './App';
import { IEvent } from 'strongly-typed-events';
import { Channel } from '../Channel/Channel/Channel';
import { PeakEventArgs } from '../Channel/SensorDataProveder/PeakAnalyzer';
const { Panel } = Collapse;

  export type PeackMode = "none" | "absolute" | "relative";

  export interface Props {
    group: Group 
    sensorRemove: (sensor: ISingleComponentSensor) => void,
    channelColorChanged: (channel: CellChannel, color: string) => void;
    setThreshold: (threshold: number) => void;
    detectorModeSettor: (channel: Channel, mode: PeackMode) => void
  }

  interface IState {
    modalVisible: boolean,
    treshold: number,
   }

  export class CellsGroup extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
       treshold: 0.1 * this.props.group.node.fullSensorInfo.MaxValue,
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

      this.props.setThreshold(this.state.treshold);
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

    render() {
        return (
        <Modal title="Basic Modal" visible={this.state.modalVisible} onCancel={e => this.onCancel()} onOk={event => { this.onOk(); } }>

        <Checkbox>Показывать максимум.</Checkbox>

        </Modal>
      )
    }
  }


  /*
  <InputNumber step={0.01 * this.props.group.node.fullSensorInfo.MaxValue}
            style={{ width: "auto" }}
            min={0} max={this.props.group.node.fullSensorInfo.MaxValue}
            value={this.state.treshold} onChange={this.tresholdChanged} />
  */
