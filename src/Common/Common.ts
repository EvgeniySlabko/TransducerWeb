export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function CalculatePower(speed: number, torque: number) : number {
    return  torque * 2 *Math.PI * speed /60;
}

export function hashCode(str: string): number {
    var h: number = 0;
    for (var i = 0; i < str.length; i++) {
        h += str.charCodeAt(i);
    }
    return h;
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }


export function GetApproximateValue(arr: number[], index: number, maxPoints: number)
{
    if (arr[index] != undefined)
        return index;

    
    let left = index;
    let right = index;
    let curIter = 0
    do
    {
        if (left != 0)
            left -=1;
        
        if (right != arr.length - 1)
            right += 1;
        
        curIter += 1;
    } while((arr[right] == undefined && arr[left] == undefined) && curIter <= maxPoints);

    if (arr[left] != undefined)
        return left;

    if (arr[right] != undefined)
        return right;

    return undefined;
}