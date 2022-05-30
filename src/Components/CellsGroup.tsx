import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Button, Card, Collapse, Dropdown, Menu, Radio, Space } from 'antd';
import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Cell } from './Cell';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
const { Panel } = Collapse;


  export interface Props {
    dataCells: CellChannel[],
    sensorInfo: FullSensorInfo,
    sensor: ISingleComponentSensor,
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
                      this.props.sensorRemove(this.props.sensor);

                    },
                    label: (
                      <a target="_blank" rel="noopener noreferrer">
                        Удалить
                      </a>
                    ),
                  },
                  {
                    key: '2',
                    onClick: (e) => e.domEvent.preventDefault(),
                    label: (
                      <a target="_blank" rel="noopener noreferrer">
                        {"{0}"}
                      </a>
                    ),
                  }
                ]}
              />} placement="bottom" icon={<SettingOutlined onClick={event => event.stopPropagation()}/>}>
              {this.props.sensorInfo.SensorType}
            </Dropdown.Button>
            } key="1">        
            {
              this.props.dataCells.map(c => <Cell key={c.Style.id} channel={c}></Cell>)
            }
          </Panel>
        </Collapse>
      )
    }
  }


  /*

  */
//<Cell key={item.Style.id} channel={item}/>
