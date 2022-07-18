import React from 'react';
import { Checkbox, Collapse, InputNumber, Modal, notification } from 'antd';
import { Group } from './App';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ParamsStorage } from '../Storage/Storage';
import { MenuItem } from './MenuItem';
const { Panel } = Collapse;

  export interface Props {
    group: Group,
    plotViewController?: ViewController;
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
        await this.props.group.node.worker.SetAverageRatio(this.state.avgFactor);
        await this.props.group.node.worker.SetSpeedPeriod(this.state.speedPeriod);
        await this.props.group.node.worker.SetExternalSpeedSensorState(this.state.externalSpeedSensor);
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
        onOk={event => { this.onOk(); this.props.onClose(); }}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered={false}>

        <MenuItem className='vertical-flex' label='Отображение каналов:' children={
          <div className='vertical-flex'>
          {
            this.props.group.channelsInfo.channelGroups.map((g, i) => 
              <Checkbox key={i}  defaultChecked = {g.cellChannel.Style.visible} onChange={e => g.cellChannel.Style.visible = e.target.checked}>{g.cellChannel.Style.valueName} </Checkbox>
            )
          }
        </div>
        }/>
          
          {
            (!this.state.dataReceived) ? <></> :  
                <>
                <MenuItem key={1} label='Период измерения скорости:' children={
                  <InputNumber className='vertical-align' step = {1} size="small" style={{height: "25px" }} defaultValue={this.state.speedPeriod} onChange={this.onSpeedChanged}/>
                }/>
                
                <MenuItem key={2} label='Коэффицент усреднения:' children={
                  <InputNumber className='vertical-align' step = {1} size="small" style={{height: "25px" }} defaultValue={this.state.avgFactor} onChange={this.onAvgChanged}/>
                }/>

                  <Checkbox key = {3} className='margin' defaultChecked = {false} onChange ={(c) => 
                  {
                    this.setState((prev, props) => ({ externalSpeedSensor: c.target.checked }));
                  }}>Внешний датчик скорости</Checkbox>
                </>
          }
          
          <Checkbox key = {6} className='margin' defaultChecked = {false} onChange ={(c) => 
            {
              this.setState((prev, props) => ({
                absoluteAnalizer: c.target.checked,
              }));
            }}>Отслеживать максимум.</Checkbox>
        </Modal>
      )
    }
  }
  