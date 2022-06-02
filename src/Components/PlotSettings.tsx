import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Checkbox, Col, Collapse, Row, Slider } from 'antd';
const { Panel } = Collapse;

  export interface Props {
   channel: CellChannel;
  }

   interface IState {
    value: string,
    fontSize: number,
    hide: boolean,
   }

  export class PlotSettings extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        hide: false,
        value: "",
        fontSize: this.props.channel.Style.fontSize,
      }

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
              height: this.state.hide ? "0px" : "auto"
            }
          }>
            <div className={`${this.props.channel.Style.fontStyle}`}>{this.props.channel.Style.unitsName}</div>
            <div className='right-column' style={{fontSize: `${this.state.fontSize.toString()}px`}}>{this.state.value}</div>
          </div>
        </div>
      )
    }
  }