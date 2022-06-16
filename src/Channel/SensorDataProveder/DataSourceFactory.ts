import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { AverageSensorDataProvider } from "./AverageDataProvider";
import { BufferedSensorDataProvider } from "./BufferedDataProvider";
import { DataSourseType, ISensorDataProvider } from "./ISensorDataProvider";
import { OffsetDataProvider } from "./OffseDataProveder";
import { PowerDataProvider } from "./PowerDataProveder";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: ISingleComponentSensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.MainValue);
}

export function CreateSpeedValueDataSource(sensor: ISingleComponentSensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.Speed);
}

export function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.Temperature);
}

export function CreateAverageValueDataSource(baseSource: ISensorDataProvider, avgFactor: number) : AverageSensorDataProvider
{
    return new AverageSensorDataProvider(baseSource, avgFactor);
}

export function CreateOffsetDataSource(baseSource: ISensorDataProvider, offset: number) : OffsetDataProvider
{
    return new OffsetDataProvider(baseSource, 0);
}

export function CreatePowerDataSource(toqueDataSourse: ISensorDataProvider, speedDataSourse: ISensorDataProvider) : PowerDataProvider
{
    return new PowerDataProvider(toqueDataSourse, speedDataSourse);
}

export function CreateBufferedDataSource(dataSource: ISensorDataProvider, bufferSize: number) : BufferedSensorDataProvider
{
    return new BufferedSensorDataProvider(dataSource, bufferSize);
}