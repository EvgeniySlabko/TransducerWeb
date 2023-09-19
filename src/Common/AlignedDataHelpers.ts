import { SensorData } from "../Sensor/SensorDefinitions";
import { SeriesValue } from "../uPlot/PlotCommon";
import { TypedArray } from "../uPlot/uplot";

export declare class DataAlignParams {
    dt: number; //интервал сетки выравнивания
}

export function AlignedData(data: SensorData[], params: DataAlignParams): SeriesValue[][] {
    let timeToIndex = (time: number) => Math.round(time / params.dt);

    let firstTime = GetFirstTime(data);
    if (firstTime < 0) firstTime = 0;
    let lastTime = GetLastTime(data);
    let lastIndex = timeToIndex(lastTime);
    let firstIndex = timeToIndex(firstTime);
    let segmentSize = lastIndex - firstIndex;

    let matrix = new Array<SeriesValue[]>(data.length + 1);
    for (let i = 0; i < matrix.length; i++) matrix[i] = new Array<SeriesValue>(segmentSize);

    // set time grid;
    for (let i = 0; i < matrix[0].length; i++) matrix[0][i] = (i + firstIndex) * params.dt;

    // set data;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
            let index = timeToIndex(data[i].time[j]);
            if (index >= firstIndex) {
                matrix[i + 1][index - firstIndex] = data[i].data[j];
            }
        }
    }

    return matrix;
}

function GetFirstTime(data: SensorData[]) {
    let timeArr: number[] = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].data.length > 0) {
            timeArr.push(data[i].time[0]);
        }
    }

    return Math.min(...timeArr);
}

function GetLastTime(data: SensorData[]) {
    let lastValues = data.map((value) => value.time[value.time.length - 1]);
    return Math.max(...lastValues);
}

export function GetEmptyAlignedData(startTime: number, dt: number, segments: number, length: number): uPlot.AlignedData {
    let currentTime = startTime;
    let timeArr = new Array<number>(length);
    for (let i = 0; i < length; i++) {
        timeArr[i] = currentTime;
        currentTime += dt;
    }

    let dataArrs = new Array<SeriesValue[]>(segments);
    for (let i = 0; i < dataArrs.length; i++) {
        dataArrs[i] = new Array<SeriesValue>(length);
        for (let j = 0; j < dataArrs.length; j++) {
            dataArrs[i][j] = undefined;
        }
    }

    return [timeArr, ...dataArrs];
}

export function NearestPoint(arr: TypedArray, index: number, maxCount: number): SeriesValue {
    if (arr[index] === null) return undefined;
    if (arr[index] !== undefined) return arr[index] as number;

    let left = index;
    let right = index;
    let curIter = 0;
    do {
        if (arr[left] !== undefined) return arr[left];

        if (left !== 0) left -= 1;

        if (arr[right] !== undefined) return arr[right];

        if (right !== arr.length - 1) right += 1;

        curIter += 1;
    } while (curIter <= maxCount);

    return undefined;
}
