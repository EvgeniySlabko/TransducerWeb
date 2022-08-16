export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function CalculatePower(speed: number, torque: number): number {
    return (torque * 2 * Math.PI * speed) / 60;
}

export function GetRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const comparingAccuracy = 0.000001;
export function Equals(value1: number, value2: number): boolean {
    return value1 < value2 + comparingAccuracy && value1 > value2 - comparingAccuracy;
}

export function groupBy<T, K>(arr: T[], keySelector: (el: T) => K): [K, T[]][] {
    let result = new Array<[K, T[]]>();
    arr.forEach((el) => {
        let key = keySelector(el);
        let index = result.findIndex((r) => r[0] === key);
        if (index != -1) result[index][1].push(el);
        else result.push([key, [el]]);
    });

    return result;
}

export function AsShortArray(data: Uint8Array, littleEndian = true): number[] {
    let view = new DataView(data.buffer);
    let registers: number[] = [];
    for (let i = 0; i < data.length / 2; i++) {
        registers.push(view.getUint16(i * 2, littleEndian));
    }

    return registers;
}
