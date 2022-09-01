import { AlignedData } from "uplot";
import { SensorData as DataEventArgs } from "../../Sensor/SensorDefinitions";
import { SeriesValue } from "../PlotCommon";

export declare class PlotBufferManagerConfig {
    dt: number;
    segments: number;
}

declare class ISegmentInfo {
    lastDataIndex: number;
    avgCount: number;
    avgIndex: number;
}

export const MaxFrameSize = 400000; // Если больше, то лагает

export class PlotBufferManager {
    private readonly maxFrameTimeRange: number; // максимальная величина Range при которой не будет видно переключения перекресных буфферов (в секундах)
    private readonly frameSize: number;
    private readonly dt: number;

    private frames: AlignedData[] = [];
    private frames2: AlignedData[] = []; //перекресный буффер по времени

    private maxTime: number;
    private frameTime: number;
    private getRange: () => [number, number];

    private segmentInfo: ISegmentInfo[] = [];

    public get Segments() {
        return this.segmentInfo.length;
    }
    public get Dt() {
        return this.dt;
    }
    public get MaxFrameTimeRange() {
        return this.maxFrameTimeRange;
    }

    constructor(rangeGetter: () => [number, number], config: PlotBufferManagerConfig) {
        this.getRange = rangeGetter;

        this.dt = config.dt;
        this.maxFrameTimeRange = MaxFrameSize / (1 / config.dt) / 2;

        this.frameSize = (this.maxFrameTimeRange / this.dt) * 2;
        this.frameTime = this.frameSize * this.dt;

        for (let i = 0; i < config.segments; i++)
            this.segmentInfo.push({
                lastDataIndex: 0,
                avgCount: 0,
                avgIndex: 0,
            });

        this.HandleFramesBufferExpand(1); //добавим пустой буффер
        this.maxTime = 0;
    }

    public get Source() {
        let range = this.getRange();
        let time = range[1];
        if (range[1] > this.GetLastTime()) {
            time = this.GetLastTime();
        }

        let frameIndex1 = Math.floor(time / this.frameTime);
        let frameIndex2 = Math.floor((time - this.frameTime / 2) / this.frameTime);

        if (frameIndex1 < 0) frameIndex1 = 0;
        if (frameIndex2 < 0) frameIndex2 = 0;

        return frameIndex1 > frameIndex2 ? this.frames2[frameIndex2] : this.frames[frameIndex1];
    }

    private tickToGridIndex(sensorTimeValue: number) {
        return Math.round(sensorTimeValue / this.dt); // получаем индекс на графике по оси x (пододвигаем в меньшую сторону)
    }

    public GetLastSegmentTime(segmentIndex: number): number {
        return this.segmentInfo[segmentIndex].lastDataIndex * this.dt;
    }

    public GetLastTime(): number {
        return this.maxTime * this.dt;
    }

    public SetRange(segmentIndex: number, data: DataEventArgs) {
        let lastTimeVal = data.time[data.time.length - 1];
        this.HandleFramesBufferExpand(lastTimeVal);

        let lastIndex = this.tickToGridIndex(lastTimeVal);

        if (lastIndex > this.maxTime) this.maxTime = lastIndex;
        if (lastIndex > this.segmentInfo[segmentIndex].lastDataIndex) this.segmentInfo[segmentIndex].lastDataIndex = lastIndex;

        for (let i = 0; i < data.time.length; i++) {
            let index = this.tickToGridIndex(data.time[i]);
            if (index >= 0) {
                this.SetValue(index, segmentIndex, data.data[i]);
                if (index > this.maxTime) this.maxTime = index;
            }
        }
    }

    public Set(segmentIndex: number, value: number, time: number) {
        this.HandleFramesBufferExpand(time);
        let index = this.tickToGridIndex(time);
        if (index > this.maxTime) this.maxTime = index;
        if (index > this.segmentInfo[segmentIndex].lastDataIndex) this.segmentInfo[segmentIndex].lastDataIndex = index;

        this.SetValue(index, segmentIndex, value);
        if (index > this.maxTime) this.maxTime = index;
    }

    public CleanSegment(segmentIndex: number) {
        this.frames
            .map((f) => f[segmentIndex + 1])
            .forEach((s) => {
                for (let i = 0; i < s.length; i++) {
                    s[i] = undefined;
                }
            });

        this.segmentInfo[segmentIndex].lastDataIndex = 0;
    }

    public CleanSegments() {
        for (let i = 0; i < this.segmentInfo.length; i++) this.CleanSegment(i);
        this.maxTime = 0;
    }

    public SetGap(segmentIndex: number, from: number, to: number) {
        this.HandleFramesBufferExpand(to);
        let i = this.tickToGridIndex(from);
        let j = this.tickToGridIndex(to);
        for (let k = i; k < j; k++) this.SetValue(k, segmentIndex, null);
    }

    private SetValue(index: number, segmentIndex: number, value: SeriesValue) {
        let indexInFrame1 = index % this.frameSize;
        let frameIndex1 = Math.trunc(index / this.frameSize);

        this.frames[frameIndex1][segmentIndex + 1][indexInFrame1] = value;

        let indexInFrame2 = (index - this.frameSize / 2) % this.frameSize;
        if (indexInFrame2 >= 0) {
            let frameIndex2 = Math.trunc((index - this.frameSize / 2) / this.frameSize);
            this.frames2[frameIndex2][segmentIndex + 1][indexInFrame2] = value;
        }
    }

    private HandleFramesBufferExpand(expandToTime: number) {
        let framesBufferIndex1 = this.tickToGridIndex(expandToTime);
        let framesBufferIndex2 = this.tickToGridIndex(expandToTime) - this.frameSize / 2;

        this.HandleFramesBuffer(this.frames, framesBufferIndex1, () => {
            if (this.frames.length !== 0) {
                let lastFrame = this.frames[this.frames.length - 1];
                return lastFrame[0][lastFrame[0].length - 1] + this.dt;
            }

            return 0;
        });

        this.HandleFramesBuffer(this.frames2, framesBufferIndex2, () => {
            if (this.frames2.length !== 0) {
                let lastFrame = this.frames2[this.frames2.length - 1];
                return lastFrame[0][lastFrame[0].length - 1] + this.dt;
            }

            return this.frameTime / 2;
        });
    }

    HandleFramesBuffer = (framesBuffer: AlignedData[], expandToIndex: number, getLastTime: () => number) => {
        while (this.frameSize * framesBuffer.length <= expandToIndex) {
            let timeArr = new Array<number>(this.frameSize);
            let valuesArr = new Array<SeriesValue[]>();
            let lastTime = getLastTime();

            for (let t = 0; t < timeArr.length; t++) {
                timeArr[t] = lastTime;
                lastTime += this.dt;
            }

            for (let j = 0; j < this.Segments; j++) {
                let segment = new Array<SeriesValue>(this.frameSize);
                segment.fill(undefined);
                valuesArr.push(segment);
            }

            framesBuffer.push([timeArr, ...valuesArr]);
        }
    };
}
