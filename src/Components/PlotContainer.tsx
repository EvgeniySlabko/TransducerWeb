import { Collapse } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { PlotsManager } from "../uPlot/PlotManager";
import { PlotControlPanel } from "./ControlPanel/PlotControlPanel";
const { Panel } = Collapse;

export interface Props {
    plotsManager?: PlotsManager;
    reportVieving: boolean;
    plotReady: (plotManager: PlotsManager) => void;
}

export class PlotContainer extends React.Component<Props> {

    private readonly container: any; 
    constructor(prop: Props) {
        super(prop);
    }

    componentDidMount() {
        let container = document.getElementById("gd")!;
        let plotsManager = new PlotsManager(container);

        let plotReadyCallback = (manager: PlotsManager) => {
            //let container = manager.Container;
            this.insertPanel(container, manager);
            manager.onReady.unsub(plotReadyCallback);
            this.props.plotReady(manager)
        }

        plotsManager.onReady.sub(plotReadyCallback);
    }

    insertPanel = (container: HTMLElement, manager: PlotsManager) => {
        let over = container.getElementsByClassName("u-over");
        if (over)
        {
            let div = over.item(0)!;
            let div2 = document.createElement("div")
            div2.setAttribute("class", "center-parent")
            div.append(div2);
            ReactDOM.render(<PlotControlPanel reportVieving={this.props.reportVieving} plotsManager={manager}/>, container);
        }
    }   

    render() {
        return (
            <>
                <div id="gd" className="plot" />
            </>
        );
    }
}
