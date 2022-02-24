
const READ_HOLDING_REGISTERS = 3 // чтение значений из нескольких регистров хранения;
const  READ_INPUT_REGISTERS = 4 // чтение значений из нескольких регистров ввода;
const FORCE_SINGLE_COIL =  5; // запись значения одного флага;
const PRESET_SINGLE_REGISTER =  6// запись значения в один регистр хранения;
const PRESET_MULTIPLE_REGISTERS =  16 // запись значений в несколько регистров хранения;
const REPORT_SLAVE_ID =  17 // чтение служебной информации об устройстве.

const START_MEASURING = 0
const START_STREAMING = 1

const COIL_ON_VALUE = 0x00FF;
const COIL_OFF_VALUE = 0x0000;
export async function InitDevice(getBytes, writeBytes)
{
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);
    await timeout(1000);
    var response = getBytes(99);
    console.log(response);
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
    await timeout(1000);
    var response = getBytes(100);
}

export function SendMessage(writeBytes, command, addres, value)
{
    var reqest = new Uint8Array(5);
    reqest[0] = command;
    reqest[1] = addres & 0xFF;
    reqest[2] = (addres >> 8) & 0xFF;
    reqest[3] = value & 0xFF;
    reqest[4] = (value >> 8) & 0xFF;

    writeBytes(reqest);
}

function timeout(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}



