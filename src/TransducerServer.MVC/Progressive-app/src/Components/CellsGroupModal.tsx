import { SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, InputNumber, Modal, notification } from 'antd';
import React from 'react';
import { ParamsStorage } from '../Storage/AppStorage';
import { GetSensorParameters, SaveChannelGroupParameters, SaveSensorParameters, SensorStorageParameters } from '../Storage/ChannelsDataStorage';
import { PlotsManager } from '../uPlot/PlotsManager';
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
  }

  async componentDidMount() {
    try {
      let holdingRegisters = await this.props.group.node.sensor.GetHoldingRegisters();
      let sensorparameters = await GetSensorParameters(this.props.group.node.fullSensorInfo.SensorId);
      let externalSpeedSensor = sensorparameters ? sensorparameters.externalSpeedSensor : false;

      this.setState((prev, props) => ({
        speedPeriod: holdingRegisters.SpeedMeasurigPeriod,
        avgRatio: holdingRegisters.AverageRatio,
        externalSpeedSensor: externalSpeedSensor,
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

  onSpeedChanged = (value: number) => this.setState((prev, props) => ({ speedPeriod: value }));
  onAvgChanged = (value: number) =>  this.setState((prev, props) => ({ avgRatio: value }));
  onExternalSpeedSensorChanged = (value: boolean) => 
  {
    this.setState((prev, props) => ({ externalSpeedSensor: value }));
  }
  onTrackMaximumChanged = (value: boolean) =>  this.setState((prev, props) => ({ trackMaximum: value }));

  onSaveParamsToStorage = () =>
  {
    SaveChannelGroupParameters(this.props.group.channelsInfo.channelGroups, this.props.group.node.fullSensorInfo.SensorId);
    let sensorParameters: SensorStorageParameters = {
      avgRatio: this.state.avgRatio,
      externalSpeedSensor: this.state.externalSpeedSensor,
      speedMeasurmentPeriod: this.state.speedPeriod,
    }

    SaveSensorParameters(sensorParameters, this.props.group.node.fullSensorInfo.SensorId);
  }

  render() {
    return (

      <Modal title="Общие параметры."
        visible={this.props.visible}
        onOk={event => { this.onOk(); this.props.onClose(); }}
        onCancel={this.props.onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered={false}>


        <Button className='save-sensor-params-button'
                onClick={ this.onSaveParamsToStorage } 
                icon={<SaveOutlined 
                onClick={ this.onSaveParamsToStorage }/>}/>
        
        <MenuItem className='vertical-flex' 
        label='Отображение каналов:'
        children={
          <div>
            {
              this.props.group.channelsInfo.channelGroups.map((g, i) =>
              <Checkbox key={i} 
              defaultChecked={g.cellChannel.Style.visible}
              onChange={e => g.cellChannel.Style.visible = e.target.checked}>
                  {g.cellChannel.Style.valueName} </Checkbox>
              )
            }
          </div>
        } />
          
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

              <Checkbox key={3} 
                        className='margin'
                        defaultChecked={this.state.externalSpeedSensor}
                        onChange={(c) => this.onExternalSpeedSensorChanged(c.target.checked) }>
                        Внешний датчик скорости</Checkbox>
              </>
        }

        <Checkbox key={6} 
                  className='margin' 
                  defaultChecked={false} 
                  onChange={(c) => this.onTrackMaximumChanged(c.target.checked)}>
                  Отслеживать максимум.</Checkbox>
      </Modal>
    )
  }
}
