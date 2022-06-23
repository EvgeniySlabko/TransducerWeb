import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "./Channel/CellChannel";
import { Channel } from "./Channel/Channel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { CreateAbsoluteAnalizerSource, CreateAverageValueDataSource, CreateDetectorSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "./SensorDataProveder/DataSourceFactory";
import { ISensorDataProvider } from "./SensorDataProveder/ISensorDataProvider";
import { PeakEventArgs } from "./SensorDataProveder/PeakAnalyzer";
import { SensorDataProvider } from "./SensorDataProveder/SensorDataProvider";

export interface ChannelsGroup
{
    plotChannel: Channel;
    savingChannel: Channel;
    cellChannel: CellChannel;
}

export interface AllChannelsInfo
{
    channelGroups: ChannelsGroup[];
    avgSetter: (avgRatio: number) => void,
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: ()  => number,
    peackDetected: IEvent<Channel, PeakEventArgs>,
    absolutePeackDetected: IEvent<Channel, PeakEventArgs>,
    setThreshold: (upperThreshold: number, lowerThreshold: number) => void,
    resetAbsoluteAnalizer: () => void,
    setAbsoluteAnalizer: (state: boolean) => void,
    getAbsoluteAnalizerState: () => boolean,
}

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo, colorSeed: number) : AllChannelsInfo 
{
    let channels: Channel[] = []; 
    let savingChannels: Channel[] = []; 
    let cellChannels: CellChannel[] = [];

    //Torque
    let mainSource = CreateMainValueDataSource(sensor);
    let offsetSource =  CreateOffsetDataSource(mainSource, 0);
    let analizerSource = CreateDetectorSource(offsetSource, 0.1 * fullSensorInfo.MaxValue, 0.4);
    let absoluteAnalizerSource = CreateAbsoluteAnalizerSource(offsetSource);
    
    let cellAverager = CreateAverageValueDataSource(offsetSource, 500);
    let plotAverager = CreateAverageValueDataSource(offsetSource, 100);
    
    let mainPlotChannel = CreateMainChannel(plotAverager, fullSensorInfo, colorSeed);
    let mainCellChannel = CreateMainCellChannel(cellAverager, fullSensorInfo, colorSeed);
    let mainSavingChannel = CreateMainChannel(offsetSource, fullSensorInfo, colorSeed);
    
    channels.push(mainPlotChannel);
    savingChannels.push(mainSavingChannel);
    cellChannels.push(mainCellChannel);

    //Speed
    let speedSource = CreateSpeedValueDataSource(sensor);
    let speedChannel = CreateSpeedChannel(speedSource, fullSensorInfo, colorSeed);
    let speedCellChannel = CreateSpeedCellChannel(speedSource, fullSensorInfo, colorSeed);
    channels.push(speedChannel);
    savingChannels.push(speedChannel);
    cellChannels.push(speedCellChannel);
    
    //Power
    let powerSource = CreatePowerDataSource(mainSource, speedSource);
    let powerChannel = CreatePowerChannel(powerSource, fullSensorInfo, colorSeed);
    let powerCellChannel = CreatePowerCellChannel(powerSource, fullSensorInfo, colorSeed);
    
    channels.push(powerChannel);
    savingChannels.push(powerChannel);
    cellChannels.push(powerCellChannel);

    //Tmp
    let tmpSource = CreateTemperatureValueDataSource(sensor);
    let temperatureChannel = CreateTemperatureChannel(tmpSource, fullSensorInfo, colorSeed);
    let temperatureCellChannel = CreateTemperatureCellChannel(tmpSource, fullSensorInfo, colorSeed);
    
    channels.push(temperatureChannel);
    savingChannels.push(temperatureChannel);
    cellChannels.push(temperatureCellChannel);

    let peakEvent = new EventDispatcher<Channel, PeakEventArgs>();
    let absolutepeakEvent = new EventDispatcher<Channel, PeakEventArgs>();
    analizerSource.onPeakDetected.sub((sensor, args) =>
    {
        peakEvent.dispatch(mainPlotChannel, args);
    });

    absoluteAnalizerSource.onPeakDetected.sub((sensor, args) =>
    {
        absolutepeakEvent.dispatch(mainPlotChannel, args);
    });
    
    let groups : ChannelsGroup[] = [];
    for (let i = 0; i < cellChannels.length; i++) {
        groups.push(
            {
                cellChannel: cellChannels[i],
                plotChannel: channels[i],
                savingChannel: savingChannels[i],
            })
    }

    return{
        avgSetter: plotAverager.SetAverage,
        offsetSetter: offsetSource.SetOffset,
        currentValueOffsetSetter: offsetSource.SetCurrentOffset,
        channelGroups: groups,
        peackDetected: peakEvent.asEvent(),
        absolutePeackDetected: absolutepeakEvent.asEvent(),
        setThreshold: analizerSource.SetThreshold,
        resetAbsoluteAnalizer: absoluteAnalizerSource.Reset,
        setAbsoluteAnalizer: absoluteAnalizerSource.setState,
        getAbsoluteAnalizerState: absoluteAnalizerSource.getState
    }

    function CreateTemperatureChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : Channel
    {
        return new Channel(source, CreatetemperatureStyle(fullSensorInfo, colorSeed));
    }

    function CreateTemperatureCellChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : CellChannel
    {
        return new CellChannel(source, CreatetemperatureCellStyle(fullSensorInfo, colorSeed));
    }

    function CreateSpeedChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : Channel
    {
        return new Channel(source, CreateSpeedStyle(fullSensorInfo, colorSeed));
    }

    function CreateSpeedCellChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : CellChannel
    {
        return new CellChannel(source, CreateCellSpeedStyle(fullSensorInfo, colorSeed));
    }

    function CreateMainChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : Channel
    {
        return new Channel(source, CreateTorqueStyle(fullSensorInfo, colorSeed));
    }

    function CreateMainCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : CellChannel
    {
        return new CellChannel(source, CreateTorqueCellStyle(fullSensorInfo, colorSeed));
    }

    function CreatePowerChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : Channel
    {
        return new Channel(source, CreatePowerStyle(fullSensorInfo, colorSeed));
    }

    function CreatePowerCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo, colorSeed: number) : CellChannel
    {
        return new CellChannel(source, CreatePowerCellStyle(fullSensorInfo, colorSeed));
    }
}