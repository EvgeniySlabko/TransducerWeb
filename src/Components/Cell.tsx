import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';

  export interface Props {
   channel: CellChannel;
   cellCloseHandler: (channel: CellChannel) => void
  }

  
   interface IState {
    value: string,
    channel: CellChannel,
    cellCloseHandler: (channel: CellChannel) => void,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        value: "",
        cellCloseHandler: this.props.cellCloseHandler,
        channel: this.props.channel
      }
      
      this.props.channel.onClose.sub(this.closeHandler);
      this.props.channel.onData.sub(this.dataHandler);
    }

    closeHandler = (channel: CellChannel, args: ChannelCloseArgs) =>
    {
        this.setState((prev, props) => ({
          value: ""
        }));

        this.state.channel.onClose.unsub(this.closeHandler);
        this.state.channel.onData.unsub(this.dataHandler);
        this.state.cellCloseHandler(this.state.channel);
    }

    dataHandler = (channel: CellChannel, args: ChannelDataArgs) =>
    {
      this.setState((prev, props) => ({
        value: args.data.data[0].toFixed(2),
        }));
    }

    render(){
      return (
        <div id="cell-container" className={`measure-box ${this.state.channel.Style.cellStyle}`}>
          <div className='cell-info'>
            <div className="cell-name">
            {
              this.state.channel.Style.valueName
            } 
            </div>
            <div className="cell-units">
                {this.state.channel.Style.unitsName} 
            </div>
          </div>

          <div className="cell-measure-content">
            <p id="value" className={`cell-measure ${this.state.channel.Style.fontStyle}`}>
                {this.state.value}
            </p>
          </div>
        </div>
      )
    }
  }