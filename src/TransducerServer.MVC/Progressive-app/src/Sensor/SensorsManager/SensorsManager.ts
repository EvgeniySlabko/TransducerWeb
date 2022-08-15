import { EventDispatcher } from "@foxandfly/ts-event-dispatcher";
import { FullSensorInfo } from "../SensorDefinitions";
import { GetFullSensorInfo } from "../SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "../SensorWorker";

export type SensorControllerArgs =
    {
        sender: SensorController,
        fullSensorInfo: FullSensorInfo
        worker: SensorWorker,
    }
    
export enum SensorControllerEventType{
        SensorAdded,
        SensorRemoved,
    }

type SensorNode =
    {
        sensorWorker: SensorWorker
        fullSensorInfo: FullSensorInfo
    }

export class SensorController {
    private sensors: SensorNode[] = new Array();
    private _dispatcher = new EventDispatcher<SensorControllerArgs>();

    private GetIndex(sensor: SensorWorker) {
        let index = -1;
        for (let i = 0; i < this.sensors.length; i++) {
            if (this.sensors[i].sensorWorker === sensor)
                index = i;
        }
        
        return index;
    }

    public async AddSensor(sensorWorker: SensorWorker) {
        let index = this.GetIndex(sensorWorker);
        if (index !== -1) {
            throw "Such sensor is already exists";
        }

        await sensorWorker.Initialize();
        await sensorWorker.SetT0();

        let fullSensorInfo = await GetFullSensorInfo(sensorWorker);

        var node: SensorNode = {
            sensorWorker: sensorWorker,
            fullSensorInfo: fullSensorInfo,
        };

        this.sensors.push(node);

        await this._dispatcher.dispatch('Add', {
            sender: this,
            fullSensorInfo: fullSensorInfo,
            worker: sensorWorker,
        });
    }

    public async RemoveSensor(sensorWorker: SensorWorker) {
        var index = this.GetIndex(sensorWorker);
        try {
            console.debug("Removing sensor.");
            let node = this.sensors[index];
            await node.sensorWorker.Close();
        }
        catch (ex) {
            console.warn("Error while removing sensor.", ex);
        }
        finally {
            await this._dispatcher.dispatch('Remove', {
                sender: this,
                worker: sensorWorker,
            });
            
            this.sensors.splice(index, 1);
        }
    }

    public async SetT0() {
        if (this.sensors.length == 0) return false;
        this.sensors.forEach(async node => {
            await node.sensorWorker.SetT0();
        });
    }

    public async StartAll(): Promise<boolean> {
        if (this.sensors.length == 0) return false;

        this.sensors.forEach(async node => {
            await node.sensorWorker.StartStreaming();
        });

        return true;
    }

    public async StopAll() {
        this.sensors.forEach(async node => {
            await node.sensorWorker.StopStreaming();
            //await node.worker.StopReading();
        });
    }

    public GetAllSensors() : SensorNode[] {
        return this.sensors.slice();
    }

    public get onDispatch() { return this._dispatcher; }
}