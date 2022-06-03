import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Checkbox, Col, Collapse, Dropdown, Row, Slider } from 'antd';
import { SketchPicker } from 'react-color';
import { ColorChanger } from './ColorChanger';

const { Panel } = Collapse;

  export interface Props {
   channel: CellChannel;
   colorChanged: (channel: CellChannel,  color: string) => void;
  }

   interface IState {
    value: string,
    fontSize: number,
    hide: boolean,
    color: string,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        hide: false,
        value: "",
        color: this.props.channel.Style.fontStyle,
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


    colorChangeHandler = (color: string) =>{
      this.setState((prev, props) => ({
        color: color,
      }));

      this.props.colorChanged(this.props.channel, color);
    }

    render(){
      return (
        <div className='measure-box'>

          <Collapse defaultActiveKey={['0']}>
            <Panel header=
            {
                <div className={`cell-name`} style = {{color: this.state.color}} >
                    {this.props.channel.Style.valueName}
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
              <ColorChanger  baseColor={this.state.color} onColorChange={
                this.colorChangeHandler
              }/>
          </Row>
            </Panel>
          </Collapse>

          <div style={
            {
              display: "flex",
              height: this.state.hide ? "0px" : "auto"
            }
          }>
            <div className={`${this.state.color}`} style = {{color:  this.state.color}}>{this.props.channel.Style.unitsName}</div>
            <div className='right-column' style={{color:  this.state.color, fontSize: `${this.state.fontSize.toString()}px`}}>{this.state.value}</div>
          </div>
        </div>
      )
    }
  }