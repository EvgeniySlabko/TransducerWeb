
import FileSaver from "file-saver";
import { serialize } from "serialize-ts";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { dataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";


export type TrackData =
{
    style: ChannelStyle;
    data: Array<dataEventArgs>;
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
    public ToFile()
    {
        var blob = new Blob(["Welcome to Websparrow.org."], { type: "text/plain;charset=utf-8" });
        
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
        FileSaver.saveAs(blob, "Report");
    }
}