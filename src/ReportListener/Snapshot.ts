
import FileSaver from "file-saver";
import { serialize } from "serialize-ts";
import { ChannelStyle } from "../Channel/ChannelStyle/ChannelStyle";
import { dataEventArgs } from "../Sensor/SensorDefinitions";


export type TrackData =
{
    style: ChannelStyle;
    data: Array<dataEventArgs>;
}

export class Snapshot
{
    private data;
    constructor(data: Array<TrackData>)
    {
        this.data = data;
    }

    public ToFile()
    {
        var blob = new Blob(["Welcome to Websparrow.org."], { type: "text/plain;charset=utf-8" });
        
        var parts = new Array<string>();

        for (let i = 0; i < this.data.length; i++){
            
            var styleSerialized = JSON.stringify(this.data[i].style);
            var dataSerialized= JSON.stringify(this.data[i].data);

            parts.push(styleSerialized);
            parts.push(dataSerialized);
        }

        //var serialized = serialize(this.data[0].style);
        var blob = new Blob(parts, 
            {
                type: "text/plain;charset=utf-8",
                endings: "native",
            });
        FileSaver.saveAs(blob, "hello world.txt");
    }
}