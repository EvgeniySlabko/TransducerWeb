import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";

export async function GetMinAvgFactor(sensors: ISingleComponentSensor[]) {
    let avgFactors = [1];

    sensors.forEach(async (s) => {
        try {
            let regs = await s.GetHoldingRegisters();
            avgFactors.push(regs.AverageRatio);
        }
        catch {
            console.log("Error while getting holding registers");
        }
    });

    return Math.min(...avgFactors);
}