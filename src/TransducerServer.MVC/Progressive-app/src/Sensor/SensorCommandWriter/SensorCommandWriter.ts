import { IReaderWriter } from "../../IO/IReaderWriter";
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
    let bytes = command.GetBytes();
    await this.readerWriter.Write(bytes);
  }
}

export function CreateDefaultSensorCommandWriter(
  readerWriter: IReaderWriter
): SensorCommandWriter {
  return new SensorCommandWriter(readerWriter);
}
