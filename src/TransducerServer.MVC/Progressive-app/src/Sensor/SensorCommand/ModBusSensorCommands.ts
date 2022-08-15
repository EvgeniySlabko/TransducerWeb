import { CRC16MODBUS } from "../../IO/CRC-16";
import { SensorCommand } from "../SensorDefinitions";
import { ISensorCommand } from "./DefaultSensorCommands";

export class DefaultModBusCommand implements ISensorCommand {
  public Command: SensorCommand;
  private readonly address: number;
  private readonly value: number;
  private readonly deviceAddress: number;

  constructor(
    deviceAddress: SensorCommand,
    command: number,
    address: number,
    value: number
  ) {
    this.deviceAddress = deviceAddress;
    this.Command = command;
    this.address = address;
    this.value = value;
  }

  GetBytes(): Uint8Array {
    let reqest: Uint8Array = new Uint8Array(8);
    let crcSequence: Uint8Array = new Uint8Array(6);
    reqest[0] = crcSequence[0] = this.deviceAddress & 0xff;
    reqest[1] = crcSequence[1] = this.Command;
    reqest[2] = crcSequence[2] = (this.address >> 8) & 0xff;
    reqest[3] = crcSequence[3] = this.address & 0xff;
    reqest[4] = crcSequence[4] = (this.value >> 8) & 0xff;
    reqest[5] = crcSequence[5] = this.value & 0xff;
    let crc = CRC16MODBUS(crcSequence);
    reqest[6] = crc[0];
    reqest[7] = crc[1];
    return reqest;
  }
}

export class SingleModBusCommand implements ISensorCommand {
  Command: SensorCommand;
  private readonly deviceAddress: number;
  constructor(deviceAddress: number, command: SensorCommand) {
    this.deviceAddress = deviceAddress;
    this.Command = command;
  }

  GetBytes(): Uint8Array {
    let reqest: Uint8Array = new Uint8Array(4);
    let crcSequence: Uint8Array = new Uint8Array(2);
    reqest[0] = crcSequence[0] = this.deviceAddress;
    reqest[1] = crcSequence[1] = this.Command;
    let crc = CRC16MODBUS(crcSequence);
    reqest[2] = crc[0];
    reqest[3] = crc[1];
    return reqest;
  }
}

export class MultipleModBusCommand implements ISensorCommand {
  Command: SensorCommand;
  private bytes: Uint8Array;
  private address: number;
  private readonly deviceAddress: number;

  constructor(
    deviceAddress: number,
    command: SensorCommand,
    address: number,
    bytes: Uint8Array
  ) {
    this.deviceAddress = deviceAddress;
    this.Command = command;
    this.address = address;
    this.bytes = bytes;
  }

  GetBytes(): Uint8Array {
    let requesLength = 4 + this.bytes.length;
    let reqest: Uint8Array = new Uint8Array(7 + this.bytes.length);
    let crcSequence: Uint8Array = new Uint8Array(reqest.length - 2);

    reqest[0] = crcSequence[0] = this.Command;
    reqest[1] = crcSequence[1] = (this.address >> 8) & 0xff;
    reqest[2] = crcSequence[2] = this.address & 0xff;
    reqest[3] = crcSequence[3] = this.bytes.length;
    for (let i = 0; i < this.bytes.length; i++) {
      let j = i + 4;
      reqest[j] = this.bytes[i];
      crcSequence[j] = this.bytes[i];
    }

    let crc = CRC16MODBUS(crcSequence);
    reqest[requesLength - 2] = crc[0];
    reqest[requesLength - 1] = crc[1];

    return reqest;
  }
}
