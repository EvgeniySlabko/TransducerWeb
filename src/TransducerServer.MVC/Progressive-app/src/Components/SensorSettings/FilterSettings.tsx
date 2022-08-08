import { Checkbox, Collapse, InputNumber, Select } from 'antd';
import React from 'react';
import { FilterType } from '../../Storage/ChannelsDataStorage';
import { MenuItem } from '../MenuItem';
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {

  enabled: boolean;
  fc: number;
  filterType: FilterType;
  order: number;

  onFilterEnabledChanged: (value: boolean) => void;
  onFilterFcChanged: (value: number) => void;
  onFilterTypeChanged: (value: FilterType) => void;
  onFilterOrderChanged: (value: number) => void;
}

export class FilterSettings extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }

  render() {
    return (
        <>
          <MenuItem
          label='Фильтр нижних частот:' 
          children={
          <Checkbox
              defaultChecked={this.props.enabled} 
              onChange={(c) => this.props.onFilterEnabledChanged(c.target.checked)}>
          </Checkbox> }/>

            {
              !this.props.enabled ? <></> : 
              <>
                <MenuItem children={
                  <Select 
                    defaultValue={this.props.filterType} 
                    style={{ width: 120 }} 
                    onChange={this.props.onFilterTypeChanged}>
                  <Option value="butterworth">Баттерворта</Option>
                  <Option value="bessel">Бесселя</Option>
                  </Select>
                }  
                label='Тип фильтра:'/>

                <MenuItem children={
                  <InputNumber 
                  size="middle"
                  step={1} min={1} max={12}
                  defaultValue={this.props.order}
                  onChange={this.props.onFilterOrderChanged} />
                } 
                label='Порядок фильтра:'/>

                <MenuItem children={
                <InputNumber size="middle" 
                        step={0.1} min={0.1} max={20000}
                        title='Частота среза'
                        defaultValue={this.props.fc}
                        onChange={ (val) => this.props.onFilterFcChanged(val)} />
                } 
                label='Частота среза(Гц):'/>                 
              </>
            }    
        </>
    )
  }
}
