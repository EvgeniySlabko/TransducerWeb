
import FileSaver from "file-saver";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { AlignedData } from "../Common/DataAligner";
import { dataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";


export type TrackData =
{
    style: ChannelStyle;
    data: dataEventArgs;
}

export class Snapshot
{
    private data: Array<TrackData>;
    constructor(data?: Array<TrackData>)
    {
        if (data)
            this.data = data;
        else
            this.data = new Array(0);
    }
    
    public async FromFile(file: File)
    {
        var strData = await file.text();
        this.data = JSON.parse(strData);
    }

    public GetTrackData = () => this.data;
    public ToFile(fileName: string)
    {   
        var parts = new Array<string>();
        parts.push(JSON.stringify(this.data));
        var blob = new Blob(parts, 
            {
                type: "text/plain;charset=utf-8",
                endings: "native",
            });

        FileSaver.saveAs(blob, fileName);
    }

    public ToCSV(fileName: string, dt: number)
    {
        let alignedData = AlignedData(this.data.map(d => d.data), {dt: dt});

        let csvContent = "data:text/csv;charset=utf-8,";

        let csvRows = new Array<string>();
        
        let addRow = (title: string, data: (number | null | undefined)[], ration: number) =>
        {
            let rowArray = new Array<string>();
            rowArray.push(title);

            for (let i = 0; i < data.length; i++) {
                let strVal = data[i] === null || data[i] === undefined  ?
                            "" : (<number>(data[i]) * ration).toString();

                rowArray.push(strVal);
            }
    
            let row = rowArray.join(";") + "\r\n";
            csvRows.push(row);
        }

        addRow("Time", alignedData[0], 1);
        for (let i = 1; i < alignedData.length; i++) 
            addRow(this.data[i - 1].style.legendTitle, alignedData[i], this.data[i - 1].style.mnogitel);

        csvContent += csvRows.join();
        FileSaver.saveAs(csvContent, fileName);
    }
}