import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../../dist/bundle';
import React from 'react';

export interface Props {
    sensorInfo: () => [ISingleComponentSensor, FullSensorInfo],
    sensorRemoveHandle: (sensor: ISingleComponentSensor) => void;
  }

  interface IState {
    sensorInfo: () => [ISingleComponentSensor, FullSensorInfo],
    sensorRemoveHandle: (sensor: ISingleComponentSensor) => void;
  }

  export class SensorCell extends React.Component<Props, IState>{
    constructor(props: Props) {
        super(props)

        this.state = {
          sensorInfo: this.props.sensorInfo,
          sensorRemoveHandle: this.props.sensorRemoveHandle,
        }
        this.sensorCloseClickHandle = this.sensorCloseClickHandle.bind(this);
        this.state.sensorInfo()[0].onClose.sub(this.sensorRemoveHandle)
    }

    sensorRemoveHandle = (sensor: ISingleComponentSensor, args: any) =>
    {
      this.state.sensorRemoveHandle(sensor);
    }

    sensorCloseClickHandle = async () =>
    {
      this.state.sensorInfo()[0].onClose.unsub(this.sensorRemoveHandle);
      await this.state.sensorInfo()[0].CloseConnection();
      this.state.sensorRemoveHandle(this.state.sensorInfo()[0]);
    }

    render(){
      return (    
        <div className='sensor-cell'>
          <div className='sensor-name'>
            {this.state.sensorInfo()[1].SensorType}
          </div >
    
          <div className='sensor-control-panel'>
              <button onClick={this.sensorCloseClickHandle} className='btn btn-outline-primary sensor-pannel-button'>
                <span className='glyphicon glyphicon-remove'>
                </span>
              </button>
          </div >
        </div>
      )
    }
  }

