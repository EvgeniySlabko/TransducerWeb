import { SensorCommand } from "../SensorDefinitions";
import { ISensorCommand } from "./DefaultSensorCommands";

export declare class ISensorCommandFacory {
  CreateDefaultCommand(
    command: SensorCommand,
    address: number,
    value: number
  ): ISensorCommand;
  CreateSingleCommand(command: SensorCommand): ISensorCommand;
  CreateMultipleCommand(
    command: SensorCommand,
    address: number,
    bytes: Uint8Array
  ): ISensorCommand;
}
