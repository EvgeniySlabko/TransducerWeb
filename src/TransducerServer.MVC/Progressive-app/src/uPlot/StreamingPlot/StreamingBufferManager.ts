import { AlignedData } from "uplot";
import { SensorData as DataEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { SeriesValue } from "../PlotCommon";

export declare class PlotBufferManagerConfig {
    dt: number;
    segments: number;
    maxFrameTimeRange: number;
}

declare class ISegmentInfo {
    lastDataIndex: number;
}

export class PlotBufferManager {
    private readonly maxFrameTimeRange: number = 60 * 30;                   // максимальная величина Range при которой не будет видно переключения перекресных буфферов (в секундах)
    private readonly framesCount = 6;                                       // кол во буферов //TODO сделать динамическое добавление при необходимости
    private readonly frameSize: number = 300;
    private readonly dt: number;
    
    private frames: AlignedData[] = new Array(this.framesCount)
    private frames2: AlignedData[] = new Array(this.framesCount)            //перекресный буффер по времени
    
    private maxTime: number;
    private frameTime: number;
    private lastFramesTime1 = 0;
    private lastFramesTime2;
    private getRange: () => [number, number];
    
    private segmentInfo: ISegmentInfo[] = [];
    
    public get Segments() { return this.segmentInfo.length }
    public get Dt() { return this.dt }

    constructor(rangeGetter: () => [number, number], config: PlotBufferManagerConfig) {
        this.getRange = rangeGetter;

        this.dt = config.dt;
        this.maxFrameTimeRange = config.maxFrameTimeRange,
        
        this.frameSize = (this.maxFrameTimeRange / this.dt) * 2;
        this.frameTime = this.frameSize * this.dt;
        this.lastFramesTime2 = (this.frameSize / 2) * this.dt;

        for (let i = 0; i < this.frames.length; i++) {

            let timeArr = new Array<number>(this.frameSize);
            let timeArr2 = new Array<number>(this.frameSize);
            for (let t = 0; t < timeArr.length; t++) {
                timeArr[t] = this.lastFramesTime1;
                timeArr2[t] = this.lastFramesTime2;
                this.lastFramesTime1 += this.dt;
                this.lastFramesTime2 += this.dt;
            }

            let valuesArr = new Array<SeriesValue[]>()
            let valuesArr2 = new Array<SeriesValue[]>()
            for (let j = 0; j < config.segments; j++) {
                let segment = new Array<SeriesValue>(this.frameSize)
                let segment2 = new Array<SeriesValue>(this.frameSize)
                segment.fill(undefined);
                valuesArr.push(segment);
                segment2.fill(undefined);
                valuesArr2.push(segment2);
            }

            this.frames[i] = [timeArr, ...valuesArr];
            this.frames2[i] = [timeArr2, ...valuesArr2];
        }

        for (let i = 0; i < config.segments; i++)
            this.segmentInfo.push({
                lastDataIndex: 0
            })

        this.maxTime = 0;
    }

    public get Source() {
        let range = this.getRange();
        let time = range[1];
        if (range[1] > this.GetLastTime()) {
            time = this.GetLastTime();
        }

        let frameIndex1 = Math.floor(time / this.frameTime);
        let frameIndex2 = Math.floor((time - (this.frameTime / 2)) / this.frameTime);


        if (frameIndex1 < 0) frameIndex1 = 0;
        if (frameIndex2 < 0) frameIndex2 = 0;

        return (frameIndex1 > frameIndex2) ? this.frames2[frameIndex2] : this.frames[frameIndex1];
    }


    private tickToGridIndex(sensorTimeValue: number) {
        return Math.floor(sensorTimeValue / this.dt); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
    };

    public GetLastSegmentTime(segmentIndex: number): number {
        return this.segmentInfo[segmentIndex].lastDataIndex * this.dt;
    }

    public GetLastTime(): number {
        return this.maxTime * this.dt;
    }

    public SetRange(segmentIndex: number, data: DataEventArgs) {
        let lastTimeVal = data.time[data.time.length - 1];
        let lastIndex = this.tickToGridIndex(lastTimeVal);

        if (lastIndex > this.maxTime)
            this.maxTime = lastIndex;
        if (lastIndex > this.segmentInfo[segmentIndex].lastDataIndex)
            this.segmentInfo[segmentIndex].lastDataIndex = lastIndex;

        for (let i = 0; i < data.time.length; i++) {
            let index = this.tickToGridIndex(data.time[i]);
            if (index >= 0) {
                this.SetValue(index, segmentIndex, data.data[i]);
                if (index > this.maxTime)
                    this.maxTime = index;
            }
        }
    }

    public Set(segmentIndex: number, value: number, time: number) {
        let index = this.tickToGridIndex(time);
        if (index > this.maxTime) this.maxTime = index;
        if (index > this.segmentInfo[segmentIndex].lastDataIndex)
            this.segmentInfo[segmentIndex].lastDataIndex = index;

        this.SetValue(index, segmentIndex, value);
        if (index > this.maxTime)
            this.maxTime = index;
    }

    public CleanSegment(segmentIndex: number) {
        this.frames.map(f => f[segmentIndex + 1]).forEach(s => {
            for (let i = 0; i < s.length; i++) {
                s[i] = undefined;
            }
        });

        this.segmentInfo[segmentIndex].lastDataIndex = 0;
    }

    public CleanSegments() {
        for (let i = 0; i < this.segmentInfo.length; i++)
            this.CleanSegment(i);
        this.maxTime = 0;
    }

    public SetGap(segmentIndex: number, from: number, to: number) {
        let i = this.tickToGridIndex(from);
        let j = this.tickToGridIndex(to);
        for (let k = i; k < j; k++)
            this.SetValue(k, segmentIndex, null);
    }

    private SetValue(index: number, segmentIndex: number, value: SeriesValue) {
        let indexInFrame1 = index % this.frameSize;
        let frameIndex1 = Math.floor(index / this.frameSize);

        this.frames[frameIndex1][segmentIndex + 1][indexInFrame1] = value;

        let indexInFrame2 = (index - (this.frameSize / 2)) % this.frameSize;
        if (indexInFrame2 >= 0) {
            let frameIndex2 = Math.floor((index - (this.frameSize / 2)) / this.frameSize);
            this.frames2[frameIndex2][segmentIndex + 1][indexInFrame2] = value;
        }
    }
}