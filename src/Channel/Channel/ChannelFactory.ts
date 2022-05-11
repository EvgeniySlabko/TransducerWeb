import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateMainValueDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";

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
    return new Channel(dataSource, CreatetemperatureStyle());
}

function CreatePowerChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreatePowerDataSource(sensor);
    return new Channel(dataSource, CreatePowerStyle(fullSensorInfo));
}

export function CreateAllSensorChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : Channel[]
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

