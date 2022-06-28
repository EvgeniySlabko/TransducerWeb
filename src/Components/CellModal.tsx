import React from 'react';
import { Checkbox, Collapse, InputNumber, Modal, Slider } from 'antd';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { ChannelsGroup } from '../Channel/AllChannelsFactory';
import { HexColorPicker } from 'react-colorful';

const { Panel } = Collapse;

  export interface Props {
    group: ChannelsGroup,
    plotViewController: ViewController | null;
    visible: boolean;
    onClose: () => void;
  }

  interface IState {
    accurency: number
    color: string
    limits: boolean
  }

  export class CellModal extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
        accurency: this.props.group.cellChannel.Style.accurency,
        color: this.props.group.cellChannel.Style.fontStyle,
        limits: this.props.group.plotChannel.Style.drawLimits
      }
    }

    colorChangeHandler = (color: string) => {
      this.setState((prev, props) => ({color: color,}));
    }

    onOk = () =>
    {
      this.props.group.cellChannel.Style.accurency = this.state.accurency;
      this.props.group.plotChannel.Style.color = this.state.color;
      this.props.group.savingChannel.Style.color = this.state.color;
      this.props.group.cellChannel.Style.fontStyle = this.state.color;
      this.props.group.plotChannel.Style.drawLimits = this.state.limits;
    }

    limitHandler = (state: boolean) =>{
      this.setState((prev, props) => ({limits: state,}));
    }

    changeAccurency = (accurency: number) =>
    {
      this.setState((prev, props) => ({accurency: accurency}));
    }

    render() {
      return (
        <div onClick={e => e.stopPropagation()}>
          <Modal title="Параметры датчика" 
          visible={this.props.visible} 
          onCancel={e => this.props.onClose()} 
          onOk={event => { this.onOk(); this.props.onClose(); }}
          centered={false}>
            <div className='vertical-flex'>
              <div className='horizontal-flex'>
                <label className='margin'>Шрифт: </label>
                <Slider style={{width: "60%"}} 
                        defaultValue={this.props.group.cellChannel.Style.fontSize} 
                        disabled={false} min = {10} max = {50} 
                        onChange = {(e) => { this.props.group.cellChannel.Style.fontSize = e; }} />
              </div>
            
              <div className='horizontal-flex'>
                <label className='margin'>Цвет графика: </label>
                <HexColorPicker color={this.props.group.cellChannel.Style.fontStyle} onChange={this.colorChangeHandler} />
              </div>
            
              <div className='horizontal-flex'>
                <label className='margin vertical-alignment'>Знаков после запятой: </label>
                <div className='margin'>
                  <InputNumber className='margin vertical-alignment' step = {1} size="small" style={{height: "25px" }} min={0} max={5} value={this.state.accurency} onChange={this.changeAccurency} />
                </div>
              </div>
            
              <div className='horizontal-flex'>
                <label className='margin vertical-alignment'>Пределы измерений: </label>   
                <div className='margin'>
                  <Checkbox disabled={this.props.group.cellChannel.Style.limits === undefined}
                            defaultChecked = {this.state != undefined && this.props.group.plotChannel.Style.drawLimits}
                            onChange={(s) => this.limitHandler(s.target.checked)}/>
                </div>
              </div>
            
          </div>
          </Modal>
        </div>
      )
    }
  }


  /*
  <InputNumber step={0.01 * this.props.group.node.fullSensorInfo.MaxValue}
            style={{ width: "auto" }}
            min={0} max={this.props.group.node.fullSensorInfo.MaxValue}
            value={this.state.treshold} onChange={this.tresholdChanged} />
  */
