import { EventDispatcher } from "strongly-typed-events";
import { DecoderParameters } from "./DecoderParameters/DecoderParametersFactory";
import { HoldingRegisters } from "./SensorDefinitions";
import { ISingleComponentSensor } from "./SingleComponentSensor.ts/ISingleComponentSensor";

// отвечает за логику работы с датчиком
export class SensorWorker {
    private sensor: ISingleComponentSensor;
    private isInit: boolean = false;
    private isReading: boolean = false;
    private isStreaming: boolean = false;
    private name: string;
    private decoderParams: DecoderParameters;
    private _onClose = new EventDispatcher<SensorWorker, string>();

    public get Source(): ISingleComponentSensor{
        return this.sensor;
    };

    public get DecoderParams(): DecoderParameters{
        return this.decoderParams;
    }

    constructor(sensor: ISingleComponentSensor, decoderParams: DecoderParameters, name: string) {
        this.sensor = sensor;
        this.name = name;
        this.decoderParams = decoderParams;
        sensor.onClose.sub((sender, args) => 
        {
            console.info(this.name, "Closing event ocured.");
            this._onClose.dispatch(this, args)
        });
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
        console.info(this.name, "Start initializing");
        try
        {
            await this.sensor.Initialize();
            await this.sensor.StopStreaming();
            await this.sensor.SetComputerConnection();
            await this.sensor.SetT0();
            await this.sensor.SetAvgRatio(1);
            await this.sensor.SetUsingFloatState(true);
        }
        catch
        {
            await this.sensor.CloseConnection();
            return;
        }
        //await this.startReading();

        console.info(this.name, "Initialization finished.");
        this.isStreaming = false;
        this.isInit = true;
    }

    public async SetT0() {
        if (!this.isInit) throw "Sersor is not initialized";
        console.info(this.name, "Set zero.");
        await this.sensor.SetT0();
    }

    public async GetSkInfo()
    {
        console.info(this.name, "Getting sk info.");
        return await this.sensor.GetSkInfo();
    }

    public async GetHoldingRegisters() : Promise<HoldingRegisters>
    {
        console.info(this.name, "Getting holder registers.");
        return await this.sensor.GetHoldingRegisters();
    }

    public async StartStreaming() {
        if (!this.isInit) throw "Sersor is not initialized";

        if (!this.isStreaming) {
            console.info(this.name, "Starting streaming.");
            await this.sensor.StartStreaming();
            this.isStreaming = true;
        }
    }

    public async StopStreaming() {
        if (!this.isInit) throw "Sersor is not initialized";
        if (this.isStreaming) {
            console.info(this.name, "Stopping streaming.");
            await this.sensor.StopStreaming();
            this.isStreaming = false;
        }
    }

    public async SetExternalSpeedSensorState(state: boolean) {
        console.info(this.name, "Setting external speed sensor.");
        await this.sensor.SetExternalSensorState(state);
    }

    public async SetSpeedPeriod(period: number) {
        console.info(this.name, "Setting speed period.");
        await this.sensor.SetSpeedPeriod(period);
    }

    public async SetAverageRatio(avg: number) {
        console.info(this.name, "Setting avg ratio.");
        await this.sensor.SetAvgRatio(avg);
    }

    public async Close() {
        console.info(this.name, "Closing");
        try
        {
            await this.sensor.StopStreaming();
        }
        catch
        {
            console.warn(this.name, "Emergency closure Connection.");
        }
        finally
        {
            await this.sensor.CloseConnection();
            console.info(this.name, "Connection closed.");
            this.isStreaming = false;
            this.isReading = false;
        }
    }

    public get onClose() { return this._onClose.asEvent(); }

    //startReading = async () => {
        // await this.sensor.StartMeasuring(false);
        // await this.sensor.StartMeasuring(true);
    //}
}