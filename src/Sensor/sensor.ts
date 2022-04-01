import { SignalDispatcher, SimpleEventDispatcher } from "strongly-typed-events";
import SerialBufferedWorker from "../serialBuffer";

const READ_HOLDING_REGISTERS = 3 // чтение значений из нескольких регистров хранения;
const READ_INPUT_REGISTERS = 4 // чтение значений из нескольких регистров ввода;
const FORCE_SINGLE_COIL = 5; // запись значения одного флага;
const PRESET_SINGLE_REGISTER = 6// запись значения в один регистр хранения;
const PRESET_MULTIPLE_REGISTERS = 16 // запись значений в несколько регистров хранения;
const REPORT_SLAVE_ID = 17 // чтение служебной информации об устройстве.


//Адресв
const START_MEASURING = 0
const START_STREAMING = 1
const TIME_LOW = 3
const TIME_HIGH = 4

const COIL_ON_VALUE = 0x00FF;
const COIL_OFF_VALUE = 0x0000;


enum packageType {
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

//declare function handler(data: Uint8Array): void;

//const packageType = { torque: 100, speed: 101, temperatue: 102, msg: 103 };


export class Sensor {

    public serialWorker: SerialBufferedWorker;

    private _onTorqueData = new SimpleEventDispatcher<dataEventArgs>();
    private _onSpeedData = new SimpleEventDispatcher<dataEventArgs>();
    private _onTmpData = new SimpleEventDispatcher<dataEventArgs>();
    private _onReadingError = new SimpleEventDispatcher();

    private baseTime: number | undefined = undefined;

    private commandHandlers : Map<number, any> = new Map();

    constructor(worker: SerialBufferedWorker) {
        if (worker == null) throw "Worker is null";
        this.serialWorker = worker;
    }

    //Events 
    public get onData() {return this._onTorqueData.asEvent();}

    public get onTmp() {return this._onTmpData.asEvent();}

    public get onSpeed() {return this._onSpeedData.asEvent();}

    public get onError() {return this._onReadingError.asEvent();}


    public async SynchronizeCurrentTime()
    {
        this.commandHandlers.set(READ_HOLDING_REGISTERS, (data: number[]) => 
        {
            this.baseTime = this.CalculateTime(data[0], data[1]);
        });

        this.SendMessage(READ_HOLDING_REGISTERS, TIME_LOW, 2);
    }

    
    public async StartReading() {
        if (!this.serialWorker.baseWorker.IsConnected)
            await this.serialWorker.baseWorker.OpenPort();

        this.SendMessage(FORCE_SINGLE_COIL, START_MEASURING, COIL_ON_VALUE);

        //var response1 = await this.serialWorker.Read(5);
    }

    public async StartStreaming() {
        await this.SendMessage(FORCE_SINGLE_COIL, START_STREAMING, COIL_ON_VALUE);
        this.processbytes();
    }

    private async processbytes() {
        var nextIteration = async () => await this.processbytes();
        let dataType: number | undefined = (await this.serialWorker.Read(1))[0];

        //console.log("Type : ", dataType);
        var handeled = await this.ProcessDecoderCommands(dataType);
        if (handeled) {
            nextIteration();
            return;
        }

        handeled = await this.ProcessStreamingData(dataType);
        if (!handeled) {
            await this.ReadingErrorHandler();
            return;
        }

        nextIteration();
    }

    private async ProcessDecoderCommands(command: number): Promise<boolean> {
        switch (command) {
            case 5:
                {
                    var data = await this.serialWorker.Read(4);
                    //console.log("Process (5): ", data);
                    return true;
                }
            case READ_HOLDING_REGISTERS:
                var bytes = (await this.serialWorker.Read(1))[0];
                var data = await this.serialWorker.Read(bytes);
                var view = new DataView(data.buffer);
                var registers : number[] = [];
                for (let i = 0; i < data.length/2; i++) {
                    registers.push(view.getUint16(i * 2, true));
                }
                
                this.DispatchCommandListener(READ_HOLDING_REGISTERS, registers);

                return true;

            default:
                return false;
        }
    }

    private DispatchCommandListener(command: number, data: any) : void
    {
        if (this.commandHandlers.has(command))
        {
            this.commandHandlers.get(command)(data);
            this.commandHandlers.delete(command);
        }
    }

    private CalculateTime(timeL: number, timeH: number):  number
    {
        return (timeL + (timeH << 16)) / 62500;
    }

    private async ProcessStreamingData(command: number): Promise<boolean> {
        var size, timeL, timeH;
        let commonData = await this.serialWorker.Read(6);
        //console.log("Process C: ", commonData);
        const view = new DataView(commonData.buffer);
        size = view.getUint16(0, true);
        timeL = view.getUint16(2, true);
        timeH = view.getUint16(4, true);
        var calculatedTime = this.CalculateTime(timeL, timeH);
        switch (command) {
            case packageType.torque:
                var datatorque = await this.serialWorker.Read(size - 4);
                //console.log("seize", size);
                //console.log("Process T: ", datatorque);
                const torqView = new DataView(datatorque.buffer);
                var bufferCount = torqView.getUint8(0);
                var dataCount = torqView.getUint8(1);
                for (let i = 0; i < dataCount; i++) {
                    var value = torqView.getFloat32((2 + (i * 4)), true);
                    var dataArgs: dataEventArgs = {
                        data: value,
                        time: calculatedTime + (i * 0.16),
                    }
                    if (this.baseTime != undefined) this._onTorqueData.dispatch(dataArgs);
                }

                break;

            case packageType.speed:
                var dataSpeed = await this.serialWorker.Read(size - 4);
                //console.log("Process S: ", dataSpeed);
                const speedView = new DataView(dataSpeed.buffer);
                var speed = speedView.getFloat32(0, true);
                var dataArgs: dataEventArgs = {
                    data: speed,
                    time: calculatedTime,
                }
                if (this.baseTime != undefined) this._onSpeedData.dispatch(dataArgs);
                //console.log(dataSpeed);
                break;

            case packageType.temperatue:
                var dataTemperature = await this.serialWorker.Read(size - 4);
                const temperatureView = new DataView(dataTemperature.buffer);
                var temperature = temperatureView.getFloat32(0, true);
                var tmpArgs: dataEventArgs = {
                    data: temperature,
                    time: calculatedTime,
                }
                if (this.baseTime != undefined) this._onTmpData.dispatch(tmpArgs);
                break;

            case packageType.msg:
                var dataMsg = await this.serialWorker.Read(size - 4);
                const msgView = new DataView(dataMsg.buffer);
                var msgCount = msgView.getUint16(0, true);
                //console.log("Process M: ",dataMsg);
                for (let i = 0; i < msgCount; i++) {
                    var msg = msgView.getUint16(2 + (i * 2));
                }
                break;

            default:
                return false;
        }

        return true;
    }

    public async ReadingErrorHandler() {
        console.log('Sensor reading error');
        await this.serialWorker.Close();
        this._onReadingError.dispatch("Reading error");
    }

    public async StopStreaming() {
        await this.SendMessage(FORCE_SINGLE_COIL, START_STREAMING, COIL_OFF_VALUE);
        //var response2 = await this.serialWorker.Read(5);
    }

    private async SendMessage(command: number, addres: number, value: number) {
        var reqest = new Uint8Array(5);
        reqest[0] = command;
        reqest[1] = addres & 0xFF;
        reqest[2] = (addres >> 8) & 0xFF;
        reqest[3] = value & 0xFF;
        reqest[4] = (value >> 8) & 0xFF;

        await this.serialWorker.Write(reqest);
        //console.log("reqest: ", reqest);
    }
}

export default Sensor;

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
