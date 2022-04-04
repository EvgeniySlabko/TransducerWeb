export const READ_HOLDING_REGISTERS = 3 // чтение значений из нескольких регистров хранения;
export const READ_INPUT_REGISTERS = 4 // чтение значений из нескольких регистров ввода;
export const FORCE_SINGLE_COIL = 5; // запись значения одного флага;
export const PRESET_SINGLE_REGISTER = 6// запись значения в один регистр хранения;
export const PRESET_MULTIPLE_REGISTERS = 16 // запись значений в несколько регистров хранения;
export const REPORT_SLAVE_ID = 17 // чтение служебной информации об устройстве.


//Адресв
export const START_MEASURING = 0
export const START_STREAMING = 1
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

export type dataEventArgs =
{
    data: number,
    time: number
}
