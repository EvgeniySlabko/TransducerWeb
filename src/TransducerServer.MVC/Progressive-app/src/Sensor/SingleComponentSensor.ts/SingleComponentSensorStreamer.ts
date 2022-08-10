import { ISensorCommandFacory } from "../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../SensorCommandWriter/SensorCommandWriter";
import { CalculateTime, ISensorStreamerDataEncoder } from "../SensorDataEncoder/ISensorStreamerDataEncoder";
import { StramingPackageType } from '../SensorDefinitions';
import { SingleComponentSensorBase } from "./SingleComponentSensorBase";

export class SingleComponentSensor extends SingleComponentSensorBase {

    private seensorDataCommandReceiver: ISensorStreamerDataEncoder;

    private requiredStopStreaming: boolean = false;
    protected timeBase: number = 0;
    //private serialWorker: IReaderWriter;
    constructor(commandFactory: ISensorCommandFacory,
                seensorDataCommandReceiver: ISensorStreamerDataEncoder,
                sensorCommandWriter: ISensorCommandWriter) {
        super(commandFactory, seensorDataCommandReceiver, sensorCommandWriter);
        this.seensorDataCommandReceiver = seensorDataCommandReceiver;
    }

    public async CloseConnection(){
        this.requiredStopStreaming  = true;
        super.CloseConnection();
    }
    
    public async SetT0() {
        let holdingRegisters = await this.GetHoldingRegisters();
        this.timeBase = CalculateTime(holdingRegisters.TimeLow, holdingRegisters.TimeHigh);
        super.SetT0();
    }

    protected async ProcessCommand(byte: number): Promise<boolean> {
        let header = await this.seensorDataCommandReceiver.GetHeader();
        if (!this.avgRatio) throw "Avg did not set."
        //console.log("Process C: ", commonData);
        let calculatedTime = header.time - this.timeBase;

        switch (byte) {
            case StramingPackageType.TORQUE:
                let torqueSensorData = await  this.seensorDataCommandReceiver.GetTorque(this.avgRatio, calculatedTime);
                this._onTorqueData.dispatch(this, torqueSensorData);

                break;

            case StramingPackageType.SPEED:
                let speedSensorData = await this.seensorDataCommandReceiver.GetSpeed(calculatedTime);
                this._onSpeedData.dispatch(this, speedSensorData);
                //console.log(speedSensorData);
                break;

            case StramingPackageType.TEMPERATUR:
                let temperatureSensorData = await this.seensorDataCommandReceiver.GetSpeed(calculatedTime);
                this._onTmpData.dispatch(this, temperatureSensorData);
                break;

            case StramingPackageType.MESSAGE:
                await this.seensorDataCommandReceiver.GetMessage();
                break;

            default:
                return false;
        }

        return true;
    }
}

