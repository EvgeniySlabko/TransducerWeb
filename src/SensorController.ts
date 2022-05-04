
import { EventDispatcher } from "@foxandfly/ts-event-dispatcher";
import { ISingleComponentSensor } from "./Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "./Sensor/SingleComponentSensor.ts/sensor";

export type SensorControllerArgs =
{
    sender: SensorController,
    sensor: ISingleComponentSensor
}

export class SensorController
{
    //private _onAddSensor = new EventDispatcher<SensorController, Sensor>();
    //private _onRemoveSensor = new EventDispatcher<SensorController, Sensor>();
    
    private sensors: ISingleComponentSensor[] = new Array();

    public _dispatcher = new EventDispatcher<SensorControllerArgs>();

    constructor()
    {

    }

    public async AddSensor(sensor: ISingleComponentSensor)
    {
        var index = this.sensors.indexOf(sensor);
        if (index !== -1) {
            throw "Such sensor is already exists";
        }

        this.sensors.push(sensor);

        await this._dispatcher.dispatch('Add', {
            sender: this,
            sensor: sensor,
        });
    }   
    
    public async RemoveSensor(sensor: ISingleComponentSensor)
    {
        var index = this.sensors.indexOf(sensor);
        if (index !== -1) {
            this.sensors.splice(index, 1);
            await this._dispatcher.dispatch('Remove', {
                sender: this,
                sensor: sensor,
            });
        }

        throw "there is no such sensor";
    }   

    public get onDispatch() {return this._dispatcher;}
}