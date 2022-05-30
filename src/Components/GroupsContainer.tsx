import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Collapse, Dropdown, Menu, Radio, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { SensorNode } from './App';
import { CellsGroup } from './CellsGroup';
const { Panel } = Collapse;

export interface Group{
  node: SensorNode;
  channels: CellChannel[];
}
  export interface Props {
    groups: Group[],
    sensorRemove: (sensor: ISingleComponentSensor) => void,
  }

  export class GroupsContainer extends React.Component<Props>{
    
    constructor(prop: Props)
    {
      super(prop);
    }

    render() {
        return (      
          this.props.groups.map((g, i) => <CellsGroup key={i} 
                                            dataCells={g.channels} 
                                            sensorInfo={g.node.fullSensorInfo}
                                             sensor={g.node.sensor}
                                             sensorRemove= {(sensor: ISingleComponentSensor) => this.props.sensorRemove(sensor)}
                                             ></CellsGroup>)  
      )
    }
  }
