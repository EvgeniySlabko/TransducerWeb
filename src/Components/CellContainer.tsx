import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Cell } from './Cell';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { CreateAllSensorCellChannels } from '../Channel/Channel/CellChannelFactory';
import { hashCode } from '../Common/Common';


  export interface Props {
    sensorController: SensorController
  }

  interface IState {
    channels: CellChannel[],
   }

  export class CellContainer extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        channels: [],
      };

      prop.sensorController.onDispatch.addListener("Add", (args: SensorControllerArgs) =>{
      let cellChannels = CreateAllSensorCellChannels(args.sensor, args.fullSensorInfo);

      this.setState((prev, props) => ({
          channels: this.state.channels.concat(cellChannels),
        }));
      });
    }

    cellCloseHandler = (channel: CellChannel)=>
    {
      let index = this.state.channels.findIndex(c => c === channel);
      this.state.channels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    private counter: number = 1
    render(){
        return (
            <div id="cell-container" className="cell-container">
              {
                
                this.state.channels.map((item, i) => {
                  let k = hashCode(JSON.stringify(item));
                  return <Cell key={item.Style.id} channel={item} cellCloseHandler = {this.cellCloseHandler}/>
                })
              }
            </div>
        )
    }
  }

