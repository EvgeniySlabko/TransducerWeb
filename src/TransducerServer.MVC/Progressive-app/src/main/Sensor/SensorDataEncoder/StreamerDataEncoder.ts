import { IReaderWriter } from "../../IO/ReaderWriter/IReaderWriter";
import { SensorData, StramingPackageType } from "../SensorDefinitions";
import { ADCFrequency } from "../SingleComponentSensor.ts/ISingleComponentSensorBase";
import { CalculateTime, ISensorStreamerDataEncoder, SreamigSensorDataHeader } from "./ISensorStreamerDataEncoder";
import { ModBusSensorDataCommandEncoder } from "./ModBusSensorDataEncoder";

export class SensorStreamerDataEncoder extends ModBusSensorDataCommandEncoder implements ISensorStreamerDataEncoder {
    private size: number = 0;
    private headerBytes: Uint8Array = new Uint8Array();

    constructor(readerWriter: IReaderWriter) {
        super(readerWriter);
    }

    async GetHeader(): Promise<SreamigSensorDataHeader> {
        let commonData = await this.readerWriter.Read(6);
        this.headerBytes = commonData;
        //console.log("Process C: ", commonData);
        const view = new DataView(commonData.buffer);
        let size = view.getUint16(0, true);
        let timeL = view.getUint16(2, true);
        let timeH = view.getUint16(4, true);
        let calculatedTime = CalculateTime(timeL, timeH);

        this.size = size;
        return {
            size: size,
            time: calculatedTime,
        };
    }

    async GetTorque(avgRatio: number, currentTime: number): Promise<SensorData> {
        let datatorque = await this.readerWriter.Read(this.size - 4);
        //console.log("seize", size);
        //console.log("Process T: ", datatorque);

        let crc = this.ReadCRC();
        let allBytes = new Uint8Array(this.headerBytes.length + datatorque.length + 1);
        allBytes.set([StramingPackageType.TORQUE], 0);
        allBytes.set(this.headerBytes, 1);
        allBytes.set(this.headerBytes, this.headerBytes.length + 1);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(allBytes, expectedCrc);

        const torqView = new DataView(datatorque.buffer);
        let bufferCount = torqView.getUint8(0);
        let dataCount = torqView.getUint8(1);

        let torqArgs: SensorData = {
            data: new Array(dataCount),
            time: new Array(dataCount),
        };

        let interval = 1 / (ADCFrequency / avgRatio);
        for (let i = 0; i < dataCount; i++) {
            let value = torqView.getFloat32(2 + i * 4, true);

            torqArgs.data[i] = value;
            torqArgs.time[i] = currentTime + i * interval;
        }

        return torqArgs;
    }

    async GetSpeed(currentTime: number): Promise<SensorData> {
        let dataSpeed = await this.readerWriter.Read(this.size - 4);

        let crc = this.ReadCRC();
        let allBytes = new Uint8Array(this.headerBytes.length + dataSpeed.length + 1);
        allBytes.set([StramingPackageType.SPEED], 0);
        allBytes.set(this.headerBytes, 1);
        allBytes.set(this.headerBytes, this.headerBytes.length + 1);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(allBytes, expectedCrc);
        //console.log("Process S: ", dataSpeed);
        const speedView = new DataView(dataSpeed.buffer);
        let speed = speedView.getFloat32(0, true);
        let dataArgs: SensorData = {
            data: [speed],
            time: [currentTime],
        };

        return dataArgs;
    }
    async GetTemperature(currentTime: number): Promise<SensorData> {
        let dataTemperature = await this.readerWriter.Read(this.size - 4);

        let crc = this.ReadCRC();
        let allBytes = new Uint8Array(this.headerBytes.length + dataTemperature.length + 1);
        allBytes.set([StramingPackageType.TEMPERATUR], 0);
        allBytes.set(this.headerBytes, 1);
        allBytes.set(this.headerBytes, this.headerBytes.length + 1);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(allBytes, expectedCrc);

        const temperatureView = new DataView(dataTemperature.buffer);
        let temperature = temperatureView.getFloat32(0, true);
        let tmpArgs: SensorData = {
            data: [temperature],
            time: [currentTime],
        };

        return tmpArgs;
    }

    async GetMessage(): Promise<number[]> {
        let dataMsg = await this.readerWriter.Read(this.size - 4);

        let crc = this.ReadCRC();
        let allBytes = new Uint8Array(this.headerBytes.length + dataMsg.length + 1);
        allBytes.set([StramingPackageType.MESSAGE], 0);
        allBytes.set(this.headerBytes, 1);
        allBytes.set(this.headerBytes, this.headerBytes.length + 1);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(allBytes, expectedCrc);

        const msgView = new DataView(dataMsg.buffer);
        let msgCount = msgView.getUint16(0, true);
        for (let i = 0; i < msgCount; i++) {
            let msg = msgView.getUint16(2 + i * 2);
            //console.log("Message: ", msg);
        }

        //TO DO;
        return [];
    }
}

export function CreateStreamingSensorDataCommandEncoder(readerWriter: IReaderWriter): ISensorStreamerDataEncoder {
    return new SensorStreamerDataEncoder(readerWriter);
}
