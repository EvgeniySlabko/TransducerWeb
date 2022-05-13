import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateMainValueDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { CellChannel } from "./CellChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "../ChannelStyle/CellChannelStyleFactory";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";

function CreateMainValueCellChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    let baseMainValueSource = CreateMainValueDataSource(sensor);
    //var dataSource = CreateAverageValueDataSource(baseMainValueSource, 1);
    return new CellChannel(baseMainValueSource, CreateTorqueCellStyle(fullSensorInfo));
}

function CreateSpeedCellChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateSpeedValueDataSource(sensor);
    return new CellChannel(dataSource, CreateCellSpeedStyle(fullSensorInfo));
}

function CreateTemperatureCellChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new CellChannel(dataSource, CreatetemperatureCellStyle());
}

function CreatePowerCellChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreatePowerDataSource(sensor);
    return new CellChannel(dataSource, CreatePowerCellStyle(fullSensorInfo));
}

export function CreateAllSensorCellChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel[]
{
    var channels: CellChannel[] = []; 
    var ch = CreateMainValueCellChannel(sensor, fullSensorInfo);
    channels.push(ch);
    channels.push(CreateTemperatureCellChannel(sensor, fullSensorInfo));
    if (fullSensorInfo.isRotative != 0)
    {
        channels.push(CreatePowerCellChannel(sensor, fullSensorInfo));
        channels.push(CreateSpeedCellChannel(sensor, fullSensorInfo));
    }    
    
    return channels;
}

