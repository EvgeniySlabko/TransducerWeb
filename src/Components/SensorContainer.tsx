import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../../dist/bundle';
import React from 'react';
import { SensorCell } from './SensorCell';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { hashCode } from '../Common/Common';

interface Props {
  sensorService: SensorController,
}

interface IState{
  nodes: [ISingleComponentSensor, FullSensorInfo] []
}

export class SensorContainer extends React.Component<Props, IState>{

  constructor(props: Props) {
    super(props)
    this.state = {
      nodes: [],
    }

    this.props.sensorService.onDispatch.addListener("Add", this.AddSensor)
  }

  AddSensor = (args: SensorControllerArgs) =>
  {
    this.state.nodes.push([args.sensor, args.fullSensorInfo]);
    this.setState((prev, props) => ({}));
  }

  RemoveCellHandle = (sensor: ISingleComponentSensor) =>
  {
    this.removeSensor(sensor);
  }

  SensorDisconnecthandle = (sensor: ISingleComponentSensor, info: FullSensorInfo) =>
  {
    this.removeSensor(sensor);
  }

  removeSensor = (sensor: ISingleComponentSensor) =>{
    let index = this.state.nodes.findIndex(c => c[0] == sensor);
    this.state.nodes.splice(index, 1);
    this.setState((prev, props) => (
        {
          nodes: this.state.nodes,
        }
      )
    );
  }

  render()
  {
    return(
      <div className='sensors-container'>
        {
           this.state.nodes.map((item, i) => {
             let key = hashCode(JSON.stringify(item));
            return <SensorCell key={item[1].SensorType} sensorInfo= {() => [item[0],item[1]]} 
              sensorRemoveHandle ={this.RemoveCellHandle}/>})
        }
      </div>
    ) 
  }
 }
