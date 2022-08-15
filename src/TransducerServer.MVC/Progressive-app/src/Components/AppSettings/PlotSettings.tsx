import { Collapse, InputNumber, Select } from "antd";
import React from "react";
import { MenuItem } from "../MenuItem";
const { Panel } = Collapse;
const { Option } = Select;

export interface Props {
  pointsPerSecond: number;

  pointsPerSecondChanged: (value: number) => void;
}

export class PlotSettings extends React.Component<Props> {
  constructor(prop: Props) {
    super(prop);
  }

  render() {
    return (
      <MenuItem
        label="Максимальное число точек в секунду на графике:"
        children={
          <InputNumber
            className="vertical-align"
            min={50}
            max={5000}
            step={1}
            size="small"
            defaultValue={this.props.pointsPerSecond}
            onChange={this.props.pointsPerSecondChanged}
          />
        }
      />
    );
  }
}
