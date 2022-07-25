import { AlignedData } from "uplot";
import { dataEventArgs as DataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

declare class ISegmentInfo
{
    lastDataIndex: number;
}

export class PlotBufferManager
{
    private maxFrameTimeRange: number = 60 * 30;          // максимальная величина Range при которой не будет видно переключения перекресных буфферов (в секундах)
                                                    
    private readonly framesCount = 6;            // кол во буферов //TODO сделать динамическое добавление при необходимости

    
    private readonly frameSize: number = 300;

    private frames: AlignedData[] = new Array(this.framesCount)
    private frames2: AlignedData[] = new Array(this.framesCount) //перекресный буффер по времени

    private dt: number;
    private idx: number;                                    
    private frameTime: number;  
    private lastFramesTime1 = 0;
    private lastFramesTime2;
    private getRange: () => [number, number];         

    private segmentInfo: ISegmentInfo[] = [];

    constructor(segments: number, dt: number, rangeGetter: () => [number, number])
    {
        this.getRange = rangeGetter;
        this.dt = dt;
        this.frameSize = (this.maxFrameTimeRange / this.dt) * 2;
        this.frameTime = this.frameSize * this.dt; 
        this.lastFramesTime2 = (this.frameSize / 2) * dt;
   
        for (let i = 0; i < this.frames.length; i++) {
            
            let timeArr = new Array<number>(this.frameSize);
            let timeArr2 = new Array<number>(this.frameSize);
            for (let t = 0; t < timeArr.length; t++) 
            {
                timeArr[t] = this.lastFramesTime1;
                timeArr2[t] = this.lastFramesTime2;
                this.lastFramesTime1 += this.dt;
                this.lastFramesTime2 += this.dt;
            }

            let valuesArr = new Array<(number | null | undefined)[]>()
            let valuesArr2 = new Array<(number | null | undefined)[]>()
            for (let j = 0; j < segments; j++) {
                let segment = new Array<(number | null | undefined)>(this.frameSize)
                let segment2 = new Array<(number | null | undefined)>(this.frameSize)
                segment.fill(undefined);
                valuesArr.push(segment);
                segment2.fill(undefined);
                valuesArr2.push(segment2);
            }

            this.frames[i] = [timeArr, ...valuesArr];
            this.frames2[i] = [timeArr2, ...valuesArr2];
        }

        for (let i = 0; i < segments; i++) 
            this.segmentInfo.push({
                lastDataIndex: 0
            })
        
        this.idx = 0;
    }

    public get Source() 
    {
        let range = this.getRange();
        let time = range[1];
        if (range[1] > this.GetLastTime())
        {
            time = this.GetLastTime();
        }

        let frameIndex1 = Math.floor(time / this.frameTime);
        let frameIndex2 = Math.floor((time - (this.frameTime / 2)) / this.frameTime);

        
        if (frameIndex1 < 0) frameIndex1 = 0;
        if (frameIndex2 < 0) frameIndex2 = 0;

        if (frameIndex1 > frameIndex2)
        {
            //console.log("f2");
            return this.frames2[frameIndex2];
        }
        else
        {
            //console.log("f1");
            return this.frames[frameIndex1];
        }
        
        //return this.frames2[frameIndex2];
    }
    
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
            if (index >= 0)
            {
                this.SetValue(index, segmentIndex, data.data[i]);
                if (index > this.idx)
                    this.idx = index;
            }
        }
    }

    public Set(segmentIndex: number, value: number, time: number)
    {
        let index = this.tickToGridIndex(time);
        if (index > this.idx) this.idx = index;
        if (index > this.segmentInfo[segmentIndex].lastDataIndex) 
            this.segmentInfo[segmentIndex].lastDataIndex = index;

        this.SetValue(index, segmentIndex, value);
        if (index > this.idx)
            this.idx = index;
    }

    public CleanSegment(segmentIndex: number)
    {
        this.frames.map(f => f[segmentIndex + 1]).forEach(s =>
            {
                for (let i = 0; i < s.length; i++) {
                    s[i] = undefined;   
                }
            });
            
        this.segmentInfo[segmentIndex].lastDataIndex = 0;
    }

    public CleanSegments()
    {
        for (let i = 0; i < this.segmentInfo.length; i++)
            this.CleanSegment(i);
        this.idx = 0;
    }

    public SetGap(segmentIndex: number, from: number, to: number)
    {
        let i = this.tickToGridIndex(from);
        let j = this.tickToGridIndex(to);
        for (let k = i; k < j; k++)
            this.SetValue(k, segmentIndex, null);
    }

    private SetValue(index: number, segmentIndex: number,  value: number | null | undefined)
    {
        let indexInFrame1 = index % this.frameSize;
        let frameIndex1 = Math.floor(index / this.frameSize);

        this.frames[frameIndex1][segmentIndex + 1][indexInFrame1] = value;

        let indexInFrame2 = (index - (this.frameSize / 2)) % this.frameSize;
        if (indexInFrame2 >= 0)
        {
            let frameIndex2 = Math.floor((index -  (this.frameSize / 2))/ this.frameSize);
            
            //console.log(indexInFrame2);
            this.frames2[frameIndex2][segmentIndex + 1][indexInFrame2] = value;
        }
    }
}