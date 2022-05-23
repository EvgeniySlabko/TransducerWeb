import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';

  export interface Props {
   channel: CellChannel;
  }

   interface IState {
    value: string,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        value: "",
      }
      
      this.props.channel.onClose.sub(this.closeHandler);
      this.props.channel.onData.sub(this.dataHandler);
    }

    closeHandler = (channel: CellChannel, args: ChannelCloseArgs) =>
    {
        this.setState((prev, props) => ({
          value: ""
        }));

        this.props.channel.onClose.unsub(this.closeHandler);
        this.props.channel.onData.unsub(this.dataHandler);
    }

    dataHandler = (channel: CellChannel, args: ChannelDataArgs) =>
    {
      this.setState((prev, props) => ({
        value: args.data.data[0].toFixed(2),
        }));
    }

    render(){
      return (
        <div id="cell-container" className={`measure-box grow ${this.props.channel.Style.cellStyle}`}>
          <div className='cell-info'>
            <div className="cell-name">
            {
              this.props.channel.Style.valueName
            } 
            </div>
            <div className="cell-units">
                {this.props.channel.Style.unitsName} 
            </div>
          </div>

          <div className="cell-measure-content">
            <p id="value" className={`cell-measure ${this.props.channel.Style.fontStyle}`}>
                {this.state.value}
            </p>
            <p>
                Дополнительная информация
            </p>

          </div>
        </div>
      )
    }
  }