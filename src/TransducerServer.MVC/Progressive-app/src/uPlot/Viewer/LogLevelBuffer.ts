import { AlignedData } from "uplot";
import { getEmptyAlignedData } from "../../Common/Common";
import { Snapshot, TrackData } from "../../ReportListener/Snapshot"

export class LogLevelBugger
{
    private levels: number = 6;
    private compressionRatio: number = 1.5 //коэффицент изменения коэффицента усреднения на 1 level.
    private logLevel0Treshold = 10; //пороговое значение range после которого начинают действовать уровни логирования
    private logLevelRatio = 150; //пороговое значение range после которого начинают действовать уровни логирования

    private logLevelCalculate: (range: [number, number]) => number = (range) =>
    {
        let rangeValue = range[1] - range[0];
        if (rangeValue < this.logLevel0Treshold) return 0;

        let offsetRange = rangeValue - this.logLevel0Treshold;
        let logLevel = Math.floor(offsetRange / this.logLevelRatio);
        if (logLevel >= this.levels) logLevel = this.levels - 1;

        return logLevel;
    }

    private t0: number = 0;
    private th: number = 0;

    private rangeGetter: () => [number, number]
    
    private data: AlignedData[] = [];
    constructor(rangeGetter: () => [number, number])
    {
        for (let i = 0; i < this.levels; i++) {
            this.data.push([[],[]]);
        }
        this.rangeGetter = rangeGetter;
    }


    public get T0() : number
    {
        return this.t0;
    }

    public get TH() : number
    {
        return this.th;
    }

    public get Source() : AlignedData
    {
        let range = this.rangeGetter();
        let logLevel = this.logLevelCalculate([range[0], range[1]])
        // console.log(logLevel);
        return this.data[logLevel];
    }


    public FromSnapshot(snapshot: Snapshot)
    {
        let trackData = snapshot.GetTrackData();
        
        let getMaxTimeVal = (trackData: TrackData[]) : number =>
        {
            //смотри максимальные значения времени
            let maxTimeValues : number[] = [];
            trackData.forEach(t => {
            let lastValue = t.data.time[t.data.time.length - 1];
                maxTimeValues.push(lastValue);
            });

            //определяем размер буфера 
            let maxTimeValue = Math.max(...maxTimeValues)
            return maxTimeValue;
        }
        
        
        var dx = 1 / 5000;
        let toArrayIndex = (time: number) =>{
            return Math.floor(time / dx);
        }

        let maxTimeValue = getMaxTimeVal(trackData);
        let maxTimeIndex = toArrayIndex(maxTimeValue);
            
        this.data[0] = getEmptyAlignedData(0,  dx, trackData.length, maxTimeIndex);

        //проставляем данные
        for (let i = 0; i < trackData.length; i++) {
        for (let k = 0; k < trackData[i].data.time.length; k++) {
            var time = trackData[i].data.time[k];
            var val = trackData[i].data.data[k];

            var index = toArrayIndex(time);
            if (index < maxTimeIndex && index >= 0)
            this.data[0][i + 1][index] = val;
        }
        }

        // определяем минимальное значение по оси x
        let minTime = undefined;
        for (let i = 1; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].length; j++) {
            if (this.data[i][j] != undefined)
            {
            let currentFirstvalue = <number>this.data[0][0][j];
            if (!minTime || currentFirstvalue < minTime)
                minTime = currentFirstvalue
            }
        }
        }
        
        this.t0 = minTime as number;
        this.th = maxTimeValue;

        for (let i = 1; i < this.levels; i++) {
            let compressed = this.Compress(i, this.data[0])    
            this.data[i] = compressed;
        }
    }

    private Compress(level: number, source: AlignedData) : AlignedData
    {
        let getAvgBuff = (): [number, number | undefined][] =>
        {
            let avgBuff = new Array<[number, number | undefined]>(source.length - 1);
            for (let i = 0; i < avgBuff.length; i++) {
                avgBuff[i] = [0, undefined];
            }

            return avgBuff;
        }

        let levelAvg = Math.floor(this.compressionRatio * level);
        let compressedArraylength = Math.floor(source[0].length / levelAvg);

        let dt = 1 / Math.floor(5000 / levelAvg);
        
        let compressedData = getEmptyAlignedData(0,  dt, source.length - 1, compressedArraylength);
        for (let i = 0; i < compressedData[0].length; i++) {
            let sourceStartIndex = i * levelAvg;
            let avgBuff = getAvgBuff();

            for (let k = 0; k < levelAvg; k++) {
                let sourceIndex = sourceStartIndex + k;
                for (let l = 1; l < source.length; l++) {
                    let avgBufIndex = l - 1;
                    if (source[l][sourceIndex])
                    {
                        avgBuff[avgBufIndex][0]++;
                        if (avgBuff[avgBufIndex][1] === undefined)
                        {
                            avgBuff[avgBufIndex][1] = 0;
                        }

                        avgBuff[avgBufIndex][1] = (avgBuff[avgBufIndex][1] as number) + (source[l][sourceIndex] as number);
                    }
                }
            }
            
            for (let j = 1; j < compressedData.length; j++) {
                let avgBuffIndex = j - 1;

                compressedData[j][i] = (avgBuff[avgBuffIndex][1] === undefined) ? undefined :
                                       (avgBuff[avgBuffIndex][1] as number) / avgBuff[avgBuffIndex][0];
            }
        }

        return compressedData;
    }
}