import { sleep } from "../Common/Common";
import { ISingleComponentSensor } from "./SingleComponentSensor.ts/ISingleComponentSensor";

// отвечает за логику работы с датчиком
export class SensorWorker {
    private sensor: ISingleComponentSensor;
    private isInit: boolean = false;
    private isReading: boolean = false;
    private isStreaming: boolean = false;

    constructor(sensor: ISingleComponentSensor, alreadyInit: boolean = false) {
        this.isInit = alreadyInit;
        this.sensor = sensor;
    }

    public get IsInit(): boolean {
        return this.isInit;
    }

    public get IsReading(): boolean {
        return this.isReading;
    }

    public get IsStreaming(): boolean {
        return this.isStreaming;
    }

    public async Initialize() {
        await this.sensor.Initialize();
        await this.sensor.StopStreaming();
        await this.sensor.SetComputerConnection();
        await this.sensor.SetT0();
        await this.sensor.SetAvgRatio(1);
        await this.sensor.SetUsingFloatState(true);
        await this.startReading();

        this.isStreaming = false;
        this.isInit = true;
    }

    public async SetT0() {
        if (!this.isInit) throw "Sersor is not initialized";

        await this.sensor.SetT0();
    }

    public async StartStreaming() {
        if (!this.isInit) throw "Sersor is not initialized";

        if (!this.isStreaming) {
            await this.sensor.StartStreaming();
            this.isStreaming = true;
        }
    }

    public async StopStreaming() {
        if (!this.isInit) throw "Sersor is not initialized";
        if (this.isStreaming) {
            await this.sensor.StopStreaming();
            this.isStreaming = false;
        }
    }

    public async SetExternalSpeedSensorState(state: boolean) {
        await this.sensor.SetExternalSensorState(state);
    }

    public async SetSpeedPeriod(period: number) {
        await this.sensor.SetSpeedPeriod(period);
    }

    public async SetAverageRatio(avg: number) {
        await this.sensor.SetAvgRatio(avg);
    }

    public async Close() {
        if (!this.isInit) throw "Sersor is not initialized";

        try
        {
            await this.sensor.StopStreaming();
        }
        finally
        {
            await this.sensor.CloseConnection();
            this.isStreaming = false;
            this.isReading = false;
        }
    }

    startReading = async () => {
        await this.sensor.StartMeasuring(false);
        await this.sensor.StartMeasuring(true);
    }
}