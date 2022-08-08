import { Collapse } from 'antd';
import React from 'react';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISingleComponentSensor';
import { PlotsManager } from '../uPlot/PlotManager';
import { Group } from './App';
import { CellsGroup } from './CellsGroup';
const { Panel } = Collapse;

export interface Props {
  groups: Group[],
  plotsManager?: PlotsManager;
  sensorRemove: (sensor: ISingleComponentSensor) => void,
  allowSettings: boolean;
}

export class GroupsContainer extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }

  render() {
    return (
      this.props.groups.map((group) => <CellsGroup key={group.node.fullSensorInfo.id}
        allowSettings={this.props.allowSettings}
        plotsManager={this.props.plotsManager}
        group={group}
        sensorRemove={(sensor: ISingleComponentSensor) => this.props.sensorRemove(sensor)}
      />)
    )
  }
}
