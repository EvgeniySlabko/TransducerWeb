import { AsShortArray } from "../../Common/Common";
import { IReaderWriter } from "../../IO/IReaderWriter";
import { SensorCommand, SensorSK } from "../SensorDefinitions";
import { ISensorDataCommandEncoder } from "./ISensorDataEncoder";

export class DefaultSensorDataCommandEncoder implements ISensorDataCommandEncoder
{
    protected readerWriter: IReaderWriter;
    constructor(readerWriter: IReaderWriter)
    {
        this.readerWriter = readerWriter;
    }
    public async Close(): Promise<void> {
        await this.readerWriter.Close();
    }

    public async GetHoldingRegistersAnswer() : Promise<number[]>
    {
        let bytes = (await this.readerWriter.Read(1))[0];
        let rowBytes = await this.readerWriter.Read(bytes);
        let registers = AsShortArray(rowBytes);

        return registers;
    }

    public async GetInputRegistersAnswer() : Promise<number[]>
    {
        let bytes = (await this.readerWriter.Read(1))[0];
        let rowBytes = await this.readerWriter.Read(bytes);
        let registers = AsShortArray(rowBytes);
        return registers;
    }   

    public async GetSingleCoilAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);
        let registers = AsShortArray(rowBytes);
        return registers;
    }
    
    public async GetPresetSingleRegisterAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);
        let registers = AsShortArray(rowBytes);
        return registers;
    }
    
    public async GetPresetMultipleRegisterAnswer() : Promise<number[]>
    {
        let rowBytes = await this.readerWriter.Read(4);
        let registers = AsShortArray(rowBytes);
        return registers;
    }

    public async GetID() : Promise<SensorSK>
    {
        var data = await this.readerWriter.Read(60);
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
        let command = (await this.readerWriter.Read(1))[0];
        return command as SensorCommand;
    }
}

export function CreateDefaultSensorDataCommandEncoder(readerWriter: IReaderWriter) : DefaultSensorDataCommandEncoder{
    return new DefaultSensorDataCommandEncoder(readerWriter);
}