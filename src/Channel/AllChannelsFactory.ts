import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "./Channel/CellChannel";
import { CreateAllSensorCellChannels } from "./Channel/CellChannelFactory";
import { Channel } from "./Channel/Channel";
import { CreateAllSensorChannelsForPlot, CreateAllSensorChannelsSaving } from "./Channel/ChannelFactory";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateDetectorSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "./SensorDataProveder/DataSourceFactory";
import { ISensorDataProvider } from "./SensorDataProveder/ISensorDataProvider";
import { PeakEventArgs } from "./SensorDataProveder/PeakAnalyzer";
import { SensorDataProvider } from "./SensorDataProveder/SensorDataProvider";

export interface AllChannelsInfo
{
    plotChannels: Channel[];
    savingChannels: Channel[];
    cellChannels: CellChannel[];

    avgSetter: (avgRatio: number) => void,
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: ()  => number,
    peackDetected: IEvent<Channel, PeakEventArgs>
}

/*
export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo, colorSeed: number) : AllChannelsInfo 
{
    let plotChannelsInfo = CreateAllSensorChannelsForPlot(sensor, fullSensorInfo, colorSeed);
    let savingChannelsInfo = CreateAllSensorChannelsSaving(sensor, fullSensorInfo, colorSeed);

    let cellChannelsInfo = CreateAllSensorCellChannels(sensor, fullSensorInfo, colorSeed);

    let offsetSetterAll = (offset: number) =>{
        plotChannelsInfo.offsetSetter(offset);
        savingChannelsInfo.offsetSetter(offset);
        cellChannelsInfo.offsetSetter(offset);
    }

    // для записи в отчета усреднение не ставится (всегда 1)
    let avgSetterAll = (offset: number) =>{
        plotChannelsInfo.offsetSetter(offset);
        cellChannelsInfo.offsetSetter(offset);
    }

    let currentValueOffsetSetAll = () : number =>{
        let offset = plotChannelsInfo.currentValueOffsetSetter();
        cellChannelsInfo.currentValueOffsetSetter();
        savingChannelsInfo.currentValueOffsetSetter();
        return offset
    }

    return{
        avgSetter: avgSetterAll,
        offsetSetter: offsetSetterAll,
        currentValueOffsetSetter: currentValueOffsetSetAll,
        cellChannels: cellChannelsInfo.cellChannels,
        savingChannels: savingChannelsInfo.plotChannels,
        plotChannels: plotChannelsInfo.plotChannels,
        peackDetected: plotChannelsInfo.peakDetected,
    }
}
*/

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo, colorSeed: number) : AllChannelsInfo 
{
    let channels: Channel[] = []; 
    let savingChannels: Channel[] = []; 
    let cellChannels: CellChannel[] = [];

    //Torque
    let mainSource = CreateMainValueDataSource(sensor);
    let offsetSource =  CreateOffsetDataSource(mainSource, 0);
    let analizerSource = CreateDetectorSource(offsetSource, 0.1 * fullSensorInfo.MaxValue);
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
    
    analizerSource.onPeakDetected.sub((sensor, args) =>
    {
        peakEvent.dispatch(mainPlotChannel, args);
    });
    

    return{
        avgSetter: plotAverager.SetAverage,
        offsetSetter: offsetSource.SetOffset,
        currentValueOffsetSetter: offsetSource.SetCurrentOffset,
        cellChannels: cellChannels,
        savingChannels: savingChannels,
        plotChannels: channels,
        peackDetected: peakEvent.asEvent(),
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