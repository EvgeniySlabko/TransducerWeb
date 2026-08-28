import { AllChannelsInfo, StylesGroup, PipelineController } from "../Channel/AllChannelsFactory";
import { CellChannelStyle } from "../Channel/ChannelStyle/CellChannelStyle";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import { ChannelDataType } from "../Channel/ChannelStyle/ChanneStyleCommon";
import { Group } from "../store/groupsSlice";
import { SensorWorker } from "../Sensor/SensorWorker";

export type FilterType = "bessel" | "butterworth";
export declare class FilterParameters {
    enabled: boolean;
    fc: number;
    filterType: FilterType;
    order: number;
}

export declare class SensorStorageParameters {
    externalSpeedSensor: boolean;
    offset: number;
    filterParameters: FilterParameters;
    avgRatio: number;
    speedPeriod: number;
    absolute: boolean;
    invertion: boolean;
}

let defaultSensorParams: SensorStorageParameters = {
    externalSpeedSensor: false,
    offset: 0,
    avgRatio: 1,
    speedPeriod: 100,
    absolute: false,
    invertion: false,
    filterParameters: {
        enabled: true,
        fc: 1000,
        filterType: "bessel",
        order: 3,
    },
};

export function SaveChannelGroupParameters(groups: StylesGroup[], sensorId: string) {
    groups.forEach((g) => {
        let plotStyle = g.plotStyle;
        let cellStyle = g.cellStyle;
        let savingStyle = g.savingStyle;

        let plotStyleJson = JSON.stringify(plotStyle);
        let cellStyleJson = JSON.stringify(cellStyle);
        let savingStyleJson = JSON.stringify(savingStyle);

        let plotKey = getPlotStyleKey(sensorId, g.plotStyle.valueType);
        let cellKey = getCellStyleKey(sensorId, g.plotStyle.valueType);
        let savingKey = getSavingStyleKey(sensorId, g.plotStyle.valueType);

        localStorage.setItem(plotKey, plotStyleJson);
        localStorage.setItem(cellKey, cellStyleJson);
        localStorage.setItem(savingKey, savingStyleJson);
    });
}

export function ApplayLocalStorageSettingsForGroups(groups: StylesGroup[], sensorId: string) {
    groups.forEach((g) => {
        let plotKey = getPlotStyleKey(sensorId, g.plotStyle.valueType);
        let cellKey = getCellStyleKey(sensorId, g.plotStyle.valueType);
        let savingKey = getSavingStyleKey(sensorId, g.plotStyle.valueType);

        let plotStyleJson = localStorage.getItem(plotKey);
        let cellStyleJson = localStorage.getItem(cellKey);
        let savingStyleJson = localStorage.getItem(savingKey);
        if (plotStyleJson === null || cellStyleJson === null || savingStyleJson === null) return;
        try {
            let plotStyle = JSON.parse(plotStyleJson) as PlotChannelStyle;
            let savingStyle = JSON.parse(savingStyleJson) as PlotChannelStyle;
            let cellStyle = JSON.parse(cellStyleJson) as CellChannelStyle;

            g.cellStyle.fontSize = cellStyle.fontSize;
            g.cellStyle.limits = cellStyle.limits;
            g.cellStyle.color = cellStyle.color;
            g.cellStyle.visible = cellStyle.visible;
            g.cellStyle.accuracy = cellStyle.accuracy;

            g.plotStyle.color = plotStyle.color;
            g.plotStyle.drawLimits = plotStyle.drawLimits;
            g.plotStyle.grid = plotStyle.grid;
            g.plotStyle.legendValueAccuracy = plotStyle.legendValueAccuracy;
            g.plotStyle.visible = plotStyle.visible;
            g.plotStyle.width = plotStyle.width;

            g.savingStyle.color = savingStyle.color;
            g.savingStyle.drawLimits = savingStyle.drawLimits;
            g.savingStyle.grid = savingStyle.grid;
            g.savingStyle.legendValueAccuracy = savingStyle.legendValueAccuracy;
            g.savingStyle.visible = savingStyle.visible;
            g.savingStyle.width = savingStyle.width;
        } catch {
            return;
        }
    });
}

export function SaveSensorParameters(parameters: SensorStorageParameters, sensorId: string) {
    let parametersJson = JSON.stringify(parameters);
    let key = getSensorParametersKey(sensorId);
    localStorage.setItem(key, parametersJson);
}

export async function SetOffset(offset: number, sensorId: string) {
    let params = await GetSensorParameters(sensorId);
    if (params === null) {
        params = defaultSensorParams;
    }

    params.offset = offset;
    SaveSensorParameters(params, sensorId);
}

export async function ApplySensorParameters(worker: SensorWorker, pipeline: PipelineController, sensorId: string) {
    let parameters = await GetSensorParameters(sensorId);

    await worker.SetExternalSpeedSensorState(parameters.externalSpeedSensor);

    let minAvgRatio = worker.DecoderParams.minAvgRatio;
    await worker.SetAverageRatio(parameters.avgRatio < minAvgRatio ? minAvgRatio : parameters.avgRatio);

    await worker.SetSpeedPeriod(parameters.speedPeriod);
    pipeline.setInvertiorSourceState(parameters.invertion);
    pipeline.setAbsoluteSourceState(parameters.absolute);
    pipeline.setFilterParameters(parameters.filterParameters);
    pipeline.setOffset(parameters.offset);
}

export async function GetSensorParameters(sensorId: string): Promise<SensorStorageParameters> {
    let key = getSensorParametersKey(sensorId);
    let parametersJson = localStorage.getItem(key);
    if (parametersJson === null) return defaultSensorParams;

    let parameters = JSON.parse(parametersJson) as SensorStorageParameters;
    return parameters;
}

function getSensorParametersKey(sensorId: string): string {
    return sensorId + ":" + "Params";
}
function getPlotStyleKey(sensorId: string, valueType: ChannelDataType): string {
    return sensorId + ":" + valueType + ":" + "plotStyle";
}
function getSavingStyleKey(sensorId: string, valueType: ChannelDataType): string {
    return sensorId + ":" + valueType + ":" + "savingStyle";
}
function getCellStyleKey(sensorId: string, valueType: ChannelDataType): string {
    return sensorId + ":" + valueType + ":" + "cellStyle";
}
