import { EventDispatcher, IEvent } from "strongly-typed-events";
import { SinGenerator } from "./Generators/SinGennerator";
import { SmoothGenerator } from "./Generators/SmoothGenerator";
import { ISingleComponentSensor } from "../ISingleComponentSensor";
import {
  SensorData,
  HoldingRegisters,
  SensorMessage,
  SensorMessageEventArgs,
  SensorSK,
  InputComplex,
} from "../../SensorDefinitions";

export class Facker implements ISingleComponentSensor {
  private generator: SmoothGenerator;
  private sinGenerator: SinGenerator;
  private intervals = [];
  constructor() {
    this.generator = new SmoothGenerator(100);
    this.sinGenerator = new SinGenerator();
  }

  ReadInputComplex(): Promise<InputComplex> {
    throw new Error("Method not implemented.");
  }

  SetUsingFloatState(state: boolean): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      resolve();
    });
  }
  SetExternalSensorState(state: boolean): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      resolve();
    });
  }
  SetSpeedPeriod(speedPerion: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      resolve();
    });
  }

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
  private _onTorqueData = new EventDispatcher<
    ISingleComponentSensor,
    SensorData
  >();
  private _onSpeedData = new EventDispatcher<
    ISingleComponentSensor,
    SensorData
  >();
  private _onTmpData = new EventDispatcher<
    ISingleComponentSensor,
    SensorData
  >();
  private _onClose = new EventDispatcher<ISingleComponentSensor, string>();
  private _onMessage = new EventDispatcher<
    ISingleComponentSensor,
    SensorMessageEventArgs
  >();

  private isStreaming: boolean = false;
  private mainInterval: NodeJS.Timer | undefined;
  private tmpInterval: NodeJS.Timer | undefined;
  private speedInterval: NodeJS.Timer | undefined;

  private timeBase: number = Date.now();

  get onData(): IEvent<ISingleComponentSensor, SensorData> {
    return this._onTorqueData.asEvent();
  }
  get onTmp(): IEvent<ISingleComponentSensor, SensorData> {
    return this._onTmpData.asEvent();
  }
  get onSpeed(): IEvent<ISingleComponentSensor, SensorData> {
    return this._onSpeedData.asEvent();
  }
  get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
    return this._onMessage.asEvent();
  }
  get onClose(): IEvent<ISingleComponentSensor, string> {
    return this._onClose.asEvent();
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
      var registers: number[] = [];
      for (let i = 0; i < bytes.length / 2; i++) {
        registers.push(view.getUint16(i * 2, true));
      }
      let holdingRegisters = new HoldingRegisters(registers);
      resolve(holdingRegisters);
    });
  }
  GetSkInfo(): Promise<SensorSK> {
    var data = new Uint8Array([
      0, 70, 1, 53, 128, 1, 0, 100, 1, 2, 21, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 48,
    ]);
    return new Promise<SensorSK>(async (resolve, reject) => {
      var idView = new DataView(data.buffer);
      var sk = new SensorSK();
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

      let currentTime = () => {
        return (Date.now() - this.timeBase) / 1000;
      };

      this.mainInterval = setInterval(() => {
        var values = new Array(1);
        var times = new Array(1);
        for (let i = 0; i < 100; i++) {
          values[i] = this.sinGenerator.GenerateNext(1)[0] * 60;
          times[i] = currentTime();
        }

        var torqArgs: SensorData = {
          data: values,
          time: times,
        };

        this._onTorqueData.dispatch(this, torqArgs);
      }, 20);

      this.tmpInterval = setInterval(() => {
        var tmpArgs: SensorData = {
          data: [Math.random() * 60],
          time: [currentTime()],
        };

        this._onTmpData.dispatch(this, tmpArgs);
      }, 1000);

      this.speedInterval = setInterval(() => {
        var speedArgs: SensorData = {
          data: [this.generator.GenerateNext(1)[0] * 30000],
          time: [currentTime()],
        };

        this._onSpeedData.dispatch(this, speedArgs);
      }, 100);

      this._onMessage.dispatch(this, {
        msgType: SensorMessage.StartStreaming,
      });

      resolve();
    });
  }

  StopStreaming(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.ClearIntervals();
      this._onMessage.dispatch(this, {
        msgType: SensorMessage.StopStreaming,
      });

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
      this._onClose.dispatch(this, "Соединение закрыто");
      this.ClearIntervals();
      resolve();
    });
  }

  private ClearIntervals() {
    if (this.speedInterval) clearInterval(this.speedInterval);
    if (this.mainInterval) clearInterval(this.mainInterval);
    if (this.tmpInterval) clearInterval(this.tmpInterval);
  }
}
