import React from 'react';
import { CellChannel, ChannelCloseArgs, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Checkbox, Collapse, InputNumber, Row, Slider } from 'antd';
import { PlotsManager } from '../uPlot/plotsManager';
import { ChannelsGroup } from '../Channel/AllChannelsFactory';
import { CellModal } from './CellModal';
import { SettingOutlined } from '@ant-design/icons';

export interface Props {
  value?: string
  fontStyle: string
  fontSize: number
  hide: boolean
}

export class CellValue extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }


  render() {
    return (
      <div className='measure-box'>

        <div className='horizontal-flex'>


        </div>
        <div style={
          {
            display: "flex",
            height: this.props.hide ? "0px" : "auto"
          }}>

          <div className='right-column'
            style={{
              color: this.props.fontStyle,
              fontSize: `${this.props.fontSize.toString()}px`
            }}>{this.props.value}</div>

        </div>
      </div>
    )
  }
}