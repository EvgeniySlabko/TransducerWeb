import { DefaultCommand, ISensorCommand, MultipleCommand, SingleCommand } from "./DefaultSensorCommands";
import { ISensorCommandFacory } from "./ISensorCommandFactory";

export function CreateDefaultCommandFactory() {
    return new DefaultCommandFactory();
}

export class DefaultCommandFactory implements ISensorCommandFacory {
    CreateDefaultCommand(command: number, address: number, value: number): ISensorCommand {
        return new DefaultCommand(command, address, value);
    }
    CreateSingleCommand(command: number): ISensorCommand {
        return new SingleCommand(command);
    }
    CreateMultipleCommand(command: number, address: number, bytes: Uint8Array): ISensorCommand {
        return new MultipleCommand(command, address, bytes);
    }
}
