import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "./ISensor";
import SensorComponentSensor from "./sensor";
import { dataEventArgs, HoldingRegisters, SensorSK } from "./SensorDefinitions";

export class Facker implements ISingleComponentSensor
{
    StopMeasuring(waitAnswer?: boolean): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            resolve();
        });
    }
    StartMeasuring(waitAnswer?: boolean): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            resolve();
        });
    }
    private _onTorqueData = new EventDispatcher<ISingleComponentSensor,  dataEventArgs>();
    private _onSpeedData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onTmpData = new EventDispatcher<ISingleComponentSensor, dataEventArgs>();
    private _onReadingError = new EventDispatcher<ISingleComponentSensor, string>();


    private isStreaming: boolean = false;
    private mainInterval: NodeJS.Timer | undefined;
    private tmpInterval: NodeJS.Timer | undefined;
    private speedInterval: NodeJS.Timer | undefined;


    private timeBase: number = Date.now();
    //private currentTime: number;
    //private currentTime: number;

    get onData(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onTorqueData.asEvent();
    }
    get onTmp(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onTmpData.asEvent();
    }
    get onSpeed(): IEvent<ISingleComponentSensor, dataEventArgs> {
        return this._onSpeedData.asEvent();
    }
    get onError(): IEvent<ISingleComponentSensor, string> {
        return this._onReadingError.asEvent();
    }

    Initialize(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            
            resolve();
        });
    }
    GetHoldingRegisters(): Promise<HoldingRegisters> {
        
        
        return new Promise<HoldingRegisters>(async (resolve, reject) => {
            var bytes = new Uint8Array([40, 0, 1, 0, 100, 0, 248, 0, 0, 0]);
            var view = new DataView(bytes.buffer);
            var registers : number[] = [];
            for (let i = 0; i < bytes.length/2; i++) {
                registers.push(view.getUint16(i * 2, true));
            }
            let holdingRegisters = new HoldingRegisters(registers);
            resolve(holdingRegisters);
        });
    }
    GetSkInfo(): Promise<SensorSK> {
        var data = new Uint8Array([5, 70, 1, 53, 128, 1, 0, 100, 1, 2, 21, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48]);
        return new Promise<SensorSK>(async (resolve, reject) => {
        var idView = new DataView(data.buffer);
        var sk = new SensorSK()
        Object.assign(sk.ID, data.slice(0, 3));
        sk.Temperature = idView.getUint8(3);
        sk.Korrect = idView.getUint8(4);
        sk.NumberOfTeeth = idView.getInt16(5, true);
        sk.MaxSpeed = idView.getUint8(7);
        Object.assign(sk.DateOfVerification, data.slice(8, 3));
        Object.assign(sk.SKInfo, data.slice(11));
        resolve(sk);
    });
    }

    StartStreaming(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
        this.isStreaming = true;


        let currentTime = () =>{
            return (Date.now() - this.timeBase) / 1000;
        }

        this.mainInterval = setInterval(() => {
            var values = new Array(100);
            var times = new Array(100);
            for (let i = 0; i < 100; i++) {
                values[i] = Math.random() * 60;
                times[i] = currentTime();
            }

            var torqArgs: dataEventArgs = {
                data: values,
                time: times,
            }
            
            
            this._onTorqueData.dispatch(this, torqArgs);
        }, 20);

        this.tmpInterval = setInterval(() => {
            var tmpArgs: dataEventArgs = {
                data: [Math.random() * 60],
                time: [currentTime()],
            }
            
            this._onTmpData.dispatch(this, tmpArgs);
        }, 1000);

        this.speedInterval = setInterval(() => {
            var speedArgs: dataEventArgs = {
                data: [Math.random() * 30000],
                time: [currentTime()],
            }
            
            this._onSpeedData.dispatch(this, speedArgs);
        });

        resolve();
        });
    }
    
    StopStreaming(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.ClearIntervals();
            resolve();
            });
    }

    SetAvgRatio(avgRatio: number): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            // TODO
            resolve();
            });
    }
    SetComputerConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            resolve();
            });
    }
    UnsetComputerConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            resolve();
            });
    }
    SetT0(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.timeBase = Date.now();
            resolve();
            });
    }
    CloseConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            resolve();
            });
    }

    private ClearIntervals()
    {
        if (this.speedInterval) clearInterval(this.speedInterval);
        if (this.mainInterval) clearInterval(this.mainInterval);
        if (this.tmpInterval) clearInterval(this.tmpInterval);
    }
}
    
