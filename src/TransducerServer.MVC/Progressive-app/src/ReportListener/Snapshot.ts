
import { PlotChannelStyle } from "../Channel/ChannelStyle/PlotChannelStyle";
import { AlignedData } from "../Common/AlignedDataHelpers";
import { SensorData } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { SeriesValue } from "../uPlot/PlotCommon";

export declare class TrackData
{
    style: PlotChannelStyle;
    data: SensorData;
}

export declare class SnapshotData
{
    trackData: TrackData[];
}

export declare class Report
{
    data: SnapshotData;
    avgRatio: number;
}

export class Snapshot {
    private data: Array<TrackData>;
    private avgRatio: number = 1;

    public get AvgRatio(){
        return this.avgRatio;
    }

    public set AvgRatio(value: number){
        this.avgRatio = value;
    }

    public get dt() : number
    {
        return 1 / (5000 / this.avgRatio);
    } 

    public GetTrackData = () => this.data;

    constructor(snapshotData?: SnapshotData) {
        if (snapshotData)
        {
            this.data = snapshotData.trackData;
        }
        else
            this.data = new Array(0);
    }

    public FromShanpshotData(snapshotData: SnapshotData)
    {
        this.data = snapshotData.trackData;
    }

    public async FromFile(file: File) {
        let text = await file.text();
        let report: Report = JSON.parse(text);
        this.data = report.data.trackData;
        this.avgRatio = report.avgRatio;
    }

    public async ToFile(stream: FileSystemFileHandle) {
        var parts = new Array<string>();
        let report : Report = {
            data: {
                trackData: this.data,
            },
            avgRatio: this.avgRatio,
        }

        parts.push(JSON.stringify(report));
        var blob = new Blob(parts,
            {
                type: "text/plain;charset=utf-8",
                endings: "native",
            });
        
        let writable = await stream.createWritable();
        await writable.write(blob);
        await writable.close();
        //FileSaver.saveAs(blob, fileName);
    }

    public async ToCSV(stream: FileSystemFileHandle) {
        
        let alignedData = AlignedData(this.data.map(d => d.data), { dt: this.dt });

        let csvContent = ""//data:text/csv;charset=utf-8,";

        let csvRows = new Array<string>();

        let addRow = (title: string, data: (SeriesValue)[]) => {
            let rowArray = new Array<string>();
            rowArray.push(title);

            for (let i = 0; i < data.length; i++) {
                let strVal = data[i] === null || data[i] === undefined ?
                    "" : (<number>(data[i])).toString();

                rowArray.push(strVal);
            }

            let row = rowArray.join(";") + "\r\n";
            csvRows.push(row);
        }

        addRow("Time", alignedData[0]);
        for (let i = 1; i < alignedData.length; i++)
            addRow(this.data[i - 1].style.legendTitle, alignedData[i]);

        csvContent += csvRows.join();

        let writable = await stream.createWritable();
        await writable.write(csvContent);
        await writable.close();
    }
}