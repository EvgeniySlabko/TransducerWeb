import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISensor";
import { AverageSensorDataProvider } from "./AverageDataProvider";
import { BufferedSensorDataProvider } from "./BufferedDataProvider";
import { ISensorDataProvider } from "./ISensorDataProvider";
import { PowerDataProvider } from "./PowerDataProveder";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onData, null, sensor.onClose);

    //return new BufferedSensorDataProvider(sensor.onData, null, sensor.onClose, sensor.onStopStreaming, 100);
}

export function CreateSpeedValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onSpeed, null, sensor.onClose);
}

export function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new SensorDataProvider(sensor.onTmp, null, sensor.onClose);
}

export function CreateAverageValueDataSource(baseProveder: ISensorDataProvider, sensor: ISingleComponentSensor, avgFactor: number) : ISensorDataProvider
{
    return new AverageSensorDataProvider(baseProveder, sensor.onStopStreaming, avgFactor);
}


export function CreatePowerDataSource(sensor: ISingleComponentSensor) : ISensorDataProvider
{
    return new PowerDataProvider(sensor.onSpeed, sensor.onData, null, sensor.onClose);
}