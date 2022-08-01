import { AllChannelsInfo, ChannelsGroup } from "../Channel/AllChannelsFactory";
import { CellChannelStyle } from "../Channel/ChannelStyle/CellChannelStyle";
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import { ValueType } from "../Channel/ChannelStyle/ChanneStyleCommon";
import { Group } from "../Components/App";


export declare class SensorStorageParameters
{
    externalSpeedSensor: boolean;
    offset: number;
}

let defaultSensorParams: SensorStorageParameters = {
    externalSpeedSensor: false,
    offset: 0
}

export function SaveChannelGroupParameters(groups: ChannelsGroup[], sensorId: string) 
{
    // TO DO validation
    groups.forEach(g => {
        let plotStyle = g.plotChannel.Style;
        let cellStyle = g.cellChannel.Style;
        let savingStyle = g.savingChannel.Style;

        let plotStyleJson = JSON.stringify(plotStyle);
        let cellStyleJson = JSON.stringify(cellStyle);
        let savingStyleJson = JSON.stringify(savingStyle);
        
        let plotKey = getPlotStyleKey(sensorId, g.plotChannel.Style.valueType);
        let cellKey = getCellStyleKey(sensorId, g.plotChannel.Style.valueType);
        let savingKey = getSavingStyleKey(sensorId, g.plotChannel.Style.valueType);

        localStorage.setItem(plotKey, plotStyleJson);
        localStorage.setItem(cellKey, cellStyleJson);
        localStorage.setItem(savingKey, savingStyleJson);
    });
}

export function ApplayLocalStorageSettingsForGroups(groups: ChannelsGroup[], sensorId: string) 
{
    groups.forEach(g => {
        let plotKey = getPlotStyleKey(sensorId, g.plotChannel.Style.valueType);
        let cellKey = getCellStyleKey(sensorId, g.plotChannel.Style.valueType);
        let savingKey = getSavingStyleKey(sensorId, g.plotChannel.Style.valueType);
        
        let plotStyleJson = localStorage.getItem(plotKey);
        let cellStyleJson = localStorage.getItem(cellKey);
        let savingStyleJson = localStorage.getItem(savingKey);
        if (plotStyleJson === null || cellStyleJson === null || savingStyleJson === null) return
        try
        {
            let plotStyle = JSON.parse(plotStyleJson) as PlotChannelStyle;
            let savingStyle = JSON.parse(savingStyleJson) as PlotChannelStyle;
            let cellStyle = JSON.parse(cellStyleJson) as CellChannelStyle;

            g.cellChannel.Style.fontSize = cellStyle.fontSize;
            g.cellChannel.Style.limits = cellStyle.limits;
            g.cellChannel.Style.color = cellStyle.color;
            g.cellChannel.Style.visible = cellStyle.visible;
            g.cellChannel.Style.accurency = cellStyle.accurency;
            
            
            g.plotChannel.Style.color = plotStyle.color;
            g.plotChannel.Style.drawLimits = plotStyle.drawLimits;
            g.plotChannel.Style.grid = plotStyle.grid;
            g.plotChannel.Style.legendValueAcurency = plotStyle.legendValueAcurency;
            g.plotChannel.Style.visible = plotStyle.visible;
            g.plotChannel.Style.width = plotStyle.width;

            g.savingChannel.Style.color = savingStyle.color;
            g.savingChannel.Style.drawLimits = savingStyle.drawLimits;
            g.savingChannel.Style.grid = savingStyle.grid;
            g.savingChannel.Style.legendValueAcurency = savingStyle.legendValueAcurency;
            g.savingChannel.Style.visible = savingStyle.visible;
            g.savingChannel.Style.width = savingStyle.width;
        }
        catch{ return; }
    });
}

export function SaveSensorParameters(parameters: SensorStorageParameters, sensorId: string)
{
    let parametersJson = JSON.stringify(parameters);
    let key = getSensorParametersKey(sensorId);
    localStorage.setItem(key, parametersJson);
}

export async function SetExternalSpeedSensorState(state: boolean, sensorId: string)
{
    let params = await GetSensorParameters(sensorId);
    params.externalSpeedSensor = state;
    SaveSensorParameters(params, sensorId);
}

export async function SetOffset(offset: number, sensorId: string)
{
    let params = await GetSensorParameters(sensorId);
    if (params === null)
    {
        params = defaultSensorParams;
    }
   
    params.offset = offset;
    SaveSensorParameters(params, sensorId);
}

export async function ApplySensorParameters(group: Group, sensorId: string)
{
    let parameters = await GetSensorParameters(sensorId);
    
    await group.node.worker.SetExternalSpeedSensorState(parameters.externalSpeedSensor);

    await group.node.sensor.SetExternalSensorState(parameters.externalSpeedSensor);

    group.channelsInfo.setOffset(parameters.offset)

}

export async function GetSensorParameters(sensorId: string) : Promise<SensorStorageParameters> 
{
    let key = getSensorParametersKey(sensorId);
    let parametersJson = localStorage.getItem(key);
    if (parametersJson === null) return defaultSensorParams;

    let parameters = JSON.parse(parametersJson) as SensorStorageParameters;
    return parameters;
}

function getSensorParametersKey(sensorId: string) : string { return  sensorId + ":" + "Params" };
function getPlotStyleKey(sensorId: string, valueType: ValueType) : string { return  sensorId + ":" + valueType + ":" + "plotStyle" };
function getSavingStyleKey(sensorId: string, valueType: ValueType) : string { return sensorId + ":" + valueType + ":" + "savingStyle" };
function getCellStyleKey(sensorId: string, valueType: ValueType) : string { return sensorId + ":" + valueType + ":" + "cellStyle" };