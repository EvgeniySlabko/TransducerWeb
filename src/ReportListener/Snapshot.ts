
import FileSaver from "file-saver";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
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

        /*
        for (let i = 0; i < this.data.length; i++){
            
            var styleSerialized = JSON.stringify(this.data[i].style);
            var dataSerialized= JSON.stringify(this.data[i].data);

            parts.push(styleSerialized);
            parts.push(dataSerialized);
        }
        */
        parts.push(JSON.stringify(this.data));
        var blob = new Blob(parts, 
            {
                type: "text/plain;charset=utf-8",
                endings: "native",
            });

        FileSaver.saveAs(blob, fileName);
    }

    public ToCSV(fileName: string)
    {

        let rows = new Array<Array<string>>(this.data.length);

        let csvContent = "data:text/csv;charset=utf-8,";
        let rowArray = new Array<string>();
        this.data.forEach(t => {
            rowArray.push(t.style.legendTitle);
                    for (let i = 0; i < t.data.data.length; i++) {
                        let strVal = t.data.data[i].toString() + ":" + t.data.time[i].toString();
                        rowArray.push(strVal);
                    }
                }
            )

        let row = rowArray.reverse().join(";");
        csvContent += row + "\r\n";
        
        FileSaver.saveAs(csvContent, fileName);
    }
}