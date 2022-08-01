import { SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Divider, InputNumber, Modal, notification, Space } from 'antd';
import React from 'react';
import { ParamsStorage } from '../Storage/AppStorage';
import { GetSensorParameters, SaveChannelGroupParameters, SaveSensorParameters, SensorStorageParameters, SetExternalSpeedSensorState } from '../Storage/ChannelsDataStorage';
import { PlotsManager } from '../uPlot/PlotManager';
import { Group } from './App';
import { MenuItem } from './MenuItem';
const { Panel } = Collapse;

export interface Props {
  group: Group,
  plotsManager?: PlotsManager;
  visible: boolean;
  storage: ParamsStorage;
  onClose: () => void;
}

interface IState {
  trackMaximum: boolean,
  speedPeriod: number,
  avgRatio: number,
  externalSpeedSensor: boolean,
  dataReceived: boolean,
}

export class CellsGroupModal extends React.Component<Props, IState>{

  constructor(prop: Props) {
    super(prop);
    this.state = {
      trackMaximum: this.props.group.channelsInfo.getAbsoluteAnalizerState(),
      speedPeriod: 0,
      avgRatio: 0,
      dataReceived: false,
      externalSpeedSensor: false,
    }
  }

  onOk = async () => {
    this.props.group.channelsInfo.setAbsoluteAnalizer(this.state.trackMaximum);

    try {
      await this.props.group.node.worker.SetAverageRatio(this.state.avgRatio);
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

    await SetExternalSpeedSensorState(this.state.externalSpeedSensor, this.props.group.node.fullSensorInfo.SensorId);
  }

  async componentDidMount() {
    try {
      let holdingRegisters = await this.props.group.node.sensor.GetHoldingRegisters();
      
      this.setState((prev, props) => ({
        speedPeriod: holdingRegisters.SpeedMeasurigPeriod,
        avgRatio: holdingRegisters.AverageRatio,
        dataReceived: true,
      }));

      let sensorparameters = await GetSensorParameters(this.props.group.node.fullSensorInfo.SensorId);
      if (sensorparameters != null)
      {
        this.setState((prev, props) => ({
          externalSpeedSensor: sensorparameters!.externalSpeedSensor,
        }));
      }
    }
    catch
    {
      notification.error({
        message: `Не удалось получить данные ${this.props.group.node.fullSensorInfo.SensorType}`,
        duration: 2,
      });
    }
  }

  onSpeedChanged = (value: number) => this.setState((prev, props) => ({ speedPeriod: value }));
  onAvgChanged = (value: number) =>  this.setState((prev, props) => ({ avgRatio: value }));
  onExternalSpeedSensorChanged = (value: boolean) => {
    this.setState((prev, props) => ({ externalSpeedSensor: value }));
  }

  onTrackMaximumChanged = (value: boolean) =>  this.setState((prev, props) => ({ trackMaximum: value }));

  onSaveParamsToStorage = () =>
  {
    SaveChannelGroupParameters(this.props.group.channelsInfo.channelGroups, this.props.group.node.fullSensorInfo.SensorId);

    notification.success({
      message: `Настройки каналов сохранены.`,
      duration: 2,
    });
  }

  ResetOffset = () =>{
    this.props.group.channelsInfo.setOffset(0);
    this.setState({});
  }

  render() {
    return (

      <Modal title="Общие параметры"
        visible={this.props.visible}
        onOk={event => { this.onOk(); this.props.onClose(); }}
        onCancel={this.props.onClose}
        cancelText={"Отмена"}
        footer = {[
          <Button style={{float:"left"}} 
                title="Запомнить настройки датчика"
                icon={<SaveOutlined 
                onClick={ this.onSaveParamsToStorage }/>}/>,
                <Button onClick={this.props.onClose} title="Отмена">Отмена</Button>,
                <Button onClick={ event => { this.onOk(); this.props.onClose(); } } title="Принять">Принять</Button>,
        ]}
        centered={false}>
        
        
          <Space size={'small'}>
            {
              this.props.group.channelsInfo.channelGroups.map((g, i) =>
              <Checkbox key={i} 
              defaultChecked={g.cellChannel.Style.visible}
              onChange={e => g.cellChannel.Style.visible = e.target.checked}>
                  {g.cellChannel.Style.valueName} </Checkbox>
              )
            }
          </Space>
          <Divider type="horizontal" style={{ height: "100%" }} />
        {
          (!this.state.dataReceived) ? <></> :
            <>
              <MenuItem key={1} label='Период измерения скорости:' children={
                <InputNumber className='vertical-align' 
                             step={1} size="small" 
                             style={{ height: "25px" }} 
                             defaultValue={this.state.speedPeriod} 
                             onChange={this.onSpeedChanged} />
              } />

              <MenuItem key={2} 
                        label='Коэффицент усреднения:' 
                        children={
                          <InputNumber className='vertical-align' 
                                       step={1} 
                                       size="small" 
                                       style={{ height: "25px" }} 
                                       defaultValue={this.state.avgRatio} 
                                       onChange={this.onAvgChanged} />
                           }/>

              <MenuItem key={3} 
                        label='Внешний датчик скорости:' 
                        children={
                          <Checkbox key={4}   
                            checked={this.state.externalSpeedSensor}
                            onChange={(c) => this.onExternalSpeedSensorChanged(c.target.checked) }/>
                           }/>              
              </>
        }

        <MenuItem key={5} 
          label='Отслеживать максимум:' 
          children={
            <Checkbox key={6} 
              defaultChecked={false} 
              onChange={(c) => this.onTrackMaximumChanged(c.target.checked)}>
            </Checkbox> }/>
        
        <MenuItem key={7} 
        label='Тара:' 
        children={
          <div style={{display: "flex", alignItems: "baseline"}}>
            <Button size='small' key={8} onClick={ this.ResetOffset } >Сбросить</Button>

            <p style={{width: "50px", paddingLeft: "10px"}}>
                {this.props.group.channelsInfo.offset().toFixed(this.props.group.node.fullSensorInfo.valueRatio)}
            </p>
            
          </div>
         }/>
      </Modal>
    )
  }
}
