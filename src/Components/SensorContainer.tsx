import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { SensorCell } from './SensorCell';
import { SensorControllerArgs } from '../SensorController';
import { SensorWorker } from '../Sensor/SensorWorker';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorNode } from './App';

interface Props {
  sensorsNodes: SensorNode[],
  RemoveSensor: (sensor: ISingleComponentSensor) => void,
}

export class SensorContainer extends React.Component<Props>{

  constructor(props: Props) {
    super(props)
    this.state = {
      nodes: [],
    }

  }

  RemoveCellHandle = (sensor: ISingleComponentSensor) => 
  { 
    this.props.RemoveSensor(sensor); 
  }

  //SensorDisconnecthandle = (sensor: ISingleComponentSensor, info: FullSensorInfo) => { this.removeSensor(sensor); }

  render()
  {
    return(
      <div className='sensors-container'>
      <div className='sensor-cell grow-width'>
          <div className='sensor-name'>
            Name
          </div >
    
          <div className="sensor-control-panel">
              <button className='btn btn-outline-primary sensor-pannel-button'>
                <span className='glyphicon glyphicon-remove'>
                </span>
              </button>
              <button  className='btn btn-outline-primary sensor-pannel-button'>
              {"{0}"}
            </button>
          </div >
        </div>
        </div>
    ) 
  }
 }

 /*
 <div className='sensors-container'>
        {
           this.props.sensorsNodes.map((item, i) => {
            return <SensorCell key={item.fullSensorInfo.SensorType} 
            sensorNode = {item}
            sensorRemoveHandle ={this.RemoveCellHandle}/>})
        }
      </div>
 */