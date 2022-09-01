import { EventDispatcher } from "@foxandfly/ts-event-dispatcher";
import { FullSensorInfo } from "../SensorDefinitions";
import { GetFullSensorInfo } from "../SensorInfoParser/SensorInfoCreator";
import { SensorWorker } from "../SensorWorker";

export type SensorControllerArgs = {
    sender: SensorController;
    fullSensorInfo: FullSensorInfo;
    worker: SensorWorker;
};

export enum SensorControllerEventType {
    SensorAdded,
    SensorRemoved,
}

type SensorNode = {
    sensorWorker: SensorWorker;
    fullSensorInfo: FullSensorInfo;
};

export class SensorController {
    private sensors: SensorNode[] = new Array();
    private _dispatcher = new EventDispatcher<SensorControllerArgs>();

    private GetIndex(sensorWorker: SensorWorker) {
        let index = this.sensors.findIndex(currentWorker => currentWorker.sensorWorker === sensorWorker);
        return index;
    }

    public async AddSensor(sensorWorker: SensorWorker) {
        console.debug("Adding new sensor to manager.");
        let index = this.GetIndex(sensorWorker);
        if (index !== -1) {
            throw "Such sensor is already exists";
        }

        await sensorWorker.Initialize();
        await sensorWorker.SetT0();

        let fullSensorInfo = await GetFullSensorInfo(sensorWorker);

        let node: SensorNode = {
            sensorWorker: sensorWorker,
            fullSensorInfo: fullSensorInfo,
        };

        this.sensors.push(node);

        sensorWorker.onClose.sub(() => {
            let index = this.GetIndex(sensorWorker);
            console.debug("Sensor Removed from manager. SensorId: ", this.sensors[index].fullSensorInfo.SensorId);
            this.sensors.splice(index, 1);
        });

        await this._dispatcher.dispatch("Add", {
            sender: this,
            fullSensorInfo: fullSensorInfo,
            worker: sensorWorker,
        });
    }

    public async RemoveSensor(sensorWorker: SensorWorker) {
        let index = this.GetIndex(sensorWorker);
        console.debug("Removing sensor from manager. SensorId: ", this.sensors[index].fullSensorInfo.SensorId);
        try {
            console.debug("Removing sensor from manager.");
            let node = this.sensors[index];
            await node.sensorWorker.Close();
        } catch (ex) {
            console.warn("Error while removing sensor.", ex);
        } finally {
            //this.sensors.splice(index, 1);
        }
    }

    public async SetT0() {
        console.debug("Set T0 for all sensors");
        if (this.sensors.length === 0) return false;
        for (let i = 0; i < this.sensors.length; i++) {
            await this.sensors[i].sensorWorker.SetT0();
        }
    }

    public async StartAll(): Promise<boolean> {
        console.debug("Start all sensors");
        if (this.sensors.length === 0) return false;

        for (let i = 0; i < this.sensors.length; i++) {
            await this.sensors[i].sensorWorker.StartStreaming();
        }

        return true;
    }

    public async StopAll() {
        console.debug("Stop all sensors");
        for (let i = 0; i < this.sensors.length; i++) {
            await this.sensors[i].sensorWorker.StopStreaming();
        }
    }

    public GetAllSensors(): SensorNode[] {
        return this.sensors.slice();
    }

    public get onDispatch() {
        return this._dispatcher;
    }
}
