import { PlotChannel, PlotChannelDataArgs } from "../../Channel/Channel/PlotChannel";
import { SensorData } from "../../Sensor/SensorDefinitions";
import { PlotBufferManager } from "../StreamingPlot/StreamingBufferManager";
import { CustomOptions, CustomPlagin, CustomUPlot } from "../types";
import { AlignedData, Options, Plugin } from "../uplot";


export const PlotChannelsPlugin = (plotChannels: PlotChannel[]) : Plugin =>{
    type ChannelWithIndex = {
        plotChannel: PlotChannel,
        index: number
    }

    let bufferManager : PlotBufferManager | undefined;
    let channelsWithIndexes = plotChannels.map<ChannelWithIndex>((p, i) => {
        return{
            plotChannel: p,
            index: i
        }
    });

    const handleData = (channel: PlotChannel, args: PlotChannelDataArgs) => {
        let curIndex = channelsWithIndexes.find((c) => c.plotChannel === channel)!.index;
        //console.log(curIndex);
        let dataArgs: SensorData = {
            data: args.data.data,
            time: args.data.time,
        };


        bufferManager!.SetRange(curIndex, dataArgs);

    };

    const initHandler = (u: uPlot, opts: Options, data: AlignedData) => {
        const customUPlot = u as CustomUPlot;
        const customOptions = opts as CustomOptions;

        customUPlot.maxScreenSize = customOptions.maxScreenSize;
        customUPlot.pointsPerSecond = customOptions.pointsPerSecond;
        customUPlot.rangeSouce = customOptions.rangeSouce;
        customUPlot.redrawRequired = true;
        customUPlot.isLegendEnabled = customOptions.isLegendEnabled
        customUPlot.SetRangeSource = (min: number, max: number) =>
        {
            if (customOptions.rangeIncerteptor)
            {
                const newRange = customOptions.rangeIncerteptor(customUPlot, min, max);
                customUPlot.rangeSouce[0] = newRange[0];
                customUPlot.rangeSouce[1] = newRange[1];
            }
            else
            {
                customUPlot.rangeSouce[0] = min;
                customUPlot.rangeSouce[1] = max;
            }
        }

        customUPlot.scales.x.range = () => customUPlot.rangeSouce
        bufferManager = new PlotBufferManager({
            segments: plotChannels.length,
            dt: 1 / customOptions.pointsPerSecond!
        });

        customUPlot.buffer = bufferManager;

        customUPlot.getMaxTime = () => bufferManager!.GetLastTime()

        plotChannels.forEach((c, i) => {
            c.onData.sub((channel, args) => 
            {
                handleData(channel, args);
                customUPlot.redrawRequired = true;
            });
        });
    }

    function destroyHandler(u: uPlot) {
        plotChannels.forEach((c, i) => {
            c.onData.unsub(handleData);
        });
    }
    
    function manualRedraw(u: uPlot) {
        const customUPlot = u as CustomUPlot;
        let curData = bufferManager!.getSource(customUPlot.rangeSouce[0], customUPlot.rangeSouce[1]);
        u.setData(curData, false);
        if (customUPlot.redrawRequired)
        {
            customUPlot.redraw(true, false);
            customUPlot.redrawRequired = false;
        }
        //u.redraw(true)
    }

    const customPlugin : CustomPlagin= {
        hooks: {
            init: initHandler,
            destroy: destroyHandler,
            manualRedraw: manualRedraw
        }
    }
    return customPlugin as Plugin;
}