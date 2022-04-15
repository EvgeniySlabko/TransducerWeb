import Sensor from "../../Sensor/sensor";
import { BufferedSensorDataProvider } from "./BufferedDataProvider";
import { ISensorDataProvider } from "./ISensorDataProvider";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: Sensor) : ISensorDataProvider
{
    return new BufferedSensorDataProvider(sensor.onData, null, sensor.onError, 100);
}

export function CreateSpeedValueDataSource(sensor: Sensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor.onSpeed, null, sensor.onError);
}

export function CreateTemperatureValueDataSource(sensor: Sensor) : SensorDataProvider
{
    return new SensorDataProvider(sensor.onTmp, null, sensor.onError);
}