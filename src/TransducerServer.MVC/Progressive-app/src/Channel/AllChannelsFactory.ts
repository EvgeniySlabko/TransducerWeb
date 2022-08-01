import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "./Channel/CellChannel";
import { PlotChannel } from "./Channel/PlotChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { PeakEventArgs } from "./SensorDataProveder/AbsolutePeakAnalyzer";
import { CutOffDataProvider } from "./SensorDataProveder/CutOffDataProvider";
import { CreateAbsoluteAnalizerSource, CreateAmplifiredDataSource, CreateAverageValueDataSource, CreateDisplayValueDataSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "./SensorDataProveder/DataSourceFactory";
import { ISensorDataProvider } from "./SensorDataProveder/ISensorDataProvider";
import { SensorDataProvider } from "./SensorDataProveder/SensorDataProvider";

export interface ChannelsGroup {
    plotChannel: PlotChannel;
    savingChannel: PlotChannel;
    cellChannel: CellChannel;
}

export interface AllChannelsInfo {
    channelGroups: ChannelsGroup[];
    setAvgRatio: (avgRatio: number) => void,
    setOffset: (offset: number) => void,
    offset: () => number,
    setCurrentOffset: () => number,
    absolutePeackDetected: IEvent<PlotChannel, PeakEventArgs>,
    resetAbsoluteAnalizer: () => void,
    setAbsoluteAnalizer: (state: boolean) => void,
    getAbsoluteAnalizerState: () => boolean,
}

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo, colorSeed: number): AllChannelsInfo {
    let channels: PlotChannel[] = [];
    let savingChannels: PlotChannel[] = [];
    let cellChannels: CellChannel[] = [];

    //Torque
    let mainSource = CreateMainValueDataSource(sensor);
    let cutOffMainSource = new CutOffDataProvider(mainSource);
    let offsetSource = CreateOffsetDataSource(cutOffMainSource, 0);
    let applifiredDataSource = CreateAmplifiredDataSource(offsetSource, fullSensorInfo.valueRatio);

    let absoluteAnalizerSource = CreateAbsoluteAnalizerSource(applifiredDataSource);

    let cellDisplaySource = CreateDisplayValueDataSource(offsetSource, 30);
    let plotAverager = CreateAverageValueDataSource(applifiredDataSource, 1);

    let mainPlotChannel = CreateMainChannel(plotAverager, fullSensorInfo);
    let mainSavingChannel = CreateMainChannel(applifiredDataSource, fullSensorInfo);
    let mainCellChannel = CreateMainCellChannel(cellDisplaySource, fullSensorInfo);

    channels.push(mainPlotChannel);
    savingChannels.push(mainSavingChannel);
    cellChannels.push(mainCellChannel);

    //Speed
    let speedSource = CreateSpeedValueDataSource(sensor);
    let cutOffSpeedSource = new CutOffDataProvider(speedSource);
    let speedDisplaySource = CreateDisplayValueDataSource(cutOffSpeedSource, 30);
    let speedPlotChannel = CreateSpeedChannel(cutOffSpeedSource, fullSensorInfo);
    let speedCellChannel = CreateSpeedCellChannel(speedDisplaySource, fullSensorInfo);

    channels.push(speedPlotChannel);
    savingChannels.push(speedPlotChannel);
    cellChannels.push(speedCellChannel);

    //Power
    let powerSource = CreatePowerDataSource(mainSource, speedSource);
    let cutOffPowerSource = new CutOffDataProvider(powerSource);

    let powerDisplaySource = CreateDisplayValueDataSource(cutOffPowerSource, 30);
    let powerPlotChannel = CreatePowerChannel(cutOffPowerSource, fullSensorInfo);
    let powerCellChannel = CreatePowerCellChannel(powerDisplaySource, fullSensorInfo);

    channels.push(powerPlotChannel);
    savingChannels.push(powerPlotChannel);
    cellChannels.push(powerCellChannel);

    //Tmp
    let tmpSource = CreateTemperatureValueDataSource(sensor);
    let temperatureChannel = CreateTemperatureChannel(tmpSource, fullSensorInfo);
    let temperatureCellChannel = CreateTemperatureCellChannel(tmpSource, fullSensorInfo);

    channels.push(temperatureChannel);
    savingChannels.push(temperatureChannel);
    cellChannels.push(temperatureCellChannel);

    let absolutepeakEvent = new EventDispatcher<PlotChannel, PeakEventArgs>();

    absoluteAnalizerSource.onPeakDetected.sub((sensor, args) => {
        absolutepeakEvent.dispatch(mainPlotChannel, args);
    });

    let groups: ChannelsGroup[] = [];
    for (let i = 0; i < cellChannels.length; i++) {
        groups.push(
            {
                cellChannel: cellChannels[i],
                plotChannel: channels[i],
                savingChannel: savingChannels[i],
            })
    }

    return {
        setAvgRatio: plotAverager.SetAverage,
        setOffset: offsetSource.SetOffset,
        setCurrentOffset: offsetSource.SetCurrentOffset,
        offset: () => offsetSource.Offset,
        channelGroups: groups,
        absolutePeackDetected: absolutepeakEvent.asEvent(),
        resetAbsoluteAnalizer: absoluteAnalizerSource.Reset,
        setAbsoluteAnalizer: absoluteAnalizerSource.setState,
        getAbsoluteAnalizerState: absoluteAnalizerSource.getState
    }

    function CreateTemperatureChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatetemperatureStyle(fullSensorInfo));
    }

    function CreateTemperatureCellChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatetemperatureCellStyle(fullSensorInfo));
    }

    function CreateSpeedChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreateSpeedStyle(fullSensorInfo));
    }

    function CreateSpeedCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreateCellSpeedStyle(fullSensorInfo));
    }

    function CreateMainChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreateTorqueStyle(fullSensorInfo));
    }

    function CreateMainCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreateTorqueCellStyle(fullSensorInfo));
    }

    function CreatePowerChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatePowerStyle(fullSensorInfo));
    }

    function CreatePowerCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatePowerCellStyle(fullSensorInfo));
    }
}