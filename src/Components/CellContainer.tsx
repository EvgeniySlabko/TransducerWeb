import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Cell } from './Cell';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { CreateAllSensorCellChannels } from '../Channel/Channel/CellChannelFactory';
import { hashCode } from '../Common/Common';
import { DataCells } from '../ViewsControllers/DataCells';


  export interface Props {
    dataCells: CellChannel[],
  }

  export class CellContainer extends React.Component<Props>{
    
    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        channels: [],
      };
    }

    private counter: number = 1
    render() {
        return (
            <div id="cell-container" className="cell-container">
              {
                
                this.props.dataCells.map((item, i) => {
                  return <Cell key={item.Style.id} channel={item}/>
                })
              }
            </div>
        )
    }
  }

