import { Button, Checkbox, Collapse, Divider, InputNumber, Select, Space } from 'antd';
import React from 'react';
import { MenuItem } from '../MenuItem';
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {
  tareAccurency: number

  trackMaximum: boolean;
  avgRatio: number;
  speedPeriod: number;
  externalSpeedSensor: boolean;
  offset: number;
  visibleChannels: [string, boolean][];

  onOffsetChanged: (value: number) => void
  onExternalSpeedSensorChanged: (value: boolean) => void;
  onTrackMaximumChanged: (value: boolean) => void;
  onSpeedPeriodChanged: (value: number) => void;
  onVisibleChannelsChanged: (index: number, value: boolean) => void;
  onAvgChanged: (value: number) => void;
}


export class SensorParameters extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }

  render() {
    return (
    <>    
      <Space size={'small'}>
        {
          this.props.visibleChannels.map((c, i) =>
          <Checkbox key={i} 
          defaultChecked={c[1]}
          onChange={(e) => this.props.onVisibleChannelsChanged(i, e.target.checked)}>
              {c[0]} </Checkbox>
          )
        }
      </Space>
      
    <Divider type="horizontal" />
    <MenuItem label='Период измерения скорости(мс):' children={
      <InputNumber className='vertical-align' 
                   min={1} max={5000}
                   step={1} size="small" 
                   style={{ height: "25px" }} 
                   defaultValue={this.props.speedPeriod} 
                   onChange={this.props.onSpeedPeriodChanged} />
      } />

    <MenuItem label='Коэффицент усреднения:' 
      children={
      <InputNumber className='vertical-align' 
                   min={1} max={5000}
                   step={1} 
                   size="small" 
                   style={{ height: "25px" }} 
                   defaultValue={this.props.avgRatio} 
                   onChange={this.props.onAvgChanged} />
      }/>

  <MenuItem label='Внешний датчик скорости:' 
  children={
    <Checkbox 
      checked={this.props.externalSpeedSensor}
      onChange={(c) => this.props.onExternalSpeedSensorChanged(c.target.checked) }/>
        }/>              
          
  <MenuItem label='Отслеживать максимум:' 
    children={
    <Checkbox
      checked= {this.props.trackMaximum}
      onChange={(c) => this.props.onTrackMaximumChanged(c.target.checked)}/>
    }/>
  
  <MenuItem label='Тара:' 
    children={
      <div style={{display: "flex", alignItems: "baseline"}}>
        <Button size='small'
         onClick={ () => this.props.onOffsetChanged(0) } >Сбросить</Button>
        <p style={{width: "50px", paddingLeft: "10px"}}>
            {this.props.offset.toFixed(this.props.tareAccurency)}
        </p>
      </div>
    }/>
  </>
    )
  }
}
