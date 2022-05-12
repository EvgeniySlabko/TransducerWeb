import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { AverageSensorDataProvider } from "./AverageDataProvider";
import { DataSourseType, ISensorDataProvider } from "./ISensorDataProvider";
import { PowerDataProvider } from "./PowerDataProveder";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.MainValue);
}

export function CreateSpeedValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.Speed);
}

export function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor, DataSourseType.Temperature);
}

export function CreateAverageValueDataSource(baseSource: ISensorDataProvider, avgFactor: number) : ISensorDataProvider
{
    return new AverageSensorDataProvider(baseSource, avgFactor);
}

export function CreatePowerDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new PowerDataProvider(sensor);
}