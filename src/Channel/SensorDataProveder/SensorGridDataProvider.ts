import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import { dataEventArgs } from "../../Sensor/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

// усредняет данные 
export class SensorGridDataProvider implements ISensorDataProvider
{
    private _onData = new SimpleEventDispatcher<dataEventArgs>();
    private _onMessage = new SimpleEventDispatcher<string>();
    private _onClose = new SimpleEventDispatcher<string>();

    private avgRatio: number | undefined;
    private tickCount: number = 0;
    private packageSize: number | undefined;
    private avgSumator: number = 0;
    private avgCount: number = 0;
    private currentDataCount: number = 0;
    private currentPackage: dataEventArgs;

    constructor(dataSource: ISimpleEvent<dataEventArgs> | null, 
                messageSource: ISimpleEvent<string> | null, 
                closeSource: ISimpleEvent<string> | null, 
                avgRation: number, 
                packageSize: number = 10)
    {
        this.packageSize = packageSize;
        this.avgRatio = avgRation;

        this.currentPackage = this.getNewPackage();

        closeSource?.sub((msg: string) => this._onClose.dispatch(msg));
        messageSource?.sub((msg: string) => this._onMessage.dispatch(msg));
        dataSource?.sub((args: dataEventArgs) => {
            for (let i = 0; i < args.time.length; i++) {
    
                if (++this.avgCount == this.avgRatio)
                {
                    var avgValue = this.avgSumator / this.avgRatio;
                    
                    this.currentPackage.data[this.currentDataCount] = avgValue;
                    this.currentPackage.data[this.currentDataCount] = this.tickCount++;
                    if (++this.currentDataCount == this.packageSize)
                    {
                        this._onData.dispatch(this.currentPackage);
                        this.currentPackage = this.getNewPackage();
                        this.currentDataCount = 0;
                    }
                    
                    this.avgSumator = 0;
                    this.avgCount = 0;
                }
                else
                {
                    this.avgSumator += args.data[i];
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
    

    private getNewPackage() : dataEventArgs
    {
        return {
            data: new Array(this.packageSize),
            time: new Array(this.packageSize),
        } as dataEventArgs
    }
}