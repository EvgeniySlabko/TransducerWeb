import { CRC16MODBUS } from "../../Common/CRC-16";
import { IReaderWriter } from "../../IO/ReaderWriter/IReaderWriter";
import { ISensorCommand } from "../SensorCommand/DefaultSensorCommands";

export declare class ISensorCommandWriter {
    Write(command: ISensorCommand): Promise<void>;
}

export class SensorCommandWriter implements ISensorCommandWriter {
    private readonly readerWriter: IReaderWriter;
    constructor(readerWriter: IReaderWriter) {
        this.readerWriter = readerWriter;
    }

    async Write(command: ISensorCommand): Promise<void> {
        await this.readerWriter.Write(command.GetBytes());
    }
}
