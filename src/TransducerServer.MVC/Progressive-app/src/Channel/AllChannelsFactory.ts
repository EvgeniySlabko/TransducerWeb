import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { FilterParameters } from "../Storage/ChannelsDataStorage";
import { CellChannel } from "./Channel/CellChannel";
import { PlotChannel } from "./Channel/PlotChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { AbsoluteDataSource } from "./SensorDataProveder/AbsoluteDataSource";
import { PeakEventArgs } from "./SensorDataProveder/AbsolutePeakAnalyzer";
import { CutOffDataProvider } from "./SensorDataProveder/CutOffDataProvider";
import { CreateAbsoluteAnalizerSource, CreateAmplifiredDataSource, CreateDisplayValueDataSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "./SensorDataProveder/DataSourceFactory";
import { FilterDataProvider } from "./SensorDataProveder/FilterDataProvider";
import { InvertorDataSource } from "./SensorDataProveder/InvertorDataSource";
import { ISensorDataProvider } from "./SensorDataProveder/ISensorDataProvider";
import { SensorDataProvider } from "./SensorDataProveder/SensorDataProvider";

export interface ChannelsGroup {
    plotChannel: PlotChannel;
    savingChannel: PlotChannel;
    cellChannel: CellChannel;
}

export interface AllChannelsInfo {
    setInvertionState: (invertion: boolean) => void
    invertionState: () => boolean
    setAbsoluteState: (invertion: boolean) => void
    absoluteState: () => boolean
    setFilterParameters: (filterParams: FilterParameters) => void;
    filterParameters: () => FilterParameters;
    channelGroups: ChannelsGroup[];
    absolutePeackDetected: IEvent<PlotChannel, PeakEventArgs>,
    resetAbsoluteAnalizer: () => void,
    setAbsoluteAnalizer: (state: boolean) => void,
    getAbsoluteAnalizerState: () => boolean,
    setOffset: (offset: number) => void,
    offset: () => number,
    setCurrentOffset: () => number,
}

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo, colorSeed: number): AllChannelsInfo {
    let channels: PlotChannel[] = [];
    let savingChannels: PlotChannel[] = [];
    let cellChannels: CellChannel[] = [];

    //Torque
    let mainSource = CreateMainValueDataSource(sensor);
    let cutOffMainSource = CreateCutOffChannel(mainSource);
    let offsetSource = CreateOffsetDataSource(cutOffMainSource, 0);
    let applifiredDataSource = CreateAmplifiredDataSource(offsetSource, fullSensorInfo.valueRatio);

    let absoluteDataSource = CreateAbsoluteChannel(applifiredDataSource);
    let invertedDataSource = CreateInvertedChannel(absoluteDataSource);
    let filterDataSource = CreateFilter(invertedDataSource);

    let absoluteAnalizerSource = CreateAbsoluteAnalizerSource(filterDataSource);

    let cellDisplaySource = CreateDisplayValueDataSource(offsetSource, 6);
    //let plotAverager = CreateAverageValueDataSource(filterDataSource, 1);

    let mainPlotChannel = CreateMainChannel(filterDataSource, fullSensorInfo);
    let mainSavingChannel = CreateMainChannel(filterDataSource, fullSensorInfo);
    let mainCellChannel = CreateMainCellChannel(cellDisplaySource, fullSensorInfo);

    channels.push(mainPlotChannel);
    savingChannels.push(mainSavingChannel);
    cellChannels.push(mainCellChannel);

    //Speed
    let speedSource = CreateSpeedValueDataSource(sensor);
    let cutOffSpeedSource = CreateCutOffChannel(speedSource);
    let speedDisplaySource = CreateDisplayValueDataSource(cutOffSpeedSource, 6);
    let speedPlotChannel = CreateSpeedChannel(cutOffSpeedSource, fullSensorInfo);
    let speedCellChannel = CreateSpeedCellChannel(speedDisplaySource, fullSensorInfo);

    channels.push(speedPlotChannel);
    savingChannels.push(speedPlotChannel);
    cellChannels.push(speedCellChannel);

    //Power
    let powerSource = CreatePowerDataSource(mainSource, speedSource);
    let cutOffPowerSource = CreateCutOffChannel(powerSource);

    let powerDisplaySource = CreateDisplayValueDataSource(cutOffPowerSource, 6);
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
        setAbsoluteState: (absolute: boolean) => absoluteDataSource.Absolute = absolute,
        absoluteState: () => absoluteDataSource.Absolute,
        invertionState: () => invertedDataSource.Inverted,
        setInvertionState: (invertion: boolean) => invertedDataSource.Inverted = invertion,
        setOffset: offsetSource.SetOffset,
        setCurrentOffset: offsetSource.SetCurrentOffset,
        offset: () => offsetSource.Offset,
        setFilterParameters: filterDataSource.SetFilterParams,
        filterParameters: () => filterDataSource.FilterParams,
        channelGroups: groups,
        absolutePeackDetected: absolutepeakEvent.asEvent(),
        resetAbsoluteAnalizer: absoluteAnalizerSource.Reset,
        setAbsoluteAnalizer: absoluteAnalizerSource.setState,
        getAbsoluteAnalizerState: absoluteAnalizerSource.getState,
    }

    function CreateTemperatureChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatetemperatureStyle(fullSensorInfo));
    }

    function CreateCutOffChannel(source: ISensorDataProvider): CutOffDataProvider {
        return new CutOffDataProvider(source);
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

    function CreateFilter(source: ISensorDataProvider): FilterDataProvider {
        return new FilterDataProvider(source);
    }

    function CreatePowerCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatePowerCellStyle(fullSensorInfo));
    }

    function CreateInvertedChannel(source: ISensorDataProvider): InvertorDataSource {
        return new InvertorDataSource(source);
    }
    
    function CreateAbsoluteChannel(source: ISensorDataProvider): AbsoluteDataSource {
        return new AbsoluteDataSource(source);
    }
}