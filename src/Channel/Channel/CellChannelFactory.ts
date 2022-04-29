import Sensor from "../../Sensor/sensor";
import { FullSensorInfo } from "../../Sensor/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateMainValueDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { CellChannel } from "./CellChannel";
import { CreateCellSpeedStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "../ChannelStyle/CellChannelStyleFactory";

function CreateMainValueCellChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateAverageValueDataSource(sensor, 100);
    return new CellChannel(dataSource, CreateTorqueCellStyle(fullSensorInfo));
}

function CreateSpeedCellChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateSpeedValueDataSource(sensor);
    return new CellChannel(dataSource, CreateCellSpeedStyle(fullSensorInfo));
}

function CreateTemperatureCellChannel(sensor: Sensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new CellChannel(dataSource, CreatetemperatureCellStyle());
}

export function CreateAllSensorCellChannels(sensor: Sensor, fullSensorInfo: FullSensorInfo) : CellChannel[]
{
    var channels: CellChannel[] = []; 
    var ch = CreateMainValueCellChannel(sensor, fullSensorInfo);
    channels.push(ch);
    channels.push(CreateTemperatureCellChannel(sensor, fullSensorInfo));
    if (fullSensorInfo.isRotative != 0)
    {
        channels.push(CreateSpeedCellChannel(sensor, fullSensorInfo));
    }    
    
    return channels;
}

