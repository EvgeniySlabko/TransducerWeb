import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { ChannelStyle } from '../Channel/ChannelStyle/ChannelStyle';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Checkbox, Col, Collapse, Dropdown, InputNumber, Row, Slider } from 'antd';
import { SketchPicker } from 'react-color';

const { Panel } = Collapse;

  export interface Props {
   baseColor: string,
   onColorChange: (cssColor: string) => void
  }

   interface IState {
    r: number,
    g: number,
    b: number,
   }

  export class ColorChanger extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      let hex = this.props.baseColor.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if(hex.length == 3){
            hex = hex.replace(/(.)/g, '$1$1');

        }
        
      this.state = {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16),
      }
      
    }

    changeHandlerR = (value: number) =>
    {
        this.setState((prev, props) => ({
            r: value,
          }));

          this.dispatch(value, this.state.g, this.state.b);
    }

    changeHandlerG = (value: number) =>
    {
        this.setState((prev, props) => ({
            g: value,
          }));

          this.dispatch(this.state.r, value, this.state.b);
    }

    changeHandlerB = (value: number) =>
    {
        this.setState((prev, props) => ({
            b: value,
          }));

        this.dispatch(this.state.r, this.state.g, value);
    }

    dispatch = (r: number, g: number, b: number) =>
    {
        this.props.onColorChange(
                 '#' +
                ((0|(1<<8) + r).toString(16)).substr(1) +
                ((0|(1<<8) + g ).toString(16)).substr(1) +
                ((0|(1<<8) + b ).toString(16)).substr(1)
        );
    }

    render(){
      return (
        <div style={{
            display: "flex",
        }}>
            <InputNumber step = {40} size="small" style={{width: "auto", color: "red"}} min={0} max={255} value={this.state.r} onChange={this.changeHandlerR} />
            <InputNumber step = {40} size="small" style={{width: "auto", color: "green"}} min={0} max={255} value={this.state.g} onChange={this.changeHandlerG} />
            <InputNumber step = {40} size="small" style={{width: "auto", color : "blue"}}  min={0} max={255} value={this.state.b} onChange={this.changeHandlerB} />        
        </div>
      )
    }
  }