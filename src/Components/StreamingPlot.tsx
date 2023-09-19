import React, { HTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { CustomAxis, CustomOptions, CustomScales, CustomUPlot } from "../uPlot/types";
import { MyUPlotBase } from "../uPlot/PlotBase";
import { XAxesWheelPlugin, YAxesWheelPlugin } from "../uPlot/plotPlugins/wheelPlugins";
import { XAxesDragPlugin, YAxesDragPlugin } from "../uPlot/plotPlugins/YAxesDragPlugin";
import { OverDragPlugin } from "../uPlot/plotPlugins/overDragPlugin";
import { OverZoomPlugin } from "../uPlot/plotPlugins/overZoomPlugin";
import { StreamingTogglePlugin } from "../uPlot/plotPlugins/streamingTogglePlugin";
import { AutoRange } from "../uPlot/plotPlugins/autoRangePlugin";
import { PlotChannelsPlugin } from "../uPlot/plotPlugins/plotChannelsPlugin";
import { valuesMapper } from "../uPlot/PlotPlugins";
import { usePlotManager, useSensorContext } from "../hooks/hook";
import { rangeIncerteptor, ScaleLimiterPlugin } from "../uPlot/plotPlugins/scaleLimiterPlugin";
import { MaxFrameSize } from "../uPlot/StreamingPlot/StreamingBufferManager";
import { RedrawPlugin } from "../uPlot/plotPlugins/redrawPlugin";
import { AxisHoverAnimationPlugin } from "../uPlot/plotPlugins/axisHoverAnimationPlugin";
import { PlotChannel } from "../Channel/Channel/PlotChannel";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import classes from "./Components.module.scss"
import { Axis } from "../uPlot/uplot";
import { UplotReact } from "./uplot-react";
import { SelectionCommitPlugin } from "../uPlot/plotPlugins/selectionCommitPlugin";

interface Props extends HTMLAttributes<HTMLDivElement> {
    plotChannels: PlotChannel[]
    plotStyles: PlotChannelStyle[]
}
  
export const StreamingPlot = ({plotChannels, plotStyles, ...rest} : Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [plot, setPlot] = usePlotManager();
    const [identity, setIdentity] = useState();

    const getCurrentSize = (): [number, number] => {
        const clientWidth = containerRef.current?.clientWidth ?? 0;
        const clientHeight = containerRef.current?.clientHeight ?? 0;
        let newHeight = clientHeight ;
        newHeight = newHeight < 0 ? 200 : newHeight;
        return[clientWidth, newHeight]
    }
    const resize = (curPlot: MyUPlotBase) => {
        let timeoutId: NodeJS.Timeout | undefined; 
        const size = getCurrentSize();
        const doneResize = () => curPlot?.setSize(size[0], size[1]);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(doneResize, 20);
    }

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => resize(plot!));
        
        resizeObserver.observe(containerRef.current);
        return function cleanup() {
            resizeObserver.disconnect();
        }
    },
    [containerRef.current, plot, plotChannels]);
      
    const onCreate = (u: uPlot) =>
    {
        const curPlot = new MyUPlotBase(u as CustomUPlot)
        setPlot(curPlot);
        resize(curPlot);
    }
    
    const plotComponent = useMemo(() => {
 
    const series: uPlot.Series[] = plotStyles.map((style, index) => {
        return {
            show: style.visible,
            stroke: style.color,
            width: style.width,
        
            label: style.legendTitle,

            scale: "y" + index.toString(),
            points: {
                stroke: style.color,
                size: 5
            },
        }
    });
 
    const rangeSourcex: [number, number] = [0, 10];
    const scales: CustomScales = {x: {
        rangeSource: rangeSourcex,
        range: () => [rangeSourcex[0], rangeSourcex[1]],
        time: false,
        distr: 1,
        auto: false,
    }}
    for (let i = 0; i < plotStyles.length; i++) {
        const rangeSource: [number, number] = [plotStyles[i].range[0], plotStyles[i].range[1]];
        scales["y" + i.toString()] = {
            rangeSource: rangeSource,
            range: () => rangeSource,
            auto: true,
            distr: 1,
            key: i.toString(),
            time: false,
        }
    }

    const axies: CustomAxis[] = plotStyles.map((style, index) => {
        return {
            side: style.yAxeSide === "left" ? 1 : 3,
            scale: "y" + index.toString(),
            stroke: style.axisColor,
            show: true,
            label: style.yTitle,
            grid:{
                show: style.grid
            },
            rescaleRatio: [style.rescaleRationBottom, style.rescaleRationTop],
            space: 20,
        }
    });

    const plugins: uPlot.Plugin[] | undefined = 
    [
        YAxesDragPlugin(),
        XAxesDragPlugin(),
        YAxesWheelPlugin(),
        XAxesWheelPlugin(),
        RedrawPlugin(),
        PlotChannelsPlugin(plotChannels),
        AutoRange(30),
        OverDragPlugin(),
        OverZoomPlugin(0.01, 0.75),
        StreamingTogglePlugin(),
        AxisHoverAnimationPlugin(),
        SelectionCommitPlugin()
    ]

    const size = getCurrentSize();
    const options: CustomOptions =
    {
        t0: 0,
        th: 0,
        fps: 40,
        width: size[0],
        height: size[1],
        pointsPerSecond: 5000,
        maxScreenSize: MaxFrameSize / 5000 / 2,
        rangeSouce: [0, 5],
        pxAlign: true,
        rangeIncerteptor: rangeIncerteptor,
        cursor: {
            points: {
                size: 6,
            },
        },
        plugins: plugins,
        mode: 1,
        hooks:{
            
        },
        scales: scales,
        axes: [
            {
                show: true,
                space: 100,
                values: valuesMapper,
                rescaleRatio: [0.3, 0.3]
                //side: 0,
            } as Axis, //x axe
            ...axies
        ],

        legend:{
            show: false,
        },
        series: [
            {
                auto: false,
            },
            ...series
        ],
    }
     
     return <UplotReact options={options}
     data={[]}
     onCreate={onCreate}
     resetScales={false}/>
    }, [plotStyles.length])

     return (
         <div ref={containerRef} {...rest} >
             <div className={classes.absolute}>
             {
                plotComponent
             }
             </div>
         </div>
     );
};