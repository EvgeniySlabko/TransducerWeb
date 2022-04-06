import Sensor from "../../Sensor/sensor";
import { Channel } from "../Channel";
import { CreateDefaultStyle } from "../ChannelStyleFactory";
import { ISensorDataProvider } from "../SensorDataProveder/ISensorDataProvider";
import { SensorDataProvider } from "../SensorDataProveder/SensorDataProvider";
export function CreateMainValueDataSource(sensor: Sensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onData, null, sensor.onError);
}

export function CreateSpeedValueDataSource(sensor: Sensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor.onSpeed, null, sensor.onError);
}

export function CreateTemperatureValueDataSource(sensor: Sensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor.onTmp, null, sensor.onError);
}