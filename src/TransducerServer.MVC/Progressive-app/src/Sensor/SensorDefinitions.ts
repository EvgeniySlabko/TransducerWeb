// Команды декодеру
export enum SensorCommand {
  READ_HOLDING_REGISTERS = 3, // чтение значений из нескольких регистров хранения;
  READ_INPUT_REGISTERS = 4, // чтение значений из нескольких регистров ввода;
  FORCE_SINGLE_COIL = 5, // запись значения одного флага;
  PRESET_SINGLE_REGISTER = 6, // запись значения в один регистр хранения;
  PRESET_MULTIPLE_REGISTERS = 16, // запись значений в несколько регистров хранения;
  REPORT_SLAVE_ID = 17, // чтение служебной информации об устройстве.
}

//Адреса флагов
export enum FlagRegistersAddresses {
  START_MEASURING = 0,
  START_STREAMING = 1,
  EXTERNAL_SPEED_SENSOR = 2,
  IS_FLOAT_USING = 3,
  RESERVED = 4,
  COMPUTER_CONNECTION = 5,
}

export declare class InputComplex {
  mainValue: number;
  speed: number;
  temperature: number;
}

//Адреса хранения
export enum StorageRegistersAddresses {
  FLAGS = 0,
  AVG_RATIO = 1,
  SPEED_PERIOD = 2,
  TIME_LOW = 3,
  TIME_HIGH = 4,
}

//Адреса ввода
export enum InputRegistersAddresses {
  MainValue = 0,
  MainValuePower = 1,
  SpeedValue = 2,
  SpeedValuePower = 3,
  Temperature = 4,
  DecoderState = 5,
  MessagesCounter = 6,
  Message1 = 7,
  Message2 = 8,
  Message3 = 9,
  Message4 = 10,
  Message5 = 11,
  Message6 = 12,
  Message7 = 13,
  Message8 = 14,
  Message9 = 15,
  Message10 = 16,
  FirmvareVersion = 17,
}

export enum SensorCoilValue {
  COIL_ON_VALUE = 0x00ff,
  COIL_OFF_VALUE = 0x0000,
}

export class RequiredClose extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequiredClose.prototype);
  }
}

export enum StramingPackageType {
  TORQUE = 100,
  SPEED = 101,
  TEMPERATUR = 102,
  MESSAGE = 103,
}

export enum SensorMessage {
  StartStreaming,
  StopStreaming,
  StopReading,
  SetAvg,
  SetTime0,
}

export interface SensorMessageEventArgs {
  msgType: SensorMessage;
}

export interface SetAvgEventArgs extends SensorMessageEventArgs {
  avg: number;
}

export type SensorData = {
  data: number[];
  time: number[];
};

export class HoldingRegisters {
  public flags: Flags;
  private registers: number[];
  constructor(registers: number[]) {
    if (registers == null || registers.length != 5)
      throw "Invalid holding registers";

    this.flags = new Flags(registers[0]);
    this.registers = registers;
  }

  public get AverageRatio() {
    return this.registers[1];
  }
  public get SpeedMeasurigPeriod() {
    return this.registers[2];
  }
  public get TimeLow() {
    return this.registers[3];
  }
  public get TimeHigh() {
    return this.registers[4];
  }
}

export declare class FlagRegisters {
  IsMeasuring: boolean;
  IsStreaming: boolean;
  ExternalSensor: boolean;
  IsComputerConnect: boolean;
}

export class Flags {
  private flags: number;

  constructor(flags: number) {
    this.flags = flags;
  }

  public get StartStop() {
    return (1 & this.flags) != 0;
  } // 0 (0x01) - Старт/Стоп измерений
  public get StreamingTransfer() {
    return (2 & this.flags) != 0;
  } // 1 (0x02) - Потоковая передача
  public get ExternalRFT() {
    return (8 & this.flags) != 0;
  } // 2 (0x04) - Внешний датчик скорости
  public get UsingFloat() {
    return (16 & this.flags) != 0;
  } // 3 (0x08) - Использование чисел с плавающей точкой
  public get DataConversion() {
    return (32 & this.flags) != 0;
  } // 4 (0x10) - Пересчитанные к фиксир системе координат или исходные значения
  public get ComputerConnection() {
    return (64 & this.flags) != 0;
  } // 5 (0x20) - Соединение с компьютером установлено
  public get Pronometer() {
    return (128 & this.flags) != 0;
  } // 6 (0x40) - Подключен угломер
  public get ControlButton() {
    return (254 & this.flags) != 0;
  } // 7 (0x80) - Есть кнопка запуска/останова измерений
}

export class SensorSK {
  public ID: Uint8Array = new Uint8Array(3);
  public Temperature: number = 0;
  public Korrect: number = 0;
  public NumberOfTeeth: number = 0;
  public MaxSpeed: number = 0;
  public DateOfVerification: Uint8Array = new Uint8Array(3);
  public SKInfo: Uint8Array = new Uint8Array(49);
}

export class FullSensorInfo {
  public valueRatio: number = 1;
  public id: number = 0;
  public SensorId: string = "";
  public Razmernost: number = 0;
  public Mnogitel: number = 0;
  public SensorType: string = "";
  public Name: string = "";
  public Unitname: string = "";
  public ValueName: string = "";
  public Popravka: number = 0;
  public UnitValueName: string = "";
  public MaxSpeed: number = 0;
  public Accuracy: number = 0;
  public MaxDopustBase: number = 0;
  public MaxValue: number = 0;
  public MinValue: number = 0;
  public isRotative: number = 0;
  public speedUnitsName: string = "";
  public powerName: string = "";
  public powerUnitsName: string = "";
}
