import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../../dist/bundle';
import React from 'react';

  export class Cell extends React.Component{

    render(){
        return (
            <div className='measure-box'>
                <div className='cell-info'></div>
            </div>
        )
    }
  }

