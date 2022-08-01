import { Collapse } from 'antd';
import React from 'react';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISingleComponentSensor';
import { ParamsStorage } from '../Storage/AppStorage';
import { PlotsManager } from '../uPlot/PlotManager';
import { Group } from './App';
import { CellsGroup } from './CellsGroup';
const { Panel } = Collapse;

export interface Props {
  groups: Group[],
  plotsManager?: PlotsManager;
  sensorRemove: (sensor: ISingleComponentSensor) => void,
  storage: ParamsStorage;
  allowSettings: boolean;
}

export class GroupsContainer extends React.Component<Props>{

  constructor(prop: Props) {
    super(prop);
  }

  render() {
    return (
      this.props.groups.map((g, i) => <CellsGroup key={g.node.fullSensorInfo.id}
        allowSettings={this.props.allowSettings}
        plotsManager={this.props.plotsManager}
        group={g}
        storage={this.props.storage}
        sensorRemove={(sensor: ISingleComponentSensor) => this.props.sensorRemove(sensor)}
      ></CellsGroup>)
    )
  }
}
