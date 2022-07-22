import { AlignedData } from "uplot";
import { dataEventArgs as DataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

declare class ISegmentInfo
{
    lastDataIndex: number;
}

export class PlotBufferManager
{
    private buff: AlignedData = [[],[]];

    private initialBufferSize: number = 300000;

    private dt: number;
    private idx: number;                                    

    private segmentInfo: ISegmentInfo[] = [];

    constructor(segments: number, dt: number)
    {
        this.dt = dt;
        this.buff[0] = new Array(this.initialBufferSize);
        for (let i = 0; i < segments - 1; i++) {
            this.buff.push(new Array(this.initialBufferSize))
        }

        this.idx = 0; 
        this.Init();
    }

    public get Source() {return this.buff}
    public get Segments() {return this.segmentInfo.length}
    public get Dt() {return this.dt}

    private tickToGridIndex (sensorTimeValue: number) {
        return Math.floor(sensorTimeValue / this.dt); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
    };

    public GetLastSegmentTime(segmentIndex: number) : number{
        return this.segmentInfo[segmentIndex].lastDataIndex * this.dt;
    }

    public GetLastTime() : number{
        return this.idx * this.dt;
    }

    public SetRange(segmentIndex: number, data: DataEventArgs)
    {
        let lastTimeVal = data.time[data.time.length - 1];
        let lastIndex = this.tickToGridIndex(lastTimeVal);

        if (lastIndex > this.idx) 
            this.idx = lastIndex;
        if (lastIndex > this.segmentInfo[segmentIndex].lastDataIndex) 
            this.segmentInfo[segmentIndex].lastDataIndex = lastIndex;

        for (let i = 0; i < data.time.length; i++) {
            let index = this.tickToGridIndex(data.time[i]);
            this.buff[segmentIndex + 1][index] = data.data[i];
            if (index > this.idx)
                this.idx = index;
        }
    }

    public Set(segmentIndex: number, value: number, time: number)
    {
        let index = this.tickToGridIndex(time);
        if (index > this.idx) this.idx = index;
        if (index > this.segmentInfo[segmentIndex].lastDataIndex) 
            this.segmentInfo[segmentIndex].lastDataIndex = index;

        this.buff[segmentIndex][index] = value;
        if (index > this.idx)
            this.idx = index;
    }

    public CleanSegment(segmentIndex: number)
    {
        for (let k = 0; k < this.buff[0].length; k++)
            this.buff[segmentIndex][k] = undefined;
        this.segmentInfo[segmentIndex -1].lastDataIndex = 0;
    }

    public CleanSegments()
    {
        for (let i = 1; i < this.buff.length; i++)
            this.CleanSegment(i);
        this.idx = 0;
    }

    public SetGap(segmentIndex: number, from: number, to: number)
    {
        let i = this.tickToGridIndex(from);
        let j = this.tickToGridIndex(to);
        for (let k = i; k < j; k++)
            this.buff[segmentIndex + 1][k] = null;
    }

    private Init()
    {
        //проставляем основной массив с данными
        for (let i = 1; i < this.buff.length; i++) {
            for (let j = 0; j < this.buff[0].length; j++) {
                this.buff[i][j] = undefined;
            }

            this.segmentInfo.push({
                lastDataIndex: 0,
            })
        }

        for (let k = 0; k < this.buff[0].length; k++)
            this.buff[0][k] = k * this.dt;
    }
}