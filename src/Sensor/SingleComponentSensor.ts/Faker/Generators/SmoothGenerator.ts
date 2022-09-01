import { GetRandomInt } from "../../../../Common/Common";
import { IGenerator } from "./IGeneraot";

export class SmoothGenerator implements IGenerator {
    private count: number = 0;
    private lastVal: number = Math.random();
    private cm: number = GetRandomInt(30);
    constructor(smoothFactor: number) {}

    GenerateNext(n: number): number[] {
        let arr = new Array<number>(n);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.Rand();
        }

        return arr;
    }

    private Rand = (): number => {
        if (this.count++ > this.cm + 30) {
            this.count = 0;
            if (this.lastVal > 1) this.lastVal = 0;
            else this.lastVal += 0.04;
        }

        return this.lastVal;
    };
}
