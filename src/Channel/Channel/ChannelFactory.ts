import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { PlotCellChannelsInfo, SavingPlotChannelsInfo } from "../SensorDataProveder/ISensorDataProvider";

declare interface ComplexSavingInfo
{
    mainChannel: Channel;
    speedCahannel: Channel;
    powerChannel: Channel;

    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}

declare interface ComplexPlotInfo
{
    mainChannel: Channel;
    speedCahannel: Channel;
    powerChannel: Channel;

    avgSetter: (offset: number) => void,
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}

function CreatePlotComlex(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : ComplexPlotInfo
{
    let mainSource = CreateMainValueDataSource(sensor);
    let mainOffsetSource = CreateOffsetDataSource(mainSource, 0);
    let mainAvgSrc = CreateAverageValueDataSource(mainOffsetSource, 1);

    let mainChannel = new Channel(mainAvgSrc, CreateTorqueStyle(fullSensorInfo));

    let speedSource = CreateSpeedValueDataSource(sensor);
    let speedChannel = new Channel(speedSource, CreateSpeedStyle(fullSensorInfo));

    let powerSource = CreatePowerDataSource(mainOffsetSource, speedSource);
    let powerChannel = new Channel(powerSource, CreatePowerStyle(fullSensorInfo));

    return{
        currentValueOffsetSetter: () => mainOffsetSource.SetCurrentOffset(),
        offsetSetter: (offset: number) => mainOffsetSource.SetOffset(offset),
        avgSetter: (avg: number) => mainAvgSrc.SetAverage(avg),
        mainChannel: mainChannel,
        powerChannel: powerChannel,
        speedCahannel: speedChannel,
    }
}

function CreateSavingComlex(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : ComplexSavingInfo
{
    let mainSource = CreateMainValueDataSource(sensor);
    let mainOffsetSource = CreateOffsetDataSource(mainSource, 0);
    //let mainAvgSrc = CreateAverageValueDataSource(mainOffsetSource, 1);

    let mainChannel = new Channel(mainOffsetSource, CreateTorqueStyle(fullSensorInfo));

    let speedSource = CreateSpeedValueDataSource(sensor);
    let speedChannel = new Channel(speedSource, CreateSpeedStyle(fullSensorInfo));

    let powerSource = CreatePowerDataSource(mainOffsetSource, speedSource);
    let powerChannel = new Channel(powerSource, CreatePowerStyle(fullSensorInfo));

    return{
        currentValueOffsetSetter: () => mainOffsetSource.SetCurrentOffset(),
        offsetSetter: (offset: number) => mainOffsetSource.SetOffset(offset),
        mainChannel: mainChannel,
        powerChannel: powerChannel,
        speedCahannel: speedChannel,
    }
}

function CreateTemperatureChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new Channel(dataSource, CreatetemperatureStyle(fullSensorInfo));
}

// для графика делаем канал осн. изм величины с офсетером и авгсетером
export function CreateAllSensorChannelsForPlot(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : PlotCellChannelsInfo
{
    var channels: Channel[] = []; 

    let temperatureChannel = CreateTemperatureChannel(sensor, fullSensorInfo);
    let channelsInfo = CreatePlotComlex(sensor, fullSensorInfo);
    channels.push(channelsInfo.mainChannel);
    channels.push(channelsInfo.speedCahannel);
    channels.push(temperatureChannel);
    channels.push(channelsInfo.powerChannel);

    return {
        avgSetter: channelsInfo.avgSetter,
        currentValueOffsetSetter: channelsInfo.currentValueOffsetSetter,
        offsetSetter: channelsInfo.offsetSetter,
        plotChannels: channels
    }
}

// для записи в файл делаем каналы осн. изм величины с офсетером
export function CreateAllSensorChannelsSaving(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : SavingPlotChannelsInfo
{
    var channels: Channel[] = []; 

    let temperatureChannel = CreateTemperatureChannel(sensor, fullSensorInfo);
    let channelsInfo = CreateSavingComlex(sensor, fullSensorInfo);
    channels.push(channelsInfo.mainChannel);
    channels.push(channelsInfo.speedCahannel);
    channels.push(temperatureChannel);
    channels.push(channelsInfo.powerChannel);

    return {
        currentValueOffsetSetter: channelsInfo.currentValueOffsetSetter,
        offsetSetter: channelsInfo.offsetSetter,
        plotChannels: channels
    }
}

