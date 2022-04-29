import Sensor from "./sensor";

// отвечает за логику работы с датчиком
export class SensorWorker
{
    private sensor: Sensor;
    private isInit: boolean = false;
    private isReading: boolean = false;
    private isStreaming: boolean = false;

    constructor(sensor: Sensor)
    {
        this.sensor = sensor;
    }

    public async Initialize()
    {
        await this.sensor.Initialize();
        await this.sensor.StopStreaming();
        await this.sensor.StopMeasuring();
        await this.sensor.SetComputerConnection();

        /// configure

        this.isReading = false;
        this.isStreaming = false;
        this.isInit = true;
    }

    public async StartReading()
    {
        if (!this.isInit) throw "Sersor is not initialized";
        if (!this.isReading)
        {
            await this.sensor.StartMeasuring(false); //bug.
            await this.sensor.StartMeasuring();
            this.isReading = true;
        }
    }

    public async StopReading()
    {
        if (!this.isInit) throw "Sersor is not initialized";
        if (this.isReading)
        {
            await this.sensor.StopMeasuring(false); //bug.
            await this.sensor.StopMeasuring();
            this.isReading = false;
        }
    }

    public async  SetT0()
    {
        if (!this.isInit) throw "Sersor is not initialized";
        if (this.isReading) throw "Sersor is reading mode. Stop readind for initializing";

        await this.sensor.SetT0();
    }

    public async StartStreaming()
    {
        if (!this.isInit) throw "Sersor is not initialized";
        if (!this.isReading) throw "Sersor is not in reading mode";

        if (!this.isStreaming)
        {
            await this.sensor.StartStreaming();
            this.isStreaming = true;
        }
    }

    public async StopStreaming()
    {
        if (!this.isInit) throw "Sersor is not initialized";
        if (this.isStreaming)
        {
            await this.sensor.StopStreaming();
            this.isStreaming = false;
        }
    }

    public async Close()
    {
        if (!this.isInit) throw "Sersor is not initialized";

        await this.sensor.StopStreaming();
        await this.sensor.StopMeasuring();
        await this.sensor.CloseConnection();
        this.isStreaming = false;
        this.isReading = false;
    }
}