import React from 'react';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Checkbox, Collapse, InputNumber, Row, Slider } from 'antd';
import { ColorChanger } from './ColorChanger';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ChannelsGroup } from '../Channel/AllChannelsFactory';
import { CellModal } from './CellModal';
import { SettingOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

  export interface Props {
   channelGroup: ChannelsGroup;
   plotViewController: ViewController | null;
  }

   interface IState {
    value: string,
    hide: boolean,
    overload: boolean,
    modalVisible: boolean,
   }

  export class Cell extends React.Component<Props, IState>{

    constructor(prop: Props)
    {
      super(prop);

      this.state = {
        hide: false,
        value: "",
        overload: false,
        modalVisible: false
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
        value: args.data.data[0].toFixed(this.props.channelGroup.cellChannel.Style.accurency),
      }));
    }

    limitHandler = (state: boolean) =>{
      this.props.channelGroup.plotChannel.Style.drawLimits = state;
    }

    onModalClose =() =>{
      this.setState((prev, props) => ({
        modalVisible: false,
      }));
    }

    onShow = () => {
      this.setState((prev, props) => ({
        modalVisible: true,
      }));
    }
    render(){
      return (
        <div className='measure-box'>

          <div className='horizontal-flex'>
            
              
              <div className={`cell-name`} style = {{color: this.props.channelGroup.cellChannel.Style.fontStyle, background: this.state.overload ? "red" : "white"}} >
                  {this.props.channelGroup.cellChannel.Style.valueName + ` ${"(" + this.props.channelGroup.cellChannel.Style.unitsName + ")"}`}
              </div>
              <Button className='horizontal-padding' onClick={event => { event.stopPropagation(); this.onShow(); } } key={1} 
              icon={<SettingOutlined onClick={event => { event.stopPropagation(); this.onShow(); } } />} />

              <CellModal 
                group = {this.props.channelGroup} 
                plotViewController={this.props.plotViewController} 
                visible={this.state.modalVisible} 
                onClose={ this.onModalClose }></CellModal>
              
          </div>
          <div style={
            {
              display: "flex",
              height: this.state.hide ? "0px" : "auto"
            }
          }>
            <div className='right-column' 
            style={{color:  this.props.channelGroup.cellChannel.Style.fontStyle, 
            fontSize: `${this.props.channelGroup.cellChannel.Style.fontSize.toString()}px`}}>{this.state.value}</div>

            
          </div>
        </div>
      )
    }
  }