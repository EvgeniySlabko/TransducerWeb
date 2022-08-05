import { PlotChannel } from "../Channel/Channel/PlotChannel";
import { GetMinAvgFactor } from "../Common/SensorsHelpers";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { ReportListener } from "./ReportListener";
import { Snapshot } from "./Snapshot";

export declare class RecordigGroup
{
    savingChannels: PlotChannel[];
    sensor: ISingleComponentSensor;
}

export class RecordManager {
    private listener: ReportListener;
    private recordingGroups: RecordigGroup[] = [];
    private currentMinAvg: number = 1;

    public get thereIsData(){
        return this.listener.ThereIsData;
    }

    constructor() {
        this.listener = new ReportListener();
    }

    public SetChannels(groups: RecordigGroup[]) {
        this.listener.Reset();
        this.recordingGroups = groups;
        this.recordingGroups.forEach(g => g.sensor.onClose.sub((sensor =>{
            let index = this.recordingGroups.findIndex(rg => rg.sensor === sensor);
            this.recordingGroups.splice(index);
        })));

        let allPlotChannels: PlotChannel[] = [];
        allPlotChannels = allPlotChannels.concat(...groups.map(g => g.savingChannels));
        this.listener.SetChannels(allPlotChannels);
    }   

    public async StartListening() {
        this.currentMinAvg =  await GetMinAvgFactor(this.recordingGroups.map(g => g.sensor));
        this.listener.StartListening();
    }

    public StopListening(): Snapshot {
        this.listener.StopListening();
        let snapshot = this.listener.GetSnapshot();
        snapshot.AvgRatio = this.currentMinAvg;
        return snapshot;
    }

    public GetSnapshot(): Snapshot {
        return this.listener.GetSnapshot();
    }
}