import { SensorWorker } from "../Sensor/SensorWorker";

export async function GetMinAvgFactor(
  sensors: SensorWorker[]
): Promise<number> {
  if (sensors.length == 0) throw "No sensors";
  let avgFactors: number[] = [];

  for (let i = 0; i < sensors.length; i++) {
    let regs = await sensors[i].GetHoldingRegisters();
    avgFactors.push(regs.AverageRatio);
  }

  return Math.min(...avgFactors);
}
