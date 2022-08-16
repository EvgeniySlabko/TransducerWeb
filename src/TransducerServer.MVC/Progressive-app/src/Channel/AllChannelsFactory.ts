import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { FullSensorInfo } from "../Sensor/SensorDefinitions";
import { FilterParameters } from "../Storage/ChannelsDataStorage";
import { CellChannel } from "./Channel/CellChannel";
import { PlotChannel } from "./Channel/PlotChannel";
import { CreateCellSpeedStyle, CreatePowerCellStyle, CreatetemperatureCellStyle, CreateTorqueCellStyle } from "./ChannelStyle/CellChannelStyleFactory";
import { CreatePowerStyle, CreateSpeedStyle, CreatetemperatureStyle, CreateTorqueStyle } from "./ChannelStyle/ChannelStyleFactory";
import { AbsoluteDataSource } from "./SensorDataSource/AbsoluteDataSource";
import { AbsolutePeakAnalyzer, PeakEventArgs } from "./SensorDataSource/AbsolutePeakAnalyzer";
import { ScaledDataSource } from "./SensorDataSource/ScaledDataSource";
import { AverageDataSource } from "./SensorDataSource/AverageDataProvider";
import { BufferSensorDataSource } from "./SensorDataSource/BufferDataSource";
import { CutOffDataSource } from "./SensorDataSource/CutOffDataSource";
import { DisplayValueDataSource } from "./SensorDataSource/DisplayValueDataSource";
import { FilterDataSource } from "./SensorDataSource/FilterDataSource";
import { GridAlignerSource } from "./SensorDataSource/GridAlignerSource";
import { InvertorDataSource } from "./SensorDataSource/InvertorDataSource";
import { DataSourseType, ISensorDataProvider } from "./SensorDataSource/ISensorDataProvider";
import { OffsetDataSource } from "./SensorDataSource/OffseDataSource";
import { PowerDataSource } from "./SensorDataSource/PowerDataSource";
import { SensorDataProvider } from "./SensorDataSource/SensorDataProvider";
import { SensorWorker } from "../Sensor/SensorWorker";

const CellFps = 6;
export interface ChannelsGroup {
    plotChannel: PlotChannel;
    savingChannel: PlotChannel;
    cellChannel: CellChannel;
}

export interface AllChannelsInfo {
    setGridAlignmentInterval: (dt: number) => void;
    setInvertiorSourceState: (invertion: boolean) => void;
    getInvertorSourceState: () => boolean;
    setAbsoluteSourceState: (invertion: boolean) => void;
    getAbsoluteSourceState: () => boolean;
    setFilterParameters: (filterParams: FilterParameters) => void;
    getFilterParameters: () => FilterParameters;
    channelGroups: ChannelsGroup[];
    PeackDetectedEvent: IEvent<PlotChannel, PeakEventArgs>;
    resetPeackAnalizer: () => void;
    setPeackAnalizerState: (state: boolean) => void;
    getPeackAnalizerState: () => boolean;
    setOffset: (offset: number) => void;
    getCurrentOffset: () => number;
    setCurrentOffset: () => number;
}

export function CreateAllChannels(worker: SensorWorker, fullSensorInfo: FullSensorInfo): AllChannelsInfo {
    let plotChannels: PlotChannel[] = [];
    let savingChannels: PlotChannel[] = [];
    let cellChannels: CellChannel[] = [];

    let sensor = worker.Source;

    //Torque
    let mainDataSource = CreateMainValueDataSource(sensor); // создаем источник основной измеряемой величины.
    let cutOffMainDataSource = CreateCutOffDataSource(mainDataSource); // отсекаем данные которые остались в буффере декодера после предыдущих измерений(ждем какое-то время)
    let offsetMainDataSource = CreateOffsetDataSource(cutOffMainDataSource); // коррекция нуля.
    let ScaledMainDataSource = CreateScaledDataSource(offsetMainDataSource, fullSensorInfo.valueRatio); // переводим в ньютоны. Например 1kN -> 1000N

    let absoluteMainDataSource = CreateAbsoluteDataSource(ScaledMainDataSource); // Абсолютное значение величины
    let invertedMainDataSource = CreateInvertorDataSource(absoluteMainDataSource); // Инвертированнное значение величины
    let filterMainDataSource = CreateFilterDataSource(invertedMainDataSource); // Фнч
    let alignedMainSource = CreateAlignedDataSource(filterMainDataSource); // Выравнивает данные по сетке с промежутками времени dt

    let peackAnalizerMainDataSource = CreatePeackAnalizerDataSource(filterMainDataSource); // Анализатор пиков

    let cellDisplayMainDataSource = CreateDisplayValueDataSource(offsetMainDataSource); // Выдает данные не чаще чем fps.
    //let plotAverager = CreateAverageValueDataSource(filterDataSource, 1);

    let mainPlotChannel = CreateMainDataPlotChannel(alignedMainSource, fullSensorInfo);
    let mainSavingChannel = CreateMainDataPlotChannel(filterMainDataSource, fullSensorInfo);
    let mainCellChannel = CreateMainDataCellChannel(cellDisplayMainDataSource, fullSensorInfo);

    plotChannels.push(mainPlotChannel);
    savingChannels.push(mainSavingChannel);
    cellChannels.push(mainCellChannel);

    //Speed
    let speedDataSource = CreateSpeedValueDataSource(sensor);
    let cutOffSpeedDataSource = CreateCutOffDataSource(speedDataSource);
    let DisplaySpeedDataSource = CreateDisplayValueDataSource(cutOffSpeedDataSource);
    let SpeedPlotChannel = CreateSpeedChannel(cutOffSpeedDataSource, fullSensorInfo);
    let speedCellChannel = CreateSpeedCellChannel(DisplaySpeedDataSource, fullSensorInfo);

    plotChannels.push(SpeedPlotChannel);
    savingChannels.push(SpeedPlotChannel);
    cellChannels.push(speedCellChannel);

    //Power
    let powerDataSource = CreatePowerDataSource(mainDataSource, speedDataSource);
    let cutOffPowerDataSource = CreateCutOffDataSource(powerDataSource);

    let powerDisplaySource = CreateDisplayValueDataSource(cutOffPowerDataSource);
    let powerPlotChannel = CreatePowerChannel(cutOffPowerDataSource, fullSensorInfo);
    let powerCellChannel = CreatePowerCellChannel(powerDisplaySource, fullSensorInfo);

    plotChannels.push(powerPlotChannel);
    savingChannels.push(powerPlotChannel);
    cellChannels.push(powerCellChannel);

    //Tmp
    let temperatureDataSource = CreateTemperatureValueDataSource(sensor);
    let temperatureChannel = CreateTemperatureChannel(temperatureDataSource, fullSensorInfo);
    let temperatureCellChannel = CreateTemperatureCellChannel(temperatureDataSource, fullSensorInfo);

    plotChannels.push(temperatureChannel);
    savingChannels.push(temperatureChannel);
    cellChannels.push(temperatureCellChannel);

    let peackDetectorEvent = new EventDispatcher<PlotChannel, PeakEventArgs>();

    peackAnalizerMainDataSource.onPeakDetected.sub((sensor, args) => {
        peackDetectorEvent.dispatch(mainPlotChannel, args);
    });

    let groups: ChannelsGroup[] = [];
    for (let i = 0; i < cellChannels.length; i++) {
        groups.push({
            cellChannel: cellChannels[i],
            plotChannel: plotChannels[i],
            savingChannel: savingChannels[i],
        });
    }

    return {
        setGridAlignmentInterval: (dt: number) => (alignedMainSource.Dt = dt),
        setAbsoluteSourceState: (absolute: boolean) => (absoluteMainDataSource.Enabled = absolute),
        getAbsoluteSourceState: () => absoluteMainDataSource.Enabled,
        getInvertorSourceState: () => invertedMainDataSource.Enabled,
        setInvertiorSourceState: (invertion: boolean) => (invertedMainDataSource.Enabled = invertion),
        setOffset: offsetMainDataSource.SetOffset,
        setCurrentOffset: offsetMainDataSource.SetCurrentOffset,
        getCurrentOffset: () => offsetMainDataSource.Offset,
        setFilterParameters: filterMainDataSource.SetFilterParams,
        getFilterParameters: () => filterMainDataSource.FilterParams,
        channelGroups: groups,
        PeackDetectedEvent: peackDetectorEvent.asEvent(),
        resetPeackAnalizer: peackAnalizerMainDataSource.Reset,
        setPeackAnalizerState: (enabled: boolean) => (peackAnalizerMainDataSource.Enabled = enabled),
        getPeackAnalizerState: () => peackAnalizerMainDataSource.Enabled,
    };

    function CreateTemperatureChannel(source: SensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatetemperatureStyle(fullSensorInfo));
    }

    function CreateCutOffDataSource(source: ISensorDataProvider): CutOffDataSource {
        return new CutOffDataSource(source);
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

    function CreateMainDataPlotChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreateTorqueStyle(fullSensorInfo));
    }

    function CreateMainDataCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreateTorqueCellStyle(fullSensorInfo));
    }

    function CreatePowerChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): PlotChannel {
        return new PlotChannel(source, CreatePowerStyle(fullSensorInfo));
    }

    function CreateFilterDataSource(source: ISensorDataProvider): FilterDataSource {
        return new FilterDataSource(source);
    }

    function CreatePowerCellChannel(source: ISensorDataProvider, fullSensorInfo: FullSensorInfo): CellChannel {
        return new CellChannel(source, CreatePowerCellStyle(fullSensorInfo));
    }

    function CreateInvertorDataSource(source: ISensorDataProvider): InvertorDataSource {
        return new InvertorDataSource(source);
    }

    function CreateAbsoluteDataSource(source: ISensorDataProvider): AbsoluteDataSource {
        return new AbsoluteDataSource(source);
    }

    function CreateAlignedDataSource(source: ISensorDataProvider): GridAlignerSource {
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

    function CreateAverageValueDataSource(baseSource: ISensorDataProvider, avgFactor: number): AverageDataSource {
        return new AverageDataSource(baseSource, avgFactor);
    }

    function CreateDisplayValueDataSource(baseSource: ISensorDataProvider): DisplayValueDataSource {
        return new DisplayValueDataSource(baseSource, CellFps);
    }

    function CreateScaledDataSource(baseSource: ISensorDataProvider, ratio: number): ScaledDataSource {
        return new ScaledDataSource(baseSource, ratio);
    }

    function CreateOffsetDataSource(baseSource: ISensorDataProvider): OffsetDataSource {
        return new OffsetDataSource(baseSource, 0);
    }

    function CreatePeackAnalizerDataSource(baseSource: ISensorDataProvider): AbsolutePeakAnalyzer {
        return new AbsolutePeakAnalyzer(baseSource);
    }

    function CreatePowerDataSource(toqueDataSourse: ISensorDataProvider, speedDataSourse: ISensorDataProvider): PowerDataSource {
        return new PowerDataSource(toqueDataSourse, speedDataSourse);
    }

    function CreateBufferedDataSource(dataSource: ISensorDataProvider, bufferSize: number): BufferSensorDataSource {
        return new BufferSensorDataSource(dataSource, bufferSize);
    }
}
