import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { Button, Card, Checkbox, Collapse, InputNumber, Menu, Modal, notification } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { Cell } from './Cell';
import { Group } from './App';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ParamsStorage } from '../Storage/Storage';
import { CellsGroupModal } from './CellsGroupModal';
const { Panel } = Collapse;

  export type PeackMode = "none" | "absolute" | "relative";

  export interface Props {
    group: Group,
    plotViewController?: ViewController;
    sensorRemove: (sensor: ISingleComponentSensor) => void,
    setThreshold: (upperThreshold: number, lowerThreshold: number) => void;
    storage: ParamsStorage;
    allowSettings: boolean;
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
        <Collapse defaultActiveKey={['0']}>
              <Panel  key = {0} header=
              {
                <>
                <Button key={1} 
                className='horizontal-padding' 
                onClick={event => { event.stopPropagation(); this.onShow(); } } 
                disabled={!this.props.allowSettings}
                icon={<SettingOutlined onClick={event => { event.stopPropagation(); this.onShow(); } } />} />

                <Button key={2} 
                className='horizontal-padding'
                onClick={ event =>{ event.stopPropagation(); this.setZeroClick()}} >{">0<"}</Button>

                <Button key={3} 
                        className='horizontal-padding' 
                        disabled={!this.props.allowSettings}
                        icon={<CloseOutlined onClick={event => { event.stopPropagation(); this.props.sensorRemove(this.props.group.node.sensor); } } />}/>
                
                <div key={4} className='vertical-flex'>
                  <h6 className='cell-group-title'>{this.props.group.node.fullSensorInfo.SensorType}</h6>
                  <h6 className='cell-group-title'>ID: {this.props.group.node.fullSensorInfo.SensorId}</h6>
                </div>

                <div key={5} onClick={e => e.stopPropagation()}>
                
                  <CellsGroupModal key={6} 
                                    group={this.props.group} 
                                    onClose={() => this.setState(() =>({modalVisible: false}))} 
                                    plotViewController = {this.props.plotViewController}
                                    storage = {this.props.storage}
                                    visible = {this.state.modalVisible}/>
                </div>
                </>
              }>
                
              {
              this.props.group.channelsInfo.channelGroups.filter(c => c.cellChannel.Style.visible).map(c => 
                                                         <Cell 
                                                          allowSettings={this.props.allowSettings}
                                                          key={c.cellChannel.Style.id}
                                                          channelGroup={c} 
                                                          plotViewController={this.props.plotViewController}
                                                          ></Cell>)
              }

            </Panel>   
        </Collapse>     
    )
  }
}