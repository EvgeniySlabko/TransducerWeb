import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorWorker } from '../Sensor/SensorWorker';
import { SensorNode } from './App';

  export interface Props {

    sensorNode: SensorNode,
    sensorRemoveHandle: (sensor: ISingleComponentSensor) => void;
  }

  export class SensorCell extends React.Component<Props>{
    constructor(props: Props) {
        super(props)
        
        this.sensorCloseClickHandle = this.sensorCloseClickHandle.bind(this);
    }

    sensorCloseClickHandle = async () =>
    {
      this.props.sensorRemoveHandle(this.props.sensorNode.sensor);
    }

    sensorSetNullHandle = async () =>
    {
      this.props.sensorNode.setCurrentOffsetValue();
    }

    render(){
      return (    
        <div className='sensor-cell'>
          <div className='sensor-name'>
            {this.props.sensorNode.fullSensorInfo.SensorType}
          </div >
    
          <div className='sensor-control-panel'>
              <button onClick={this.sensorCloseClickHandle} className='btn btn-outline-primary sensor-pannel-button'>
                <span className='glyphicon glyphicon-remove'>
                </span>
              </button>
              <button onClick={this.sensorSetNullHandle} className='btn btn-outline-primary sensor-pannel-button'>
              {"{0}"}
            </button>
          </div >
        </div>
      )
    }
  }