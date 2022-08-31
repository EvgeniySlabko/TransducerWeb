import { Collapse } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { PlotsManager } from "../uPlot/PlotManager";
import { PlotControlPanel } from "./ControlPanel/PlotControlPanel";

const { Panel } = Collapse;

export interface Props {
    plotsManager: PlotsManager;
    streamingAvailable: boolean;
}

export class Plot extends React.Component<Props> {
    constructor(prop: Props) {
        super(prop);
    }

    render() {
        return (
            <>
            {

                <PlotControlPanel plotsManager={this.props.plotsManager} reportVieving={this.props.streamingAvailable} />

            }
            </>
        )
    }
}
