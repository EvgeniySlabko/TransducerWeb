import { CellChannel } from "../Channel/Channel/CellChannel";
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { dataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export class DataCellsController
{
    private container: HTMLElement;
    private p: HTMLParagraphElement | undefined;

    
    constructor(container: HTMLElement)
    {
        this.container = container;
    }

    public PushChannels(channels: CellChannel[])
    {
        channels.forEach(ch => {
            this.pushChannel(ch);
        });
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

        let dataHandler = (sensor: CellChannel, args: dataEventArgs) => 
        {
            p.innerText = args.data[0].toFixed(1);
        }

        channel.onData.sub(dataHandler);

        channel.onClose.sub((c, args) =>
        {
            this.container.removeChild(box);
        })
    }
}
