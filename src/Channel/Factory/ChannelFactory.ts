import Sensor from "../../Sensor/sensor";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
import { Channel } from "../Channel";
import { CreateDefaultStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyleFactory";
import { CreateMainValueDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "./DataSourceFactory";

function CreateMainValueChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateMainValueDataSource(sensor);
    return new Channel(dataSource, CreateTorqueStyle(fullSensorInfo));
}

function CreateSpeedChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateSpeedValueDataSource(sensor);
    return new Channel(dataSource, CreateSpeedStyle(fullSensorInfo));
}

function CreateTemperatureChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : Channel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new Channel(dataSource, CreatetemperatureStyle());
}

export function CreateAllSensorChannels(sensor: Sensor, fullSensorInfo: FullSensorInfo) : Channel[]
{
    var channels: Channel[] = []; 
    channels.push(CreateMainValueChannel(sensor, fullSensorInfo));
    channels.push(CreateTemperatureChannel(sensor, fullSensorInfo));
    if (fullSensorInfo.isRotative != 0)
    {
        channels.push(CreateSpeedChannel(sensor, fullSensorInfo));
    }    
    
    return channels;
}

