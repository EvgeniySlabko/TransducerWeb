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
import { rangeIncerteptor } from "../uPlot/plotPlugins/scaleLimiterPlugin";
import { MaxFrameSize } from "../uPlot/StreamingPlot/StreamingBufferManager";
import { RedrawPlugin } from "../uPlot/plotPlugins/redrawPlugin";
import { AxisHoverAnimationPlugin } from "../uPlot/plotPlugins/axisHoverAnimationPlugin";
import { PlotChannel } from "../Channel/Channel/PlotChannel";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import classes from "./Components.module.scss"
import uPlot, { Axis } from "../uPlot/uplot";
import { UplotReact } from "./uplot-react";
import { SelectionCommitPlugin } from "../uPlot/plotPlugins/selectionCommitPlugin";
import Collapse, { CollapseProps } from "antd/lib/collapse";
import "./StreamingPlot.scss";
import { Checkbox } from "antd";
import { legendToggler } from "../uPlot/plotPlugins/legendToggler";

const { Panel } = Collapse;

const legendDivHeight = 50;
const xAxisHeight = 50;
interface Props extends HTMLAttributes<HTMLDivElement> {
    plotId: number,
    plotChannels: PlotChannel[],
    plotStyles: PlotChannelStyle[],
    onPlotCreated: (key: number, plot: MyUPlotBase) => void,
    onPlotDestroyed: (key: number, plot: MyUPlotBase) => void,
    
    legend: boolean,
    onLegengChanged: (key: number, legend: boolean) => void,

    hidedAxies: string[],
    onHidedAxiesChanged: (key: number, hidedAxies: string[]) => void
}
export const StreamingPlot = ({legend, plotId: key, plotChannels, plotStyles, hidedAxies, onPlotCreated, onPlotDestroyed, onLegengChanged, onHidedAxiesChanged, ...rest} : Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [uPlot, setUplot] = useState<CustomUPlot>();
    const [collapseOpen, setCollapseOpen] = useState<boolean>(false);
    const [myUPlotBase, setMyUPlotBase] = useState<MyUPlotBase | undefined>();

    const getCurrentSize = (): [number, number] => {
        const clientWidth = containerRef.current?.clientWidth ?? 0;
        const clientHeight = containerRef.current?.clientHeight ?? 0;
        let newHeight = clientHeight;
        newHeight = newHeight < 0 ? 0 : newHeight + 20 - (uPlot?.isLegendEnabled ? legendDivHeight + xAxisHeight : xAxisHeight);
        return[clientWidth, newHeight]
    }
    const resize = (curPlot: uPlot) => {
        let timeoutId: NodeJS.Timeout | undefined; 
        const size = getCurrentSize();
        const doneResize = () => { curPlot?.setSize({width: size[0], height: size[1]}) } ;
        clearTimeout(timeoutId);
        doneResize();//setTimeout(doneResize, 200);
    }

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(() => resize(uPlot!));
        
        resizeObserver.observe(containerRef.current);
        return function cleanup() {
            resizeObserver.disconnect();
        }
    },
    [containerRef.current, plotChannels]);
      
    const onCreate = (u: uPlot) =>
    {
        const curPlot = new MyUPlotBase(u as CustomUPlot)
        setMyUPlotBase(curPlot);
        onPlotCreated(key, curPlot);
        setUplot(u as CustomUPlot);
        resize(u);
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
            show: !hidedAxies.includes(style.valueType),
            type: style.valueType,
            label: style.yTitle,
            id: style.valueType,
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
        SelectionCommitPlugin(),
        legendToggler()
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
        isLegendEnabled: true,
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
            show: true,
        },
        series: [
            {
                auto: false,
            },
            ...series
        ],
    }
     
    const onDestroy = () => {
        onPlotDestroyed(key, myUPlotBase!);
        setMyUPlotBase(undefined);
        setUplot(undefined);
    }

     return <UplotReact options={options}
     data={[]}
     onCreate={onCreate}
     onDelete={onDestroy}
     resetScales={false}/>
    }, [plotStyles.length])

    const onCollapseChange = (keys: string | string[]) =>{
        setCollapseOpen((keys as string[]).includes("1"))
    }

    const onLegendChanged = () =>{
        onLegengChanged(key, !legend)
    }

    const onAxiesChanged = (axiesName: string, value: boolean) =>{
        if (value)
        {
            const newAxies = hidedAxies.filter(ha => ha !== axiesName);
            onHidedAxiesChanged(key, newAxies);
        }
        else
        {
            if (!hidedAxies.includes(axiesName))
            {
                onHidedAxiesChanged(key, [...hidedAxies, axiesName]);
            }
        }
    }

    if (uPlot)
    {
        uPlot.isLegendEnabled = legend
        uPlot.axes.map(a => a as CustomAxis).forEach(ca => {
            const isHided = hidedAxies.some(ha => ca.type == ha);
            ca.show = !isHided;
        })
        resize(uPlot);
        uPlot?.setSize({width: uPlot.width + 0.001, height: uPlot.height}) //It make uplot recalculate valid axies positions
        uPlot.redrawRequired = true;
        uPlot?.redraw(true, true)
    }

    //const onAxisVisibiliteChanged(plotId: number, )
    const allValueTypes = plotStyles.map(ps => ps.valueType);
    const uniqueValueTypes = allValueTypes.filter((item, index) => allValueTypes.indexOf(item) === index);
    return (
        <div {...rest} style={{height: "100%", position: "relative"}}>
            <div ref={containerRef} style={{height: "100%"}} >
                <div className={classes.absolute}>
                {
                    plotComponent
                }
                </div>
            </div>
            <Collapse bordered={false} 
                    className={`${collapseOpen ? "streaming_plot_collapse_open" : "streaming_plot_collapse_close"}`} 
                    ghost={true} 
                    onChange={ onCollapseChange }>

                <Panel className={`${collapseOpen ? "streaming_plot_panel_open" : "streaming_plot_panel_close"}`} header="" key="1">
                    <>
                        <Checkbox checked={legend} onChange={onLegendChanged}>Legend</Checkbox>
                        {
                            uniqueValueTypes.map(ps => 
                                <Checkbox defaultChecked={!hidedAxies.some(ha => ha === ps)} onChange={(e) => onAxiesChanged(ps, e.target.checked)}>{ps}</Checkbox>
                            )
                        }
                    </>
                </Panel>
            </Collapse>
        </div>
    );
};