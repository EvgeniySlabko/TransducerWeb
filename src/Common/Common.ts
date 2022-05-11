export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function CalculatePower(speed: number, torque: number) : number {
    return  torque * 2 *Math.PI * speed /60;
}