
import { type } from "jquery";
import { EventDispatcher } from "strongly-typed-events";
import { FullSensorInfo } from "../../dist/bundle";
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
import {SensorController, SensorControllerArgs} from "../SensorController"

export type SensorPannelInfo = 
{
    sensor: ISingleComponentSensor,
    info: FullSensorInfo,
}


export type SensorPannelEventArgs = 
{
    sensor: ISingleComponentSensor,
}


export class SensorPanelControllers
{
    private container: HTMLElement;
    private _onRemoveSensor = new EventDispatcher<SensorPanelControllers, SensorPannelEventArgs>();

    constructor(container: HTMLElement)
    {
        this.container = container;

        //sensorController.onDispatch.addListener("Remove", this.RemoveHandler);
    }

    public AddSensorHandler = (args: SensorPannelInfo) =>
    {
        let cell = document.createElement("div");
        let name = document.createElement("div");
        let controlPanel = document.createElement("div");

        let playButton = document.createElement("button");
        let disconnectButton = document.createElement("button");

        let playSpan = document.createElement("span");
        let disconnectSpan = document.createElement("span");

        this.container.append(cell);
        cell.append(name);
        cell.append(controlPanel);
        //controlPanel.append(playButton);
        controlPanel.append(disconnectButton);
        playButton.append(playSpan);
        disconnectButton.append(disconnectSpan);

        cell.classList.add("sensor-cell");
        name.classList.add("sensor-name");
        controlPanel.classList.add("sensor-control-panel");

        let addButtonStyles = (button: HTMLButtonElement) =>
        {
            button.classList.add("btn");
            button.classList.add("btn-outline-primary");
            button.classList.add("sensor-pannel-button");
        }

        let removeButton = () =>{
            playButton.onclick = null;
            disconnectButton.onclick = null;
            this.container.removeChild(cell);
        }

        addButtonStyles(playButton);
        addButtonStyles(disconnectButton);

        playSpan.classList.add("glyphicon");
        playSpan.classList.add("glyphicon-play");
        disconnectButton.classList.add("glyphicon");
        disconnectButton.classList.add("glyphicon-remove");

        name.innerText = args.info.SensorType;

        playButton.onclick = () => {
            
        }

        let closeHandler = (sensor: ISingleComponentSensor, msg: string) =>{
            removeButton();
        }

        args.sensor.onClose.sub(closeHandler);

        disconnectButton.onclick = async () => {
            args.sensor.onClose.unsub(closeHandler);
            removeButton();
            this._onRemoveSensor.dispatch(this,  {
                sensor: args.sensor,
            });
        }
    }

    
    public get onSensorClose() {return this._onRemoveSensor.asEvent();}
}