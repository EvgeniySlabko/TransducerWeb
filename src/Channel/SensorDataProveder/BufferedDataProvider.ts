import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

//буферизирует данные
export class BufferedSensorDataProvider implements ISensorDataProvider
{
    private _onData = new SimpleEventDispatcher<dataEventArgs>();
    private _onMessage = new SimpleEventDispatcher<string>();
    private _onClose = new SimpleEventDispatcher<string>();

    private bufferSize: number;
    private dataCount: number = 0;
    private dataBuffer: number[];
    private timeBuffer: number[];

    constructor(dataSource: ISimpleEvent<dataEventArgs> | null, messageSource: ISimpleEvent<string> | null, closeSource: ISimpleEvent<string> | null, bufferSize: number)
    {
        this.bufferSize = bufferSize;
        this.dataBuffer = new Array(this.bufferSize);
        this.timeBuffer = new Array(this.bufferSize);

        closeSource?.sub((msg: string) => this._onClose.dispatch(msg));
        messageSource?.sub((msg: string) => this._onMessage.dispatch(msg));
        dataSource?.sub((data: dataEventArgs) => {

            for (let i = 0; i < data.time.length; i++) {
                this.dataBuffer[this.dataCount] = data.data[i];
                this.timeBuffer[this.dataCount] = data.time[i];

                this.dataCount++;
                if (this.dataCount == this.bufferSize)
                {
                    var args: dataEventArgs = {
                        data: this.dataBuffer,
                        time: this.timeBuffer,
                    }

                    this._onData.dispatch(args)
                    this.dataCount = 0;
                }
            }
        });
    }
    get onData(): SimpleEventDispatcher<dataEventArgs> {
        return this._onData;
    }
    get onClose(): SimpleEventDispatcher<string> {
        return this._onClose;
    }
    get onMessage(): SimpleEventDispatcher<string> {
        return this._onMessage;
    }
}