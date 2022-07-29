import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";

//TO DO использоваь SensorWorker вместо ISingleComponentSensor
export async function GetMinAvgFactor(sensors: ISingleComponentSensor[]) : Promise<number> {
    if (sensors.length == 0) throw "No sensors";
    let avgFactors: number[] = [];

    for (let i = 0; i < sensors.length; i++) {
        
        let regs = await sensors[i].GetHoldingRegisters();
        avgFactors.push(regs.AverageRatio);     
    }

    return Math.min(...avgFactors);
}