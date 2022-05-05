import { EasingFunction } from 'chart.js';
import React from 'react'
import { CellChannel } from "./Channel/Channel/CellChannel";

export class CellContainerController
{
    private container: HTMLElement;
    private p: HTMLParagraphElement | undefined;

    
    constructor(container: HTMLElement)
    {
        this.container = container;
    }

    public pushChannel(channel: CellChannel) 
    {
        //this.container.innerHTML += new HTMLElement();

        var box = document.createElement("div");
        var cellInfo = document.createElement("div");
        var cellName = document.createElement("div");
        var cellUnits = document.createElement("div");
        var cellMeasure = document.createElement("div");
        var p = document.createElement("p");

        box.classList.add("measure-box");
        cellInfo.classList.add("cell-info");
        cellName.classList.add("cell-name");
        cellUnits.classList.add("cell-units");
        cellMeasure.classList.add("cell-measure-content");  
        p.classList.add("cell-measure");

        box.append(cellInfo);
        box.append(cellMeasure);
        cellMeasure.append(p);
        cellInfo.append(cellName);
        cellInfo.append(cellUnits);
        document.getElementById("cell-container")?.append(box);

        cellName.innerText = channel.Style.valueName;
        cellUnits.innerText = channel.Style.unitsName;
        p.innerText = "";
        channel.onData.sub((c, args) =>
        {
            p.innerText = args.data[0].toFixed(1);
        })
    }
}
