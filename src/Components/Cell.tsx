import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { CellMenu } from './CellMenu';
import { Col, Collapse, Row, Slider } from 'antd';
const { Panel } = Collapse;

  export interface Props {
   channel: CellChannel;
  }

   interface IState {
    value: string,
    fontSize: number,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        value: "",
        fontSize: this.props.channel.Style.fontSize,
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
        value: args.data.data[0].toFixed(this.props.channel.Style.accurency),
      }));
    }

    render(){
      return (
        <div className='measure-box'>

          <Collapse defaultActiveKey={['0']}>
            <Panel header=
            {
              <div className={`cell-name ${this.props.channel.Style.fontStyle}`}>
                <p>
                  {this.props.channel.Style.valueName}
                </p>
              </div>
            } key="1">
            <Row>
            
              <div style={{display: "flex", width: "100%", alignItems: "center" }}>
              <Slider style={{width: "60%"}} defaultValue={this.state.fontSize} disabled={false} min = {10} max = {50} onChange = {(e) => 
                {
                  this.setState((prev, props) => ({
                    fontSize: e,
                  }));
                }} />
              <h6 style={{margin: "2px", float: "right"}}>Шрифт</h6>
              </div>
              
            
          </Row>
            </Panel>
          </Collapse>

          <div style={
            {
              display: "flex",
            }
          }>
            <div className={`${this.props.channel.Style.fontStyle}`}>{this.props.channel.Style.unitsName}</div>
            <div className='right-column' style={{fontSize: `${this.state.fontSize.toString()}px` }}>{this.state.value}</div>
          </div>
        </div>
      )
    }
  }