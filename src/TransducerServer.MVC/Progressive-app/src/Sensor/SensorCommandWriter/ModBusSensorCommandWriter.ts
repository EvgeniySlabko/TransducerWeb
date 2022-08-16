import { CRC16MODBUS } from "../../IO/CRC-16";
import { IReaderWriter } from "../../IO/IReaderWriter";
import { ISensorCommand } from "../SensorCommand/DefaultSensorCommands";
import { ISensorCommandWriter } from "./SensorCommandWriter";

export class ModBusSensorCommandWriter implements ISensorCommandWriter {
    private readonly readerWriter: IReaderWriter;
    constructor(readerWriter: IReaderWriter) {
        this.readerWriter = readerWriter;
    }

    async Write(command: ISensorCommand): Promise<void> {
        let baseBytes = command.GetBytes();
        let crc = CRC16MODBUS(baseBytes);
        let resultCommand = new Uint8Array(baseBytes.length + crc.length);
        resultCommand.set(baseBytes, 0);
        resultCommand.set(crc, baseBytes.length);
        await this.readerWriter.Write(resultCommand);
    }
}

export function CreateModBusSensorCommandWriter(readerWriter: IReaderWriter): ModBusSensorCommandWriter {
    return new ModBusSensorCommandWriter(readerWriter);
}
