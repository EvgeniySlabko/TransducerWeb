import React from 'react';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Checkbox, Collapse, InputNumber, Row, Slider } from 'antd';
import { ColorChanger } from './ColorChanger';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ChannelsGroup } from '../Channel/AllChannelsFactory';

const { Panel } = Collapse;

  export interface Props {
   channelGroup: ChannelsGroup;
   plotViewController: ViewController | null;
  }

   interface IState {
    value: string,
    fontSize: number,
    hide: boolean,
    color: string,
    accurency: number,
    overload: boolean,
    limits?: boolean,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        hide: false,
        value: "",
        color: this.props.channelGroup.cellChannel.Style.fontStyle,
        fontSize: this.props.channelGroup.cellChannel.Style.fontSize,
        accurency: this.props.channelGroup.cellChannel.Style.accurency,
        overload: false,
        limits: this.props.channelGroup.cellChannel.Style.limits,
      }
      
      this.props.channelGroup.cellChannel.onClose.sub(this.closeHandler);
      this.props.channelGroup.cellChannel.onData.sub(this.dataHandler);
    }

    closeHandler = (channel: CellChannel, args: ChannelCloseArgs) =>
    {
        this.setState((prev, props) => ({
          value: ""
        }));

        this.props.channelGroup.cellChannel.onClose.unsub(this.closeHandler);
        this.props.channelGroup.cellChannel.onData.unsub(this.dataHandler);
    }

    dataHandler = (channel: CellChannel, args: ChannelDataArgs) =>
    {
      let value = args.data.data[0];
      let overload = false;
      if (this.props.channelGroup.cellChannel.Style.minValue && value <= this.props.channelGroup.cellChannel.Style.minValue)
      {
        overload = true;
      }

      if (this.props.channelGroup.cellChannel.Style.maxValue && value >= this.props.channelGroup.cellChannel.Style.maxValue)
      {
        overload = true;
      }

      if (this.state.overload != overload)
      {
        this.setState((prev, props) => ({
          overload: overload,
        }));
      }

      this.setState((prev, props) => ({
        value: args.data.data[0].toFixed(this.state.accurency),
      }));
    }

    colorChangeHandler = (color: string) => {

      this.props.channelGroup.plotChannel.Style.color = color;
      this.props.channelGroup.savingChannel.Style.color = color;
      this.setState((prev, props) => ({color: color,}));
    }

    limitHandler = (state: boolean) =>{
      this.props.channelGroup.plotChannel.Style.drawLimits = state;
    }

    render(){
      return (
        <div className='measure-box'>

          <Collapse defaultActiveKey={['0']}>
            <Panel header=
            {
                <div className={`cell-name`} style = {{color: this.state.color, background: this.state.overload ? "red" : "white"}} >
                    {this.props.channelGroup.cellChannel.Style.valueName + ` ${"(" + this.props.channelGroup.cellChannel.Style.unitsName + ")"}`}
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
              
              <div style={{display: "flex", width: "100%", alignItems: "center" }}>
              <InputNumber step = {1} size="small" style={{width: "auto"}} min={0} max={5} value={this.state.accurency} onChange={
                  (value: number) => {
                    this.setState((prev, props) => ({
                      accurency: value,
                    }));
                  }
                } />
                <h6 style={{margin: "2px", float: "right"}}>Знаков после запятой</h6>

              </div>
              
                
                <Checkbox disabled={this.state.limits === undefined} checked = {this.state.limits != undefined && this.state.limits} style={{fontWeight:"3px"}} onChange={(s) =>
                {
                  this.setState((prev, props) => ({
                    limits: s.target.checked,
                  }));

                  this.limitHandler(s.target.checked);
                }}>Пределы измерений</Checkbox>
                
              
          </Row>
            </Panel>
          </Collapse>
          
          <div style={
            {
              display: "flex",
              height: this.state.hide ? "0px" : "auto"
            }
          }>
            
            <div className='right-column' style={{color:  this.state.color, fontSize: `${this.state.fontSize.toString()}px`}}>{this.state.value}</div>
          </div>
        </div>
      )
    }
  }