import { SensorWorker } from "../Sensor/SensorWorker";

export async function GetMinAvgFactor(sensors: SensorWorker[]): Promise<number> {
    console.debug("Getting  min avg ratio.");
    if (sensors.length === 0) throw "No sensors";
    let avgFactors: number[] = [];

    try
    {
        for (let i = 0; i < sensors.length; i++) {
            let regs = await sensors[i].GetHoldingRegisters();
            avgFactors.push(regs.AverageRatio);
        }
    }
    catch(ex){
        console.warn("Error while getting holdingRegisters");
        throw ex;
    }

    return Math.min(...avgFactors);
}
