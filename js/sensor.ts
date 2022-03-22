import {SerialWorker} from './serial.js'
//import { RingBuffer } from "./Buffer.js";
//var a = exports.RingBuffer;
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

enum packageType {
    torque = 100,
    speed = 101,
    temperatue = 102,
    msg = 103,
  };

//declare function handler(data: Uint8Array): void;

//const packageType = { torque: 100, speed: 101, temperatue: 102, msg: 103 };


export class Sensor {

    //private handler2: { (data: Uint8Array): void; };

    private intervalId: any;
    private worker: SerialWorker;
    //handler: (data: Uint8Array) =>  void;

    constructor(worker: SerialWorker) {
        this.worker = worker;
    }

    public async StartMeasuring()
    {
        this.SendMessage(FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);
        var response1 = await this.worker.Read(5);
        this.SendMessage(FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
        var response2 = await this.worker.Read(5);

        //this.intervalId =  setInterval(() => this.processbytes(), 10);

        //var setInterval = Ser

        this.processbytes();
    }

    public addTorqueListener(handler: {(data: Uint8Array): void}) : void
    {
        //this.handler = handler;
    }

    private async processbytes()
    {
        try
        {
            var size, dataType, timeL, timeH;
            let commonData = await this.worker.Read(7);
                const view = new DataView(commonData.buffer);
                dataType = view.getUint8(0);
                size = view.getUint16(1, true);
                timeL = view.getUint16(3, true);
                timeH = view.getUint16(5, true);
                //console.log("Process: ",commonData);
            
            switch (dataType) {
                case packageType.torque:
                    var datatorque = await this.worker.Read(size - 4);
                    //console.log("Process: ", datatorque);
                    const torqView = new DataView(datatorque.buffer);
                    var bufferCount = torqView.getUint8(0);
                    var dataCount = torqView.getUint8(1);
                    for (let i = 0; i < dataCount; i++) {
                        var value = torqView.getFloat32((2 + (i  * 4)), true);
                        //torqueBuff.push(value);
                    }
                    
                break;
        
                case packageType.speed:
                    var dataSpeed = await this.worker.Read(size - 4);
                    //console.log("Process: ", dataSpeed);
                    const speedView = new DataView(dataSpeed.buffer);
                    var speed = speedView.getFloat32(0, true);
                    //console.log(dataSpeed);
                break;
        
                case packageType.temperatue:
                    var dataTemperature = await this.worker.Read(size - 4);
                    const temperatureView = new DataView(dataTemperature.buffer);
                    var temperature = temperatureView.getFloat32(0, true);
                    //console.log("Process: ",dataTemperature);
                break;
        
                case packageType.msg:
                    var dataMsg = await this.worker.Read(size - 4);
                    const msgView = new DataView(dataMsg.buffer);
                    var msgCount = msgView.getUint16(0, true);
                    //console.log("Process: ",dataMsg);
                    for (let i = 0; i < msgCount; i++) {
                        var msg = msgView.getUint16(2 + (i * 2));
                    }
                break;
            
                default:
                    console.log('Error');
                    break;
            }
            
            setTimeout(async () => await this.processbytes(), 5);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    private SendMessage(command: number, addres: number, value: number)
    {
        var reqest = new Uint8Array(5);
        reqest[0] = command;
        reqest[1] = addres & 0xFF;
        reqest[2] = (addres >> 8) & 0xFF;
        reqest[3] = value & 0xFF;
        reqest[4] = (value >> 8) & 0xFF;

        this.worker.write(reqest);
        //console.log("reqest: ", reqest);
    }
}

/*

export var torqueBuff = new exports.RingBuffer(100);

var intervalId;

export async function InitDevice(getBytes, writeBytes)
{
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);
    var response1 = await getBytes(5);
    SendMessage(writeBytes, FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
    var response2 = await getBytes(5);

    intervalId =  setInterval(() => processbytes(processbytes), 10);
    getter = getBytes;
    await processbytes();
}



export function SendMessage(command, addres, value)
{
    var reqest = new Uint8Array(5);
    reqest[0] = command;
    reqest[1] = addres & 0xFF;
    reqest[2] = (addres >> 8) & 0xFF;
    reqest[3] = value & 0xFF;
    reqest[4] = (value >> 8) & 0xFF;

    writeBytes(reqest);
    //console.log("reqest: ", reqest);
}

function isValidResponse(req, res)
{
    if (req.length != res.length)
    {
        return false;
    }

    for (var i = 0; i < res.length; i++)
    {
        if (req[i] != res[i])
        {
            return false;
        }
    }

    return true;
}

//const state = { torque: 100, speed: 101, temperature: 102, message: 103, none: -1};
*/
