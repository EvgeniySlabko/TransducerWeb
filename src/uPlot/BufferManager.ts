import { GetApproximateValue } from "../Common/Common";
import { dataEventArgs as DataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

declare class ISegmentInfo
{
    lastDataIndex: number;
}

export class PlotBufferManager
{
    private buff: (number | null | undefined)[][] = [];

    private initialBufferSize: number = 400000;

    private dt: number;
    private idx: number;                                    // последний индекс с данными
    private bufferCutOffMaxLength: number = 200000;         // при достижения этой длинны бубера будет происходить обрезка начала;
    private cutOffRatio: number = 0.2;                      // какую часть текущего буфера отрезаем (0...1);
    
    private fillingBufferForExpand = 0.8;                   // заполнение буфера при котором происходит его расширение(0..1)
    private fillingBufferForCutOff = 0.9;                  // заполнение буфера при котором происходит его обрезка(0..1)

    private segmentInfo: ISegmentInfo[] = [];
    constructor(segments: number, dt: number)
    {
        this.dt = dt;
        for (let i = 0; i < segments + 1; i++) {
            this.buff.push(new Array<number | null | undefined>(this.initialBufferSize))
        }

        this.idx = 0; 
        this.Init();
        this.Startup();
    }

    private size = () => this.buff[0].length; 
    public get Source() {return this.buff}
    public get Segments() {return this.segmentInfo.length}

    private tickToGridIndex (sensorTimeValue: number) {
        return Math.floor(sensorTimeValue / this.dt); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
    };


    public GetLastSegmentTime(segmentIndex: number) : number{
        return this.segmentInfo[segmentIndex].lastDataIndex * this.dt;
    }

    public GetLastTime() : number{
        return this.idx * this.dt;
    }

    private Handle(): (number | null | undefined)[][] | null
    {
        /*
        if (this.size() >= this.fillingBufferForCutOff * this.bufferCutOffMaxLength) //нужно обрезать буффер
        {
            let newBuffer: (number | null | undefined)[][] = [];
            let firstIndex = Math.floor((this.size() - this.cutOffRatio * this.size()));
            this.buff.forEach((t, i) => {
                this.buff[i].splice(0, firstIndex);
            });

            return null;
        }

        if (this.idx >= this.fillingBufferForExpand) //нужно обрезать буффер
        {
            let newBuffer: (number | null | undefined)[][] = [];
            let firstIndex = Math.floor((this.size() - this.cutOffRatio * this.size()));
            this.buff.forEach((t, i) => {
                this.buff[i].splice(0, firstIndex);
            });

            return this.buff;
        }
        */

        return null;
    }

    public SetRange(segmentIndex: number, data: DataEventArgs)
    {
        this.Handle();

        let lastTimeVal = data.time[data.time.length - 1];
        let lastIndex = this.tickToGridIndex(lastTimeVal);

        //this.Handle();
        if (lastIndex > this.idx) this.idx = lastIndex;
        if (lastIndex > this.segmentInfo[segmentIndex].lastDataIndex) this.segmentInfo[segmentIndex].lastDataIndex = lastIndex;

        for (let i = 0; i < data.time.length; i++) {
            let index = this.tickToGridIndex(data.time[i]);
            this.buff[segmentIndex + 1][index] = data.data[i];
            if (index > this.idx)
            {
                this.idx = index;
            }
        }
    }

    public Set(segmentIndex: number, value: number, time: number)
    {
        this.Handle();

        let index = this.tickToGridIndex(time);
        if (index > this.idx) this.idx = index;
        if (index > this.segmentInfo[segmentIndex].lastDataIndex) this.segmentInfo[segmentIndex].lastDataIndex = index;

        this.buff[segmentIndex][index] = value;
        if (index > this.idx)
        {
            this.idx = index;
        }
    }

    public CleanSegment(segmentIndex: number)
    {
        for (let k = 0; k < this.buff[0].length; k++) {
            this.buff[segmentIndex][k] = undefined;
        } 

        this.idx = 0;
    }

    public CleanSegments()
    {
        for (let i = 1; i < this.buff.length; i++) {
            this.CleanSegment(i);
        }
    }

    private Startup()
    {
        // TODO
        // this.bufferCutOffMaxLength = ...
    }

    public GetSegmentValue(segmentIndex: number, time: number) : number | undefined
    {
        let segment = this.buff[segmentIndex + 1];
        let index = this.tickToGridIndex(time);
        if (index > this.segmentInfo[segmentIndex].lastDataIndex) return undefined;
        if (time < 0) return undefined;
        let nearestValue = GetApproximateValue(segment, index, 100);
        return nearestValue;
    }

    public SetGap(segmentIndex: number, from: number, to: number)
    {
        let i = this.tickToGridIndex(from);
        let j = this.tickToGridIndex(to);
        for (let k = i; k < j; k++) {
            this.buff[segmentIndex][k] = null;
        }
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

        for (let k = 0; k < this.buff[0].length; k++) {
            this.buff[0][k] = k * this.dt;
        }
    }
}