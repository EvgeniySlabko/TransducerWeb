import { sleep } from "../../Common/Common";
import { ISensorCommandFacory } from "../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../SensorCommandWriter/SensorCommandWriter";
import { ISensorDataCommandEncoder } from "../SensorDataEncoder/ISensorDataEncoder";
import { SensorMessage } from "../SensorDefinitions";
import { SingleComponentSensorBase } from "./SingleComponentSensorBase";

export class SingleComponentSensorExchanger extends SingleComponentSensorBase {
    private stopStreamingRequired: boolean = false;

    protected timeBase?: number;

    private lastTimeRead = 0;
    private intervalReadingMain = 100;
    private intervalReadingSpeed = 100;
    private intervalReadingTemperature = 3000;

    private lastMainMeasuringTime = -1;
    private lastSpeedMeasuringTime = -1;
    private lastTemperatureMeasuringTime = -1;
    private timeAwaitig = 100;
    constructor(commandFactory: ISensorCommandFacory,
                sensorDataCommandReceiver: ISensorDataCommandEncoder,
                sensorCommandWriter: ISensorCommandWriter) {
        super(commandFactory, sensorDataCommandReceiver, sensorCommandWriter);
    }

    public StartStreaming = async () => {
        this.intervalReadingMain =  1000 / (this.baseFrequency / this.avgRatio!);
        this.intervalReadingSpeed = (this.speedPeriod! < 20 ? 20 : this.speedPeriod!);
        this.stopStreamingRequired = false;
        
        this.timeAwaitig = Math.min(this.intervalReadingMain, this.intervalReadingSpeed, this.intervalReadingTemperature);
        
        console.info("Starting exchanging: ", "main_interval: ", this.intervalReadingMain, "speed_interval: ", this.intervalReadingSpeed, "tmp_interval: ", this.intervalReadingTemperature);
        this.Reading();
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StartStreaming
        });
    }

    public async StopStreaming(waitAnswer: boolean = true) {
        this.stopStreamingRequired = true;
        this._onMessage.dispatch(this, {
            msgType: SensorMessage.StopStreaming
        });
    }

    public SetT0 = async () => {
        //let holdingRegisters = await this.GetHoldingRegisters();
        this.timeBase = Date.now();
        this.lastMainMeasuringTime = this.timeBase;
        this.lastSpeedMeasuringTime = this.timeBase;
        this.lastTemperatureMeasuringTime = this.timeBase;
        this._onMessage.dispatch(this, { msgType: SensorMessage.SetTime0 });
    }
    
    public async Reading() {
        let next= async () => await this.Reading()
        if (this.stopStreamingRequired) return;
        
            let currentTime = Date.now();
            let inputValues = this.ReadInputComplex().then((inputValues) =>
            {
                let calculatedTime = (currentTime - this.timeBase!) / 1000;
    
                let currentMainInterval = currentTime - this.lastMainMeasuringTime;
                if (currentMainInterval >= this.intervalReadingMain!){
                    this.lastMainMeasuringTime = currentTime;
                    this._onTorqueData.dispatch(this, {
                        data: [inputValues.mainValue],
                        time: [calculatedTime],
                    });
                }
                
                let currentSpeedInterval = currentTime - this.lastSpeedMeasuringTime;
                if (currentSpeedInterval >= this.intervalReadingTemperature!){
                    this.lastSpeedMeasuringTime = currentTime;
                    this._onSpeedData.dispatch(this, {
                        data: [inputValues.speed],
                        time: [calculatedTime],
                    });
                }
    
                let currentTemperatureInterval = currentTime - this.lastTemperatureMeasuringTime;
                if (currentTemperatureInterval >= this.intervalReadingTemperature!){
                    this.lastTemperatureMeasuringTime = currentTime;
                    this._onTmpData.dispatch(this, {
                        data: [inputValues.temperature],
                        time: [calculatedTime],
                    })
                }

            }).catch(() => 
            {
                this.stopStreamingRequired = true;
                console.warn("Error while exchanging.");
                return false;
            });
            
            await sleep(this.timeAwaitig);
            next();

          //  let miTimeToNextMeasuring = Math.min(this.intervalReadingMain - currentMainInterval, 
              //                                 this.intervalReadingSpeed - currentSpeedInterval,
                //                               this.intervalReadingTemperature - currentTemperatureInterval);
            
            //if (miTimeToNextMeasuring > 0) await sleep(miTimeToNextMeasuring);
            //console.log(inputData.mainValue);
            //setTimeout(() => next(), 100);
           // await sleep(this.timeAvaitig);
        }
    
    // обработка ответов 

}