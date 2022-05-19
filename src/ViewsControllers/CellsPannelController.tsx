import { CellChannel } from "../Channel/Channel/CellChannel";
import { ChannelDataArgs } from "../Channel/Channel/Channel";
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { dataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export class DataCellsController
{
    private container: HTMLDivElement;
    private p: HTMLParagraphElement | undefined;

    constructor(container: HTMLDivElement)
    {
        this.container = container;
    }

    public PushChannels(channels: CellChannel[])
    {
        channels.forEach(ch => {
            this.pushChannel(ch);
        });
    }

    public Clear = () =>
    {
        let vals = this.container.getElementsByClassName("cell-measure");
    }

    private pushChannel(channel: CellChannel) 
    {
        //this.container.innerHTML += new HTMLElement();

        var box = document.createElement("div");
        var cellInfo = document.createElement("div");
        var cellName = document.createElement("div");
        var cellUnits = document.createElement("div");
        var cellMeasure = document.createElement("div");
        var p = document.createElement("p");

        box.classList.add("measure-box");
        box.classList.add(channel.Style.cellStyle);
        cellInfo.classList.add("cell-info");
        cellName.classList.add("cell-name");
        cellUnits.classList.add("cell-units");
        cellMeasure.classList.add("cell-measure-content");  
        p.id = "value";
        p.classList.add("cell-measure");
        p.classList.add(channel.Style.fontStyle);

        box.append(cellInfo);
        box.append(cellMeasure);
        cellMeasure.append(p);
        cellInfo.append(cellName);
        cellInfo.append(cellUnits);
        
        document.getElementById("cell-container")?.append(box);

        cellName.innerText = channel.Style.valueName;
        cellUnits.innerText = channel.Style.unitsName;
        p.innerText = "";

        let dataHandler = (channel: CellChannel, args: ChannelDataArgs) => 
        {
            p.innerText = args.data.data[0].toFixed(1);
        }

        channel.onData.sub(dataHandler);

        channel.onClose.sub((c, args) =>
        {
            this.container.removeChild(box);
        })
    }
}
