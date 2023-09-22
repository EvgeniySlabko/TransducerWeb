import Split from "@uiw/react-split"
import React from "react"
import { HTMLAttributes } from "react"
import { PlotChannel } from "../Channel/Channel/PlotChannel"
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle"
import { MyUPlotBase } from "../uPlot/PlotBase"
import { StreamingPlot } from "./StreamingPlot"

export type PlotLayoutContext = {
    key: number
    layoutPlotChannels: PlotChannel[],
    layoutPlotStyles: PlotChannelStyle[],
    pointsPerSecond: number,
    order: number,
    legend: boolean
}


export interface Props extends HTMLAttributes<HTMLDivElement> {
    plotContexts: PlotLayoutContext[],
    onPlotCreated: (key: number, plot: MyUPlotBase) => void,
    onPlotDestroyed: (key: number, plot: MyUPlotBase) => void

    onLegengChanged: (key: number, plot: boolean) => void
}

export const PlotsLayout = ({onLegengChanged, plotContexts, onPlotDestroyed, onPlotCreated, ...rest}: Props) =>{

    
    const segmentsLength = plotContexts.length == 0 ? 0 : Math.max(...plotContexts.map(c => c.order)) + 1;

    const orderedContexts : PlotLayoutContext[] = new Array(segmentsLength);
    plotContexts.forEach(c => orderedContexts[c.order] = c);

    return(
        <div style={{height: "100%"}} {...rest}>
            <Split mode="vertical" style={{border: '1px solid #d5d5d5', height: "100%"}} >
                {
                    orderedContexts.map((context, i) => 
                        <StreamingPlot
                            plotId={context.key}
                            legend={context.legend}
                            style={{height: "100%"}}
                            onPlotCreated={onPlotCreated}
                            onPlotDestroyed={onPlotDestroyed}
                            plotChannels={context ? context.layoutPlotChannels : []}
                            plotStyles={context ? context.layoutPlotStyles : []}
                            
                            onLegengChanged={onLegengChanged}
                            />
                        )
                }
            </Split>
        </div>
    )
}