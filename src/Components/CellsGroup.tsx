import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Card, Collapse, Dropdown, Menu, notification, Radio, Space } from 'antd';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Cell } from './Cell';
import { Group } from './GroupsContainer';
const { Panel } = Collapse;


  export interface Props {
    group: Group 
    sensorRemove: (sensor: ISingleComponentSensor) => void,
  }

  export class CellsGroup extends React.Component<Props>{
    
    constructor(prop: Props)
    {
      super(prop);
    }

    render() {
        return (
          <Collapse defaultActiveKey={['1']}>
            <Panel header={
              <Dropdown.Button onClick={event => event.stopPropagation()} overlay={<Menu
                items={[
                  {
                    key: '1',
                    onClick: (e) => 
                    {
                      e.domEvent.stopPropagation();
                      this.props.sensorRemove(this.props.group.node.sensor);
                    },
                    label: (
                      <a target="_blank" rel="noopener noreferrer">
                        Удалить
                      </a>
                    ),
                  },
                  {
                    key: '2',
                    onClick: (e) => {
                      e.domEvent.stopPropagation();
                      let currentOffset = this.props.group.node.setCurrentOffsetValue();
                      notification.success({
                        message: `Смещение установлено для датчика ${this.props.group.node.fullSensorInfo.SensorType} - ${currentOffset.toFixed(2)}${this.props.group.node.fullSensorInfo.UnitValueName}`,
                        duration: 2,
                      });
                    },
                    label: (
                      <a target="_blank" rel="noopener noreferrer">
                        {"{0}"}
                      </a>
                    ),
                  }
                ]}
              />} placement="bottom" icon={<SettingOutlined onClick={event => event.stopPropagation()}/>}>
              {this.props.group.node.fullSensorInfo.SensorType}
            </Dropdown.Button>
            } key="1">        
            {
              this.props.group.channels.map(c => <Cell key={c.Style.id} channel={c}></Cell>)
            }
          </Panel>
        </Collapse>
      )
    }
  }


  /*

  */
//<Cell key={item.Style.id} channel={item}/>
