import { GetRandomInt } from "../../../../Common/Common";
import { IGenerator } from "./IGeneraot";

export class SinGenerator implements IGenerator {
  private c: number = 1;
  private f: number = GetRandomInt(100) / 1000;
  private amp: number = Math.random();
  private ph: number = Math.random() * 10;
  constructor() {}

  GenerateNext(n: number): number[] {
    let arr = new Array<number>(n);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.sin(this.c++ * this.f + this.ph) * this.amp;
    }

    return arr;
  }
}
