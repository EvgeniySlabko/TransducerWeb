import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { AbsolutePeakAnalyzer } from "./AbsolutePeakAnalyzer";
import { Amplifier } from "./AmplifierDataProvider";
import { AverageSensorDataProvider } from "./AverageDataProvider";
import { BufferSensorDataProvider } from "./BufferDataProvider";
import { DisplayValueDataSource } from "./DisplayValueDataSource";
import { DataSourseType, ISensorDataProvider } from "./ISensorDataProvider";
import { OffsetDataProvider } from "./OffseDataProveder";
import { PowerDataProvider } from "./PowerDataProveder";
import { SensorDataProvider } from "./SensorDataProvider";

export function CreateMainValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
    return new SensorDataProvider(sensor, DataSourseType.MainValue);
}

export function CreateSpeedValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
    return new SensorDataProvider(sensor, DataSourseType.Speed);
}

export function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
    return new SensorDataProvider(sensor, DataSourseType.Temperature);
}

export function CreateAverageValueDataSource(baseSource: ISensorDataProvider, avgFactor: number): AverageSensorDataProvider {
    return new AverageSensorDataProvider(baseSource, avgFactor);
}

export function CreateDisplayValueDataSource(baseSource: ISensorDataProvider, fps: number): DisplayValueDataSource {
    return new DisplayValueDataSource(baseSource, fps);
}

export function CreateAmplifiredDataSource(baseSource: ISensorDataProvider, ratio: number): Amplifier {
    return new Amplifier(baseSource, ratio);
}

export function CreateOffsetDataSource(baseSource: ISensorDataProvider, offset: number): OffsetDataProvider {
    return new OffsetDataProvider(baseSource, 0);
}

export function CreateAbsoluteAnalizerSource(baseSource: ISensorDataProvider): AbsolutePeakAnalyzer {
    return new AbsolutePeakAnalyzer(baseSource);
}

export function CreatePowerDataSource(toqueDataSourse: ISensorDataProvider, speedDataSourse: ISensorDataProvider): PowerDataProvider {
    return new PowerDataProvider(toqueDataSourse, speedDataSourse);
}

export function CreateBufferedDataSource(dataSource: ISensorDataProvider, bufferSize: number): BufferSensorDataProvider {
    return new BufferSensorDataProvider(dataSource, bufferSize);
}