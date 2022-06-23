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
    absoluteAnalizer: boolean,
    speedPeriod: number,
    avgFactor: number,
    externalSpeedSensor: boolean,
    dataReceived: boolean,
  }

  export class CellsGroupModal extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
        absoluteAnalizer: this.props.group.channelsInfo.getAbsoluteAnalizerState(),
        speedPeriod: 0,
        avgFactor: 0,
        dataReceived: false,
        externalSpeedSensor: false,
      }
    }

    onOk = async () =>
    {
      this.props.group.channelsInfo.setAbsoluteAnalizer(this.state.absoluteAnalizer);

      try
      {
        await this.props.group.node.sensor.SetAvgRatio(this.state.avgFactor);
        await this.props.group.node.sensor.SetSpeedPeriod(this.state.speedPeriod);
        await this.props.group.node.sensor.SetExternalSensorState(this.state.externalSpeedSensor);
      }
      catch
      {
        notification.error({
          message: `Не удалось записать данные ${this.props.group.node.fullSensorInfo.SensorType}`,
          duration: 2,
      });
      }
    }

    async componentDidMount()
    {
      try{
        let holdingRegisters = await this.props.group.node.sensor.GetHoldingRegisters();

        this.setState((prev, props) => ({
          speedPeriod: holdingRegisters.SpeedMeasurigPeriod,
          avgFactor: holdingRegisters.AverageRatio,
          dataReceived: true
        })); 
      }
      catch
      {
        notification.error({
          message: `Не удалось получить данные ${this.props.group.node.fullSensorInfo.SensorType}`,
          duration: 2,
      });
      }
    }

    onSpeedChanged = (value: number) =>{
      this.setState((prev, props) => ({
        speedPeriod: value,
      })); 
    }

    onAvgChanged = (value: number) =>{
      this.setState((prev, props) => ({
        avgFactor: value,
      })); 
    }

    render() {
      return (
        <Modal title="Параметры датчика" 
        visible={this.props.visible} 
        onCancel={e => this.props.onClose()} 
        onOk={event => { this.onOk(); this.props.onClose(); }}
        centered={false}>

        <div className='vertical-flex'>
          <h5 className='margin'>Отображение каналов:</h5>
          {
            this.props.group.channelsInfo.channelGroups.map((g, i) => 
              <Checkbox defaultChecked = {g.cellChannel.Style.visible} onChange={e => g.cellChannel.Style.visible = e.target.checked}>{g.cellChannel.Style.valueName} </Checkbox>
            )
          }
        </div>
        
        <h5 className='margin'>Остальное:</h5>
        <Checkbox className='margin' defaultChecked = {false} onChange ={(c) => 
          {
            this.setState((prev, props) => ({
              absoluteAnalizer: c.target.checked,
            }));
          }}>Отслеживать максимум.</Checkbox>
          
          {
              (!this.state.dataReceived) ? <></> :  
                <>
                  <h5 className='margin'>Параметры датчика:</h5>

                  <div className='horizontal-flex'>
                    <label className='margin vertical-alignment'>Период измерения скорости: </label>
                    <div className='margin horizontal-flex'>
                      <InputNumber className='margin vertical-alignment' step = {1} size="small" style={{height: "25px" }} defaultValue={this.state.speedPeriod} onChange={this.onSpeedChanged}/>
                      <p className='margin-left'>мс</p>
                    </div>
                  </div>

                  <div className='horizontal-flex'>
                    <label className='margin vertical-alignment'>Коэффицент усреднения: </label>
                    <div className='margin'>
                      <p>{this.state.avgFactor}</p>
                    </div>
                  </div>

                  <Checkbox className='margin' defaultChecked = {false} onChange ={(c) => 
                  {
                    this.setState((prev, props) => ({
                      externalSpeedSensor: c.target.checked,
                    }));
                  }}>Внешний датчик скорости</Checkbox>
                </>
          }
          
        </Modal>
      )
    }
  }
