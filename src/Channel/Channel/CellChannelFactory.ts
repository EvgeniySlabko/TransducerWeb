import SensorComponentSensor from "../../Sensor/SingleComponentSensor.ts/sensor";
import { FullSensorInfo } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { Channel } from "./Channel";
import { CreateDefaultStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "../ChannelStyle/ChannelStyleFactory";
import { CreateAverageValueDataSource, CreateMainValueDataSource, CreateOffsetDataSource, CreatePowerDataSource, CreateSpeedValueDataSource, CreateTemperatureValueDataSource } from "../SensorDataProveder/DataSourceFactory";
import { CellChannel } from "./CellChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "../ChannelStyle/CellChannelStyleFactory";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { CellChannelsInfo } from "../SensorDataProveder/ISensorDataProvider";

declare interface ComplexCellInfo
{
    mainChannel: CellChannel;
    speedCahannel: CellChannel;
    powerChannel: CellChannel;

    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}


function CreateComplex(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : ComplexCellInfo
{
    let mainSource = CreateMainValueDataSource(sensor);
    let mainOffsetSource = CreateOffsetDataSource(mainSource, 0);
    let mainAvgSrc = CreateAverageValueDataSource(mainOffsetSource, 500);

    let mainChannel = new CellChannel(mainAvgSrc, CreateTorqueCellStyle(fullSensorInfo));

    let speedSource = CreateSpeedValueDataSource(sensor);
    let speedChannel = new CellChannel(speedSource, CreateCellSpeedStyle(fullSensorInfo));

    let powerSource = CreatePowerDataSource(mainOffsetSource, speedSource);
    let powerChannel = new CellChannel(powerSource, CreatePowerCellStyle(fullSensorInfo));

    return{
        currentValueOffsetSetter: () => mainOffsetSource.SetCurrentOffset(),
        offsetSetter: (offset: number) => mainOffsetSource.SetOffset(offset),
        mainChannel: mainChannel,
        powerChannel: powerChannel,
        speedCahannel: speedChannel,
    }
}

function CreateTemperatureCellChannel(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannel
{
    var dataSource = CreateTemperatureValueDataSource(sensor);
    return new CellChannel(dataSource, CreatetemperatureCellStyle(fullSensorInfo));
}

export function CreateAllSensorCellChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : CellChannelsInfo
{
    var channels: CellChannel[] = []; 

    let temperatureChannel = CreateTemperatureCellChannel(sensor, fullSensorInfo);
    let channelsInfo = CreateComplex(sensor, fullSensorInfo);
    channels.push(channelsInfo.mainChannel);
    channels.push(channelsInfo.speedCahannel);
    channels.push(temperatureChannel);
    channels.push(channelsInfo.powerChannel);

    return {
        currentValueOffsetSetter: channelsInfo.currentValueOffsetSetter,
        offsetSetter: channelsInfo.offsetSetter,
        cellChannels: channels,
    }
}

