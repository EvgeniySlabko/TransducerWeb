import { Checkbox, Collapse, InputNumber, Modal, Slider } from 'antd';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { ChannelsGroup } from '../Channel/AllChannelsFactory';
import { PlotsManager } from '../uPlot/PlotManager';
import { MenuItem } from './MenuItem';

const { Panel } = Collapse;

export interface Props {
  group: ChannelsGroup,
  plotsManager?: PlotsManager;
  visible: boolean;
  onClose: () => void;
}

interface IState {
  accurency: number
  color: string
  limits?: boolean
}

export class CellModal extends React.Component<Props, IState>{

  constructor(prop: Props) {
    super(prop);
    this.state = {
      accurency: this.props.group.cellChannel.Style.accurency,
      color: this.props.group.cellChannel.Style.color,
      limits: this.props.group.plotChannel.Style.drawLimits
    }
  }

  colorChangeHandler = (color: string) => {
    this.setState((prev, props) => ({ color: color, }));
  }

  onOk = () => {
    this.props.group.cellChannel.Style.accurency = this.state.accurency;
    this.props.group.cellChannel.Style.color = this.state.color;
    
    this.props.group.plotChannel.Style.color = this.state.color;
    this.props.group.plotChannel.Style.drawLimits = this.state.limits;

    this.props.group.savingChannel.Style.color = this.state.color;
    this.props.group.savingChannel.Style.drawLimits = this.state.limits;
  }

  limitHandler = (state: boolean) => {
    this.setState((prev, props) => ({ limits: state, }));
  }

  changeAccurency = (accurency: number) => {
    this.setState((prev, props) => ({ accurency: accurency }));
  }

  render() {
    return (
      <div onClick={e => e.stopPropagation()}>
        <Modal title="Параметры канала"
          visible={this.props.visible}
          onOk={event => { this.onOk(); this.props.onClose(); }}
          onCancel={this.props.onClose}
          centered={false}>
          <div className='vertical-flex'>
            <MenuItem label='Шрифт:' children={
              <Slider style={{ width: "200px" }}
                defaultValue={this.props.group.cellChannel.Style.fontSize}
                disabled={false} min={10} max={50}
                onChange={(e) => { this.props.group.cellChannel.Style.fontSize = e; }} />
            } />

            <MenuItem label='Цвет графика:' children={
              <HexColorPicker color={this.props.group.cellChannel.Style.color} 
                              onChange={this.colorChangeHandler} />
            } />

            <MenuItem label='Знаков после запятой:' children={
              <InputNumber className='vertical-alignment' 
                           size="small" 
                           style={{ height: "25px" }}
                           step={1} min={0} max={5} 
                           value={this.state.accurency} 
                           onChange={this.changeAccurency} />
            } />

            <MenuItem label='Пределы измерений:' children={
              <Checkbox disabled={this.props.group.cellChannel.Style.limits === undefined}
                defaultChecked={this.state != undefined && this.props.group.plotChannel.Style.drawLimits}
                onChange={(s) => this.limitHandler(s.target.checked)} />
            } />
          </div>
        </Modal>
      </div>
    )
  }
}