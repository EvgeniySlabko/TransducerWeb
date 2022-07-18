import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import React from 'react';
import { CellChannel, ChannelDataArgs } from '../Channel/Channel/CellChannel';
import { Collapse, Dropdown, Menu, notification, Radio, Space } from 'antd';
import { Group, SensorNode } from './App';
import { CellsGroup, PeackMode } from './CellsGroup';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { PlotPeackController } from '../ViewsControllers/PeacksController';
import { ParamsStorage } from '../Storage/Storage';
const { Panel } = Collapse;

  export interface Props {
    groups: Group[],
    plotViewController?: ViewController;
    sensorRemove: (sensor: ISingleComponentSensor) => void,
    storage: ParamsStorage;
    allowSettings: boolean;
  }

  export class GroupsContainer extends React.Component<Props>{
    
    constructor(prop: Props)
    {
      super(prop);
    }

    render() {
        return (      
          this.props.groups.map((g, i) => <CellsGroup key={g.node.fullSensorInfo.id} 
                                            allowSettings = {this.props.allowSettings}
                                            plotViewController = {this.props.plotViewController}
                                            group = {g}
                                            storage = {this.props.storage}
                                            sensorRemove = {(sensor: ISingleComponentSensor) => this.props.sensorRemove(sensor)}
                                            setThreshold={ g.channelsInfo.setThreshold}
                                             ></CellsGroup>)  
      )
    }
  }
