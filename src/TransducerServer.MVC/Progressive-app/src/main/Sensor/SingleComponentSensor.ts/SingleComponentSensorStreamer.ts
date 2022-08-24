import { ISensorConnector } from "../../SensorIOWorker/ISensorConnector";
import { ISensorCommandFacory } from "../SensorCommand/ISensorCommandFactory";
import { ISensorCommandWriter } from "../SensorCommandWriter/SensorCommandWriter";
import { CalculateTime, ISensorStreamerDataEncoder } from "../SensorDataEncoder/ISensorStreamerDataEncoder";
import { StramingPackageType } from "../SensorDefinitions";
import { SingleComponentSensorBase } from "./SingleComponentSensorBase";

export class SingleComponentSensor extends SingleComponentSensorBase {
    private seensorDataCommandReceiver: ISensorStreamerDataEncoder;

    protected timeBase: number = 0;
    //private serialWorker: IReaderWriter;
    constructor(sensorIOWorker: ISensorConnector, commandFactory: ISensorCommandFacory, seensorDataCommandReceiver: ISensorStreamerDataEncoder, sensorCommandWriter: ISensorCommandWriter, id: string) {
        super(sensorIOWorker, commandFactory, seensorDataCommandReceiver, sensorCommandWriter, id + " base");
        this.seensorDataCommandReceiver = seensorDataCommandReceiver;
    }

    public async CloseConnection() {
        await super.CloseConnection();
    }

    public async SetT0() {
        let holdingRegisters = await this.GetHoldingRegisters();
        this.timeBase = CalculateTime(holdingRegisters.TimeLow, holdingRegisters.TimeHigh);
        await super.SetT0();
    }

    protected async ProcessCommand(byte: number): Promise<boolean> {
        let header = await this.seensorDataCommandReceiver.GetHeader();
        //console.log("Process C: ", commonData);
        let calculatedTime = header.time - this.timeBase;

        switch (byte) {
            case StramingPackageType.TORQUE:
                let torqueSensorData = await this.seensorDataCommandReceiver.GetTorque(this.avgRatio ?? 1, calculatedTime);
                if (this.avgRatio) this._onTorqueData.dispatch(this, torqueSensorData);
                break;

            case StramingPackageType.SPEED:
                let speedSensorData = await this.seensorDataCommandReceiver.GetSpeed(calculatedTime);
                if (this.avgRatio) this._onSpeedData.dispatch(this, speedSensorData);
                //console.log(speedSensorData);
                break;

            case StramingPackageType.TEMPERATUR:
                let temperatureSensorData = await this.seensorDataCommandReceiver.GetSpeed(calculatedTime);
                if (this.avgRatio) this._onTmpData.dispatch(this, temperatureSensorData);
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
