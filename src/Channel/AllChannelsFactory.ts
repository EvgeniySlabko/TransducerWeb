import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
import { FullSensorInfo } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { CellChannel } from "./Channel/CellChannel";
import { CreateAllSensorCellChannels } from "./Channel/CellChannelFactory";
import { Channel } from "./Channel/Channel";
import { CreateAllSensorChannelsForPlot, CreateAllSensorChannelsSaving } from "./Channel/ChannelFactory";

export interface AllChannelsInfo
{
    plotChannels: Channel[];
    savingChannels: Channel[];
    cellChannels: CellChannel[];

    avgSetter: (avgRatio: number) => void,
    offsetSetter: (offset: number) => void,
    currentValueOffsetSetter: () => void,
}

export function CreateAllChannels(sensor: ISingleComponentSensor, fullSensorInfo: FullSensorInfo) : AllChannelsInfo 
{
    let plotChannelsInfo = CreateAllSensorChannelsForPlot(sensor, fullSensorInfo);
    let savingChannelsInfo = CreateAllSensorChannelsSaving(sensor, fullSensorInfo);

    let cellChannelsInfo = CreateAllSensorCellChannels(sensor, fullSensorInfo);

    let offsetSetterAll = (offset: number) =>{
        plotChannelsInfo.offsetSetter(offset);
        savingChannelsInfo.offsetSetter(offset);
        cellChannelsInfo.offsetSetter(offset);
    }

    // для записи в отчета усреднение не ставится (всегда 1)
    let avgSetterAll = (offset: number) =>{
        plotChannelsInfo.offsetSetter(offset);
        cellChannelsInfo.offsetSetter(offset);
    }

    let currentValueOffsetSetAll = () =>{
        plotChannelsInfo.currentValueOffsetSetter();
        cellChannelsInfo.currentValueOffsetSetter();
        savingChannelsInfo.currentValueOffsetSetter();
    }

    return{
        avgSetter: avgSetterAll,
        offsetSetter: offsetSetterAll,
        currentValueOffsetSetter: currentValueOffsetSetAll,
        cellChannels: cellChannelsInfo.cellChannels,
        savingChannels: savingChannelsInfo.plotChannels,
        plotChannels: plotChannelsInfo.plotChannels,
    }
}