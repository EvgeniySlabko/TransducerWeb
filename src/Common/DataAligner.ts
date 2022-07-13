import { AlignedData } from "uplot";
import { dataEventArgs } from "../Sensor/SingleComponentSensor.ts/SensorDefinitions";

export declare class DataAlignParams
{
    dt: number; //интервал сетки выравнивания
}

export function AlignedData(data: dataEventArgs[], params: DataAlignParams) : (number | null | undefined)[][] {

    let timeToIndex = (time: number) => Math.floor(time / params.dt);

    let firstTime = GetFirstTime(data);
    let lastTime = GetLastTime(data);
    let lastIndex = timeToIndex(lastTime);
    let firstIndex= timeToIndex(firstTime);
    let segmentSize = lastIndex - firstIndex;

    let matrix = new Array<(number | null | undefined)[]>(data.length + 1);
    for (let i = 0; i < matrix.length; i++) 
        matrix[i] = new Array<(number | null | undefined)>(segmentSize);

    // set time grid;
    for (let i = 0; i < matrix[0].length; i++) 
        matrix[0][i] = (i + firstIndex) * params.dt;
    
    // set data;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
            let index = timeToIndex(data[i].time[j]);
            if (index >= firstIndex)
            {
                matrix[i + 1][index - firstIndex] = data[i].data[j];
            }
        }
    }

    return matrix;
}

function GetFirstTime(data: dataEventArgs[])
{
    let times: number[] = [];
    for(let i = 0; i < data.length; i++)
    {
        if (data[i].data.length > 0)
        {
            times.push(data[i].time[0])
        }
    };

   return  Math.min(...times);
}

function GetLastTime(data: dataEventArgs[])
{
    let lastValues = data.map(d => d.time[d.time.length - 1]);

   return  Math.max(...lastValues);
}