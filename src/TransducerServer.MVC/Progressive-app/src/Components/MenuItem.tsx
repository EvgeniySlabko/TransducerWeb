import React from 'react';
import { Checkbox, Collapse, InputNumber, Modal, notification } from 'antd';
import { Group } from './App';
import { PlotsManager } from '../uPlot/PlotsManager';
import { ParamsStorage } from '../Storage/AppStorage';
const { Panel } = Collapse;

export interface Props {
  children: React.ReactElement,
  label: string,
  className?: string,
}

export class MenuItem extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }

  render() {
    const children = this.props.children;
    return (
      <>
        <div className={this.props.className ? this.props.className : 'horizontal-flex'}>
          <label className='margin vertical-align'>{this.props.label}</label>
          <div className='margin horizontal-flex'>
            {this.props.children}
          </div>
        </div>

      </>
    )
  }
}
