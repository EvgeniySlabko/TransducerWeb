import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { FilterParameters } from "../Storage/ChannelsDataStorage";
import { CellChannel } from "./Channel/CellChannel";
import { PlotChannel } from "./Channel/PlotChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { AbsoluteDataSource } from "./SensorDataProveder/AbsoluteDataSource";
import { AbsolutePeakAnalyzer, PeakEventArgs } from "./SensorDataProveder/AbsolutePeakAnalyzer";
import { Amplifier } from "./SensorDataProveder/AmplifierDataProvider";
import { AverageSensorDataProvider } from "./SensorDataProveder/AverageDataProvider";
import { BufferSensorDataProvider } from "./SensorDataProveder/BufferDataProvider";
import { CutOffDataProvider } from "./SensorDataProveder/CutOffDataProvider";
import { DisplayValueDataSource } from "./SensorDataProveder/DisplayValueDataSource";
import { FilterDataProvider } from "./SensorDataProveder/FilterDataProvider";
import { GridAlignerSource } from "./SensorDataProveder/GridAlignerSource";
import { InvertorDataSource } from "./SensorDataProveder/InvertorDataSource";
import { DataSourseType, ISensorDataProvider } from "./SensorDataProveder/ISensorDataProvider";
import { OffsetDataProvider } from "./SensorDataProveder/OffseDataProveder";
import { PowerDataProvider } from "./SensorDataProveder/PowerDataProveder";
import { SensorDataProvider } from "./SensorDataProveder/SensorDataProvider";

const CellFps = 6;
export interface ChannelsGroup {
    plotChannel: PlotChannel;
    savingChannel: PlotChannel;
    cellChannel: CellChannel;
}

export interface AllChannelsInfo {
    setGridAlignmentInterval: (dt: number) => void;
    setInvertionState: (invertion: boolean) => void
    invertionState: () => boolean
    setAbsoluteState: (invertion: boolean) => void
    absoluteState: () => boolean
    setFilterParameters: (filterParams: FilterParameters) => void;
    filterParameters: () => FilterParameters;
    channelGroups: ChannelsGroup[];
    absolutePeackDetected: IEvent<PlotChannel, PeakEventArgs>,
    resetAbsoluteAnalizer: () => void,
    setAbsoluteAnalizer: (state: boolean) => void,
    getAbsoluteAnalizerState: () => boolean,
    setOffset: (offset: number) => void,
    offset: () => number,
    setCurrentOffset: () => number,
}

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo): AllChannelsInfo {
    let channels: PlotChannel[] = [];
    let savingChannels: PlotChannel[] = [];
    let cellChannels: CellChannel[] = [];

    //Torque
    let mainSource = CreateMainValueDataSource(sensor);                                             // создаем источник основной измеряемой величины.
    let cutOffMainSource = CreateCutOffChannel(mainSource);                                         // отсекаем данные которые остались в буффере декодера после предыдущих измерений(ждем какое-то время)
    let offsetSource = CreateOffsetDataSource(cutOffMainSource);                                 // коррекция нуля.
    let applifiredDataSource = CreateAmplifiredDataSource(offsetSource, fullSensorInfo.valueRatio); // переводим в ньютоны. Например 1kN -> 1000N

    let absoluteDataSource = CreateAbsoluteChannel(applifiredDataSource);                           // Абсолютное значение величины
    let invertedDataSource = CreateInvertedChannel(absoluteDataSource);                             // Инвертированнное значение величины
    let filterDataSource = CreateFilter(invertedDataSource);                                        // Фнч
    let alignedSource = CreateAlignedChannel(filterDataSource);                                     // Выравнивает данные по сетке с промежутками времени dt

    let absoluteAnalizerSource = CreateAbsoluteAnalizerSource(filterDataSource);                    // Анализатор пиков

    let cellDisplaySource = CreateDisplayValueDataSource(offsetSource);                          // Выдает данные не чаще чем fps.
    //let plotAverager = CreateAverageValueDataSource(filterDataSource, 1);

    let mainPlotChannel = CreateMainChannel(alignedSource, fullSensorInfo);
    let mainSavingChannel = CreateMainChannel(filterDataSource, fullSensorInfo);
    let mainCellChannel = CreateMainCellChannel(cellDisplaySource, fullSensorInfo);

    channels.push(mainPlotChannel);
    savingChannels.push(mainSavingChannel);
    cellChannels.push(mainCellChannel);

    //Speed
    let speedSource = CreateSpeedValueDataSource(sensor);
    let cutOffSpeedSource = CreateCutOffChannel(speedSource);
    let speedDisplaySource = CreateDisplayValueDataSource(cutOffSpeedSource);
    let speedPlotChannel = CreateSpeedChannel(cutOffSpeedSource, fullSensorInfo);
    let speedCellChannel = CreateSpeedCellChannel(speedDisplaySource, fullSensorInfo);

    channels.push(speedPlotChannel);
    savingChannels.push(speedPlotChannel);
    cellChannels.push(speedCellChannel);

    //Power
    let powerSource = CreatePowerDataSource(mainSource, speedSource);
    let cutOffPowerSource = CreateCutOffChannel(powerSource);

    let powerDisplaySource = CreateDisplayValueDataSource(cutOffPowerSource);
    let powerPlotChannel = CreatePowerChannel(cutOffPowerSource, fullSensorInfo);
    let powerCellChannel = CreatePowerCellChannel(powerDisplaySource, fullSensorInfo);

    channels.push(powerPlotChannel);
    savingChannels.push(powerPlotChannel);
    cellChannels.push(powerCellChannel);

    //Tmp
    let tmpSource = CreateTemperatureValueDataSource(sensor);
    let temperatureChannel = CreateTemperatureChannel(tmpSource, fullSensorInfo);
    let temperatureCellChannel = CreateTemperatureCellChannel(tmpSource, fullSensorInfo);

    channels.push(temperatureChannel);
    savingChannels.push(temperatureChannel);
    cellChannels.push(temperatureCellChannel);

    let absolutepeakEvent = new EventDispatcher<PlotChannel, PeakEventArgs>();

    absoluteAnalizerSource.onPeakDetected.sub((sensor, args) => {
        absolutepeakEvent.dispatch(mainPlotChannel, args);
    });

    let groups: ChannelsGroup[] = [];
    for (let i = 0; i < cellChannels.length; i++) {
        groups.push(
            {
                cellChannel: cellChannels[i],
                plotChannel: channels[i],
                savingChannel: savingChannels[i],
            })
    }

    return {
        setGridAlignmentInterval: (dt: number) => alignedSource.Dt = dt,
        setAbsoluteState: (absolute: boolean) => absoluteDataSource.Absolute = absolute,
        absoluteState: () => absoluteDataSource.Absolute,
        invertionState: () => invertedDataSource.Inverted,
        setInvertionState: (invertion: boolean) => invertedDataSource.Inverted = invertion,
        setOffset: offsetSource.SetOffset,
        setCurrentOffset: offsetSource.SetCurrentOffset,
        offset: () => offsetSource.Offset,
        setFilterParameters: filterDataSource.SetFilterParams,
        filterParameters: () => filterDataSource.FilterParams,
        channelGroups: groups,
        absolutePeackDetected: absolutepeakEvent.asEvent(),
        resetAbsoluteAnalizer: absoluteAnalizerSource.Reset,
        setAbsoluteAnalizer: absoluteAnalizerSource.setState,
        getAbsoluteAnalizerState: absoluteAnalizerSource.getState,
    }

    function CreateTemperatureChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatetemperatureStyle(fullSensorInfo));
    }

    function CreateCutOffChannel(source: ISensorDataProvider): CutOffDataProvider {
        return new CutOffDataProvider(source);
    }
    
    function CreateTemperatureCellChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatetemperatureCellStyle(fullSensorInfo));
    }

    function CreateSpeedChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreateSpeedStyle(fullSensorInfo));
    }

    function CreateSpeedCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreateCellSpeedStyle(fullSensorInfo));
    }

    function CreateMainChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreateTorqueStyle(fullSensorInfo));
    }

    function CreateMainCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreateTorqueCellStyle(fullSensorInfo));
    }

    function CreatePowerChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatePowerStyle(fullSensorInfo));
    }

    function CreateFilter(source: ISensorDataProvider): FilterDataProvider {
        return new FilterDataProvider(source);
    }

    function CreatePowerCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatePowerCellStyle(fullSensorInfo));
    }

    function CreateInvertedChannel(source: ISensorDataProvider): InvertorDataSource {
        return new InvertorDataSource(source);
    }
    
    function CreateAbsoluteChannel(source: ISensorDataProvider): AbsoluteDataSource {
        return new AbsoluteDataSource(source);
    }

    function CreateAlignedChannel(source: ISensorDataProvider): GridAlignerSource {
        return new GridAlignerSource(source);
    }

    function CreateMainValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
        return new SensorDataProvider(sensor, DataSourseType.MainValue);
    }
    
    function CreateSpeedValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
        return new SensorDataProvider(sensor, DataSourseType.Speed);
    }
    
    function CreateTemperatureValueDataSource(sensor: ISingleComponentSensor): SensorDataProvider {
        return new SensorDataProvider(sensor, DataSourseType.Temperature);
    }
    
    function CreateAverageValueDataSource(baseSource: ISensorDataProvider, avgFactor: number): AverageSensorDataProvider {
        return new AverageSensorDataProvider(baseSource, avgFactor);
    }
    
    function CreateDisplayValueDataSource(baseSource: ISensorDataProvider): DisplayValueDataSource {
        return new DisplayValueDataSource(baseSource, CellFps);
    }
    
    function CreateAmplifiredDataSource(baseSource: ISensorDataProvider, ratio: number): Amplifier {
        return new Amplifier(baseSource, ratio);
    }
    
    function CreateOffsetDataSource(baseSource: ISensorDataProvider): OffsetDataProvider {
        return new OffsetDataProvider(baseSource, 0);
    }
    
    function CreateAbsoluteAnalizerSource(baseSource: ISensorDataProvider): AbsolutePeakAnalyzer {
        return new AbsolutePeakAnalyzer(baseSource);
    }
    
    function CreatePowerDataSource(toqueDataSourse: ISensorDataProvider, speedDataSourse: ISensorDataProvider): PowerDataProvider {
        return new PowerDataProvider(toqueDataSourse, speedDataSourse);
    }
    
    function CreateBufferedDataSource(dataSource: ISensorDataProvider, bufferSize: number): BufferSensorDataProvider {
        return new BufferSensorDataProvider(dataSource, bufferSize);
    }
}