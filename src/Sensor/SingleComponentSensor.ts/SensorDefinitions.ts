import { type } from "jquery";

export const READ_HOLDING_REGISTERS = 3 // чтение значений из нескольких регистров хранения;
export const READ_INPUT_REGISTERS = 4 // чтение значений из нескольких регистров ввода;
export const FORCE_SINGLE_COIL = 5; // запись значения одного флага;
export const PRESET_SINGLE_REGISTER = 6// запись значения в один регистр хранения;
export const PRESET_MULTIPLE_REGISTERS = 16 // запись значений в несколько регистров хранения;
export const REPORT_SLAVE_ID = 17 // чтение служебной информации об устройстве.


//Адреса флагов
export const START_MEASURING = 0
export const START_STREAMING = 1
export const EXTERNAL_SPEED_SENSOR = 2;
export const IS_FLOAT_USING = 3;
export const RESERVED = 4;
export const COMPUTER_CONNECTION = 5;


//Адреса хранения
export const FLAGS = 0
export const AVG_RATIO = 1
export const SPEED_PERIOD = 2
export const TIME_LOW = 3
export const TIME_HIGH = 4


export const COIL_ON_VALUE = 0x00FF;
export const COIL_OFF_VALUE = 0x0000;


export enum packageType {
    torque = 100,
    speed = 101,
    temperatue = 102,
    msg = 103,
};

export enum SensorMessage
{
    StartStreaming,
    StopStreaming,
    StopReading,
}

export interface SensorMessageEventArgs
{
    msgType: SensorMessage;
}

export type dataEventArgs =
{
    data: number[],
    time: number[]
}

export class HoldingRegisters
{
    public flags: Flags;
    private registers: number[];
    constructor(registers: number[])
    {
        if (registers == null || registers.length != 5)
            throw "Invalid holding registers";

        this.flags = new Flags(registers[0]);
        this.registers = registers;
    }

    public get AverageRatio() { return this.registers[1] };
    public get SpeedMeasurigPeriod() { return this.registers[2] };
    public get TimeLow() { return this.registers[3] };
    public get TimeHigh() { return this.registers[4] };
}

export class Flags{
    private flags: number;

    constructor(flags: number)
    {
        this.flags = flags;
    }

    public get StartStop() { return (1 & this.flags) != 0};                  // 0 (0x01) - Старт/Стоп измерений 
    public get StreamingTransfer() { return (2 & this.flags) != 0};          // 1 (0x02) - Потоковая передача
    public get ExternalRFT() { return (8 & this.flags) != 0};                // 2 (0x04) - Внешний датчик скорости
    public get UsingFloat() { return (16 & this.flags) != 0};                // 3 (0x08) - Использование чисел с плавающей точкой
    public get DataConversion() { return (32 & this.flags) != 0};            // 4 (0x10) - Пересчитанные к фиксир системе координат или исходные значения
    public get ComputerConnection() { return (64 & this.flags) != 0};        // 5 (0x20) - Соединение с компьютером установлено 
    public get Pronometer() { return (128 & this.flags) != 0};               // 6 (0x40) - Подключен угломер
    public get ControlButton() { return (254 & this.flags) != 0};            // 7 (0x80) - Есть кнопка запуска/останова измерений
}

export class SensorSK 
{
    public ID: Uint8Array = new Uint8Array(3);
    public Temperature: number = 0;
    public Korrect: number = 0;
    public NumberOfTeeth: number = 0;
    public MaxSpeed: number = 0;
    public DateOfVerification: Uint8Array = new Uint8Array(3);
    public SKInfo: Uint8Array = new Uint8Array(49);
}

export class FullSensorInfo{
    public Razmernost: number = 0;
    public Mnogitel: number = 0;
    public SensorType: string = "";
    public Name: string = "";
    public Unitname: string = "";
    public ValueName: string = "";
    public Popravka: number = 0;
    public UnitValueName: string = "";
    public MaxSpeed: number = 0;
    public MasEdRazm: number = 0;
    public MaxDopustBase: number = 0;
    public MaxValue: number = 0;
    public MinValue: number = 0;
    public isRotative: number = 0;
    public speedUnitsName: string = "";
    public powerName: string = "";
    public powerUnitsName: string = ""
}