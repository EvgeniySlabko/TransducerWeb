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


export function GetApproximateValue(arr: (number | null | undefined)[], index: number, maxPoints: number) : number | undefined
{
    if (arr[index] != undefined && arr[index] != null)
        return <number>arr[index];

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
    } while((!arr[right] && !arr[left]) && curIter <= maxPoints);

    if (arr[left] != undefined)
        return <number>arr[left];

    if (arr[right] != undefined)
        return <number>arr[right];

    return undefined;
}

export function increase_brightness(hex: string, percent: number){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}