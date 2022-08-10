import { AsShortArray } from "../../Common/Common";
import { CRC16MODBUS } from "../../IO/CRC-16";
import { IReaderWriter } from "../../IO/IReaderWriter";
import { SensorCommand, SensorSK } from "../SensorDefinitions";
import { ISensorDataCommandEncoder } from "./ISensorDataEncoder";
import { ISensorStreamerDataEncoder } from "./ISensorStreamerDataEncoder";

export class ModBusSensorDataCommandEncoder implements ISensorDataCommandEncoder
{
    protected readerWriter: IReaderWriter;
    protected lastDeviceAddress: number = 0;
    protected lastCommand: number = 0;
    constructor(readerWriter: IReaderWriter)
    {
        this.readerWriter = readerWriter;
    }

    // TODO Remove from here
    public async Close(): Promise<void> {
        await this.readerWriter.Close();
    }

    public async GetHoldingRegistersAnswer() : Promise<number[]>
    {
        let bytes = (await this.readerWriter.Read(1))[0];
        let rowDataBytes = await this.readerWriter.Read(bytes);

        let crcBytes = new Uint8Array(bytes + 4);
        crcBytes.set([this.lastDeviceAddress], 0);
        crcBytes.set([this.lastCommand], 1);
        crcBytes.set([bytes], 2);

        crcBytes.set(rowDataBytes, 4);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(crcBytes, expectedCrc);

        let registers = AsShortArray(rowDataBytes, false);

        return registers;
    }

    public async GetInputRegistersAnswer() : Promise<number[]>
    {
        let bytes = (await this.readerWriter.Read(1))[0];
        let rowBytes = await this.readerWriter.Read(bytes);

        let crcBytes = new Uint8Array(bytes + 4);
        crcBytes.set([this.lastDeviceAddress], 0);
        crcBytes.set([this.lastCommand], 1);
        crcBytes.set([bytes], 2);
        crcBytes.set(rowBytes, 4);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(crcBytes, expectedCrc);

        let registers = AsShortArray(rowBytes, false);
        return registers;
    }   

    public async GetSingleCoilAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);

        let crcBytes = new Uint8Array(rowBytes.length + 4);
        crcBytes.set([this.lastDeviceAddress], 0);
        crcBytes.set([this.lastCommand], 1);
        crcBytes.set(rowBytes, 2);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(crcBytes, expectedCrc);

        let registers = AsShortArray(rowBytes, false);
        return registers;
    }
    
    public async GetPresetSingleRegisterAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);

        let crcBytes = new Uint8Array(rowBytes.length + 4);
        crcBytes.set([this.lastDeviceAddress], 0);
        crcBytes.set([this.lastCommand], 1);
        crcBytes.set(rowBytes, 2);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(crcBytes, expectedCrc);

        let registers = AsShortArray(rowBytes, false);
        return registers;
    }
    
    public async GetPresetMultipleRegisterAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);

        let crcBytes = new Uint8Array(rowBytes.length + 4);
        crcBytes.set([this.lastDeviceAddress], 0);
        crcBytes.set([this.lastCommand], 1);
        crcBytes.set(rowBytes, 3);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(crcBytes, expectedCrc);

        let registers = AsShortArray(rowBytes, false);
        return registers;
    }

    public async GetID() : Promise<SensorSK>
    {
        var data = await this.readerWriter.Read(60);

        let allBytes = new Uint8Array(data.length + 4);
        allBytes.set([this.lastCommand], 0);
        allBytes.set(data, 1);
        let expectedCrc = await this.ReadCRC();
        let verified = this.VerifyCRC16Bytes(allBytes, expectedCrc);

        var idView = new DataView(data.buffer);
        var sk = new SensorSK()
        Object.assign(sk.ID, data.slice(0, 3));
        sk.Temperature = idView.getUint8(3);
        sk.Korrect = idView.getUint8(4);
        sk.NumberOfTeeth = idView.getInt16(5, true);
        sk.MaxSpeed = idView.getUint8(7);
        Object.assign(sk.DateOfVerification, data.slice(8, 3));
        Object.assign(sk.SKInfo, data.slice(11));
        return sk
    }

    public async GetCommand(): Promise<SensorCommand> {
        this.lastDeviceAddress = (await this.readerWriter.Read(1))[0];
        this.lastCommand = (await this.readerWriter.Read(1))[0];
        return this.lastCommand;
    }

    protected async ReadCRC()
    {
        let crc = await this.readerWriter.Read(2);
        return [crc[0], crc[1]];
    }

    protected VerifyCRC16Bytes(source: Uint8Array, expectedCRC: number[]) : boolean{

        let actualCRC = CRC16MODBUS(source);
        
        return expectedCRC[0] === actualCRC[0] && expectedCRC[1] === actualCRC[1];
    }
}

export function CreateModBusSensorDataCommandEncoder(readerWriter: IReaderWriter) : ISensorDataCommandEncoder{
    return new ModBusSensorDataCommandEncoder(readerWriter);
}


