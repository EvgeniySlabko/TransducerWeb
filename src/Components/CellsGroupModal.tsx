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
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ParamsStorage } from '../Storage/Storage';
const { Panel } = Collapse;

  export interface Props {
    group: Group,
    plotViewController: ViewController | null;
    visible: boolean;
    storage: ParamsStorage;
    onClose: () => void;
  }

  interface IState {
    absoluteAnalizer: boolean
  }

  export class CellsGroupModal extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
        absoluteAnalizer: this.props.group.channelsInfo.getAbsoluteAnalizerState(),
      }
    }

    onOk = () =>
    {
      this.props.group.channelsInfo.setAbsoluteAnalizer(this.state.absoluteAnalizer);
    }

    render() {
      return (
        <Modal title="Параметры датчика" 
        visible={this.props.visible} 
        onCancel={e => this.props.onClose()} 
        onOk={event => { this.onOk(); this.props.onClose(); }}
        centered={false}>

        <div className='vertical-flex'>
          <h5>Отображение каналов:</h5>
          {
            this.props.group.channelsInfo.channelGroups.map((g, i) => 
              <Checkbox defaultChecked = {g.cellChannel.Style.visible} onChange={e => g.cellChannel.Style.visible = e.target.checked}>{g.cellChannel.Style.valueName} </Checkbox>
            )
          }
        </div>
        
        <h5>Остальное:</h5>
        <Checkbox defaultChecked = {false} onChange ={(c) => 
          {
            this.setState((prev, props) => ({
              absoluteAnalizer: c.target.checked,
            }));
          }}>Отслеживать максимум.</Checkbox>
        
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
