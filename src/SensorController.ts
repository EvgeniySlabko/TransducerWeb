import { EventDispatcher } from "@foxandfly/ts-event-dispatcher";
import { GetFullSensorInfo } from "./Sensor/SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "./Sensor/SensorWorker";
import { ISingleComponentSensor } from "./Sensor/SingleComponentSensor.ts/ISensor";
import SensorComponentSensor from "./Sensor/SingleComponentSensor.ts/sensor";
import { FullSensorInfo } from "./Sensor/SingleComponentSensor.ts/SensorDefinitions";

export type SensorControllerArgs =
{
    sender: SensorController,
    sensor: ISingleComponentSensor,
    fullSensorInfo: FullSensorInfo
}

type SensorNode =
{
    sensor: ISingleComponentSensor
    worker: SensorWorker
    fullSensorInfo: FullSensorInfo
}

export class SensorController
{
    //private _onAddSensor = new EventDispatcher<SensorController, Sensor>();
    //private _onRemoveSensor = new EventDispatcher<SensorController, Sensor>();
    
    
    private sensors: SensorNode[] = new Array();

    public _dispatcher = new EventDispatcher<SensorControllerArgs>();

    constructor()
    {

    }

    private GetIndex(sensor: ISingleComponentSensor)
    {
        let index = -1;
        for (let i = 0; i < this.sensors.length; i++) {
            if (this.sensors[i].sensor === sensor)
                index = i;
        }

        return index;
    }


    public async AddSensor(sensor: ISingleComponentSensor)
    {
        let index = this.GetIndex(sensor);
        if (index !== -1) {
            throw "Such sensor is already exists";
        }
        
        let sensorWOrker = new SensorWorker(sensor); 
        
        await sensorWOrker.Initialize();
        await sensorWOrker.SetT0();
        
        let fullSensorInfo = await GetFullSensorInfo(sensor);

        var node: SensorNode = {
          sensor: sensor,
          worker: sensorWOrker,
          fullSensorInfo: fullSensorInfo
        };

        this.sensors.push(node);

        await this._dispatcher.dispatch('Add', {
            sender: this,
            sensor: sensor,
            fullSensorInfo: fullSensorInfo,
        });
    }   
    
    public async RemoveSensor(sensor: ISingleComponentSensor)
    {
        var index = this.GetIndex(sensor);
        if (index !== -1) {
            this.sensors.splice(index, 1);
            await this._dispatcher.dispatch('Remove', {
                sender: this,
                sensor: sensor,
            });
            
            
            await sensor.CloseConnection();
        }
        else
        {
            throw "there is no such sensor";
        }
    }   

    public async SetT0()
    {
        if (this.sensors.length == 0) return false;

        this.sensors.forEach(async node => {
            if (node.worker.IsStreaming)
            {
                await node.worker.StopStreaming();
                await node.worker.StopReading();
                await node.worker.SetT0();
                await node.worker.StartReading();
                await node.worker.StartStreaming();
            }

            if (node.worker.IsReading)
            {
                await node.worker.StopReading();
                await node.worker.SetT0();
                await node.worker.StartReading();
            }
            //await node.worker.StartReading();
        });
    }

    public async StartAll() : Promise<boolean>
    {
        if (this.sensors.length == 0) return false;

        this.sensors.forEach(async node => {
            if (!node.worker.IsReading)
                await node.worker.StartReading();
                
            await node.worker.StartStreaming();
        });

        return true;
    }

    public async StopAll()
    {
        this.sensors.forEach(async node => {
            await node.worker.StopStreaming();
            //await node.worker.StopReading();
        });
    }

    public get onDispatch() {return this._dispatcher;}
}