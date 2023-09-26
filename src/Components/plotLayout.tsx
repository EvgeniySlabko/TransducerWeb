import Split from "@uiw/react-split"
import React from "react"
import { HTMLAttributes } from "react"
import { PlotChannel } from "../Channel/Channel/PlotChannel"
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle"
import { MyUPlotBase } from "../uPlot/PlotBase"
import { StreamingPlot } from "./StreamingPlot"
import styles from "./PlotLayout.module.scss"
import { InvisibleContainer } from "./InvisibleContainer"
import { SquareLayout } from "./Layouts/SquareLayout"

export type PlotLayoutContext = {
    key: number
    layoutPlotChannels: PlotChannel[],
    layoutPlotStyles: PlotChannelStyle[],
    pointsPerSecond: number,
    order: number,
    legend: boolean,
    hidedAxies: string[]
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
    plotContexts: PlotLayoutContext[],
    onPlotCreated: (key: number, plot: MyUPlotBase) => void,
    onPlotDestroyed: (key: number, plot: MyUPlotBase) => void

    onLegengChanged: (key: number, plot: boolean) => void

    onHidedAxiesChanged: (key: number, hidedAxies: string[]) => void
}

export const PlotsLayout = ({plotContexts, onPlotDestroyed, onPlotCreated, onLegengChanged, onHidedAxiesChanged, ...rest}: Props) =>{

    
    const segmentsLength = plotContexts.length == 0 ? 0 : Math.max(...plotContexts.map(context => context.order)) + 1;

    const orderedContexts : PlotLayoutContext[] = new Array(segmentsLength);
    plotContexts.forEach(plotContext => orderedContexts[plotContext.order] = plotContext);

    const heightOfPlot = `${100 / plotContexts.length}%`;
    return(
        <div style={{height: "100%"}} {...rest}>
            <SquareLayout childrens={
                orderedContexts.map((context, i) =>                     
                <StreamingPlot style={{height: "100%"}}
                    plotId={context.key}
                    legend={context.legend}
                    onPlotCreated={onPlotCreated}
                    onPlotDestroyed={onPlotDestroyed}
                    plotChannels={context ? context.layoutPlotChannels : []}
                    plotStyles={context ? context.layoutPlotStyles : []}
                    onLegengChanged={onLegengChanged}
                    hidedAxies={context.hidedAxies}
                    onHidedAxiesChanged={onHidedAxiesChanged}
                    />
                )
            }></SquareLayout>
        </div>
    )
}

