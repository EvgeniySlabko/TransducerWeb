export function AxeRangeChangeHandler(range: number[], dy: number)
{
    let curRangeVal = range[1] - range[0];

    //вычисляем относительное смещение 
    let dVal = curRangeVal * dy;

    range[0] += dVal;
    range[1] += dVal;
}

export function AxeWheelChangeHandler(range: number[], dy: number)
{
    let curRangeVal = range[1] - range[0];

    //вычисляем относительное смещение 
    let dVal = curRangeVal * dy;

    range[0] += dVal;
    range[1] += dVal;
}