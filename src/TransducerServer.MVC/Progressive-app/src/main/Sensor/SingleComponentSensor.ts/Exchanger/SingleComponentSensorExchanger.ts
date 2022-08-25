import { ISensorConnector } from "../../../IO/Connector/ISensorConnector";
import { ISensorCommandFacory } from "../../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../../SensorCommandWriter/SensorCommandWriter";
import { ISensorDataCommandEncoder } from "../../SensorDataEncoder/ISensorDataEncoder";
import { SensorMessage } from "../../SensorDefinitions";
import { SingleComponentSensorBase } from "../SingleComponentSensorBase";

export class SingleComponentSensorExchanger extends SingleComponentSensorBase {
    private stopStreamingRequired: boolean = false;

    protected timeBase?: number;
    private intervalReadingMain = 100;
    private intervalReadingSpeed = 100;
    private intervalReadingTemperature = 3000;

    private lastMainMeasuringTime = -1;
    private lastSpeedMeasuringTime = -1;
    private lastTemperatureMeasuringTime = -1;
    private timeAwaitig = 100;
    private interval?: NodeJS.Timer;

    constructor(sensorIOWorker: ISensorConnector, commandFactory: ISensorCommandFacory, sensorDataCommandReceiver: ISensorDataCommandEncoder, sensorCommandWriter: ISensorCommandWriter, id: string) {
        super(sensorIOWorker, commandFactory, sensorDataCommandReceiver, sensorCommandWriter, id + " base");
    }

    public StartStreaming = async () => {
        this.intervalReadingMain = 1000 / (this.baseFrequency / this.avgRatio!);
        this.intervalReadingSpeed = this.speedPeriod! < 50 ? 50 : this.speedPeriod!;
        this.stopStreamingRequired = false;

        this.timeAwaitig = Math.min(this.intervalReadingMain, this.intervalReadingSpeed, this.intervalReadingTemperature);

        this.timeAwaitig = this.timeAwaitig < 50 ? 50 : this.timeAwaitig;
        console.debug("Starting exchanging: ", "main_interval: ", this.intervalReadingMain, "speed_interval: ", this.intervalReadingSpeed, "tmp_interval: ", this.intervalReadingTemperature);

        /*
    this.exchangeWorker.postMessage(
     {
      Message: ExchangerMessage.Start,
      args:{
        sensor: this,
        intervalReading: this.timeAwaitig,
        timeBase: this.timeBase,
      } as StartReadingParams
     }as ExchangerArgs
    );

    this.exchangeWorker.addEventListener('message', message => {
      console.log(message);
    });
    */

        this.interval = setInterval(() => {
            if (this.stopStreamingRequired && this.interval) {
                clearInterval(this.interval);
                return;
            }

            this.Reading();
        }, this.timeAwaitig);

        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming,
        });
    };

    public async StopStreaming(waitAnswer: boolean = true) {
        this.stopStreamingRequired = true;
        if (this.interval) clearInterval(this.interval);
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StopStreaming,
        });
    }

    public SetT0 = async () => {
        //let holdingRegisters = await this.GetHoldingRegisters();
        this.timeBase = Date.now();
        this.lastMainMeasuringTime = this.timeBase;
        this.lastSpeedMeasuringTime = this.timeBase;
        this.lastTemperatureMeasuringTime = this.timeBase;
        this._onMessage.dispatch(this, { msgType: SensorMessage.SetTime0 });
    };

    public async Reading() {
        if (this.stopStreamingRequired) return;

        let currentTime = Date.now();
        try {
            let inputValues = await this.ReadInputComplex();

            let calculatedTime = (currentTime - this.timeBase!) / 1000;

            let currentMainInterval = currentTime - this.lastMainMeasuringTime;
            if (currentMainInterval >= this.intervalReadingMain!) {
                this.lastMainMeasuringTime = currentTime;
                this._onTorqueData.dispatch(this, {
                    data: [inputValues.mainValue],
                    time: [calculatedTime],
                });
            }

            let currentSpeedInterval = currentTime - this.lastSpeedMeasuringTime;
            if (currentSpeedInterval >= this.intervalReadingSpeed!) {
                this.lastSpeedMeasuringTime = currentTime;
                this._onSpeedData.dispatch(this, {
                    data: [inputValues.speed],
                    time: [calculatedTime],
                });
            }

            let currentTemperatureInterval = currentTime - this.lastTemperatureMeasuringTime;
            if (currentTemperatureInterval >= this.intervalReadingTemperature!) {
                this.lastTemperatureMeasuringTime = currentTime;
                this._onTmpData.dispatch(this, {
                    data: [inputValues.temperature],
                    time: [calculatedTime],
                });
            }
        } catch {
            this.stopStreamingRequired = true;
            console.warn("Error while exchanging.");
        }
    }
}
