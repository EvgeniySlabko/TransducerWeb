import { SensorCommand } from "../SensorDefinitions";
import { ISensorCommand } from "./DefaultSensorCommands";
import { ISensorCommandFacory } from "./ISensorCommandFactory";
import { DefaultModBusCommand, MultipleModBusCommand, SingleModBusCommand } from "./ModBusSensorCommands";

export function CreateModBusCommandFactory(deviceAddress: number){
    return new ModBusCommandFactory(deviceAddress);
}

export class ModBusCommandFactory implements ISensorCommandFacory
{
    private deviceAddress: number;

    constructor(deviceAddress: number)
    {
        this.deviceAddress = deviceAddress;
    }
    CreateDefaultCommand(command: SensorCommand, address: number, value: number): ISensorCommand {
        return new DefaultModBusCommand(this.deviceAddress, command, address, value);
    }
    CreateSingleCommand(command: SensorCommand): ISensorCommand {
        return new SingleModBusCommand(this.deviceAddress, command);
    }
    CreateMultipleCommand(command: SensorCommand, address: number, bytes: Uint8Array): ISensorCommand {
        return new MultipleModBusCommand(this.deviceAddress, command, address, bytes);
    }
}