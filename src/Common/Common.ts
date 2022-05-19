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