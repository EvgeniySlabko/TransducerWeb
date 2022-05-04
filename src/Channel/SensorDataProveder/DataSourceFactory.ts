import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { AverageSensorDataProvider } from "./AverageDataProvider";
import { BufferedSensorDataProvider } from "./BufferedDataProvider";
import { ISensorDataProvider } from "./ISensorDataProvider";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new BufferedSensorDataProvider(sensor.onData, null, sensor.onError, 100);
}

export function CreateSpeedValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onSpeed, null, sensor.onError);
}

export function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onTmp, null, sensor.onError);
}

export function CreateAverageValueDataSource(sensor: ISingleComponentSensor, avgFactor: number) : ISensorDataProvider
{
    return new AverageSensorDataProvider(sensor.onData, null, sensor.onError, avgFactor);
}
