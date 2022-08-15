import { Collapse } from "antd";
import React from "react";
const { Panel } = Collapse;

export interface Props {
  children: React.ReactElement;
  label: string;
  className?: string;
}

export class MenuItem extends React.Component<Props> {
  constructor(prop: Props) {
    super(prop);
  }

  render() {
    const children = this.props.children;
    return (
      <>
        <div className={"horizontal-flex"}>
          <label className="margin vertical-align">{this.props.label}</label>
          <div
            className="margin horizontal-flex"
            style={{ marginLeft: "auto", order: 2 }}
          >
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}
