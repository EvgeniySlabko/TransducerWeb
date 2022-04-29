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

        var div = document.createElement("div");
        var p = document.createElement("p");
        
        
        div.classList.add("measure-box");
        p.classList.add("measure");
        div.append(p);
        this.container.append(div);
        p.innerText = "";
        channel.onData.sub((c, args) =>
        {
            p.innerText = args.data[0].toFixed(1);
            //p.classList.add("measure");
            //if (this.p)
            //this.p.textContent = args.data[0].toString();
        })
    }

    
}
