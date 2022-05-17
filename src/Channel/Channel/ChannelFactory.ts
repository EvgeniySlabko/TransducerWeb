import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateMainValueDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";

function CreateMainValueChannelWithAveraging(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateMainValueDataSource(sensor);
    let avgSrc = CreateAverageValueDataSource(dataSource, 1);
    return new Channel(avgSrc, CreateTorqueStyle(fullSensorInfo));
}

function CreateMainValueChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateMainValueDataSource(sensor);
    return new Channel(dataSource, CreateTorqueStyle(fullSensorInfo));
}

function CreateSpeedChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateSpeedValueDataSource(sensor);
    return new Channel(dataSource, CreateSpeedStyle(fullSensorInfo));
}

function CreateTemperatureChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new Channel(dataSource, CreatetemperatureStyle(fullSensorInfo));
}

function CreatePowerChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreatePowerDataSource(sensor);
    return new Channel(dataSource, CreatePowerStyle(fullSensorInfo));
}

export function CreateAllSensorChannelsForPlot(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel[]
{
    var channels: Channel[] = []; 
    channels.push(CreateMainValueChannelWithAveraging(sensor, fullSensorInfo));
    channels.push(CreateTemperatureChannel(sensor, fullSensorInfo));
    if (fullSensorInfo.isRotative != 0)
    {
        channels.push(CreateSpeedChannel(sensor, fullSensorInfo));
        channels.push(CreatePowerChannel(sensor, fullSensorInfo));
    }    
    
    return channels;
}

export function CreateAllSensorChannelsSaving(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel[]
{
    var channels: Channel[] = []; 
    channels.push(CreateMainValueChannel(sensor, fullSensorInfo));

    channels.push(CreateTemperatureChannel(sensor, fullSensorInfo));
    if (fullSensorInfo.isRotative != 0)
    {
        channels.push(CreateSpeedChannel(sensor, fullSensorInfo));
        channels.push(CreatePowerChannel(sensor, fullSensorInfo));
    }    
    
    return channels;
}

