import { EventDispatcher } from "@foxandfly/ts-event-dispatcher";
import { sleep } from "../../Common/Common";
import { GetFullSensorInfo } from "../SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "../SensorWorker";
import { ISingleComponentSensor } from "../SingleComponentSensor.ts/ISingleComponentSensor";
import { FullSensorInfo } from "../SingleComponentSensor.ts/SensorDefinitions";

export type SensorControllerArgs =
    {
        sender: SensorController,
        sensor: ISingleComponentSensor,
        fullSensorInfo: FullSensorInfo
        worker: SensorWorker,
    }
    
export enum SensorControllerEventType{
        SensorAdded,
        SensorRemoved,
    }

type SensorNode =
    {
        sensor: ISingleComponentSensor
        worker: SensorWorker
        fullSensorInfo: FullSensorInfo
    }

export class SensorController {
    private sensors: SensorNode[] = new Array();
    private _dispatcher = new EventDispatcher<SensorControllerArgs>();

    private GetIndex(sensor: ISingleComponentSensor) {
        let index = -1;
        for (let i = 0; i < this.sensors.length; i++) {
            if (this.sensors[i].sensor === sensor)
                index = i;
        }

        return index;
    }

    public async AddSensor(sensor: ISingleComponentSensor) {
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
            fullSensorInfo: fullSensorInfo,
        };

        this.sensors.push(node);

        await this._dispatcher.dispatch('Add', {
            sender: this,
            sensor: sensor,
            fullSensorInfo: fullSensorInfo,
            worker: sensorWOrker,
        });
    }

    public async RemoveSensor(sensor: ISingleComponentSensor) {
        var index = this.GetIndex(sensor);
        try {
            let node = this.sensors[index];
            await node.worker.Close();
        }
        catch (ex) {
            console.log("Error while closing sensor")
            throw ex;
        }
        finally {
            if (index !== -1) {
                this.sensors.splice(index, 1);
                await this._dispatcher.dispatch('Remove', {
                    sender: this,
                    sensor: sensor,
                });

            }
            else {
                throw "there is no such sensor";
            }
        }
    }

    public async SetT0() {
        if (this.sensors.length == 0) return false;
        this.sensors.forEach(async node => {
            await node.worker.SetT0();
        });
    }

    public async StartAll(): Promise<boolean> {
        if (this.sensors.length == 0) return false;

        this.sensors.forEach(async node => {
            await node.worker.StartStreaming();
        });

        return true;
    }

    public async StopAll() {
        this.sensors.forEach(async node => {
            await node.worker.StopStreaming();
            //await node.worker.StopReading();
        });
    }

    public GetAllSensors() : SensorNode[] {
        return this.sensors.slice();
    }

    public get onDispatch() { return this._dispatcher; }
}