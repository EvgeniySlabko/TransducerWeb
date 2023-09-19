import { InputNumber } from "antd";
import React from "react";
import { ADCFrequency } from "../Sensor/SingleComponentSensor.ts/SingleComponentSensorBase";
import { MenuItem } from "./MenuItem";
import styles from "./Components.module.scss"

export interface Props {
    pointsPerSecond: number;
    pointsPerSecondChanged: (value: number) => void;
}

export const PlotSettings = ({pointsPerSecond, pointsPerSecondChanged}: Props) => {
    const onPointsPerSecondChanged = (value: number) =>{
        pointsPerSecondChanged(value);
    }

    return (<MenuItem 
    label="Максимальное число точек в секунду на графике:" 
    children={<InputNumber className={styles.vertical_align} 
                            min={50} 
                            max={ADCFrequency} 
                            step={1} 
                            size="small" 
                            defaultValue={pointsPerSecond} 
    onChange={num => onPointsPerSecondChanged(num!)} />} />)
}
