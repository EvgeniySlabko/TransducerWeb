import { Button, Checkbox, Divider, InputNumber, Space } from "antd";
import React from "react";
import { MenuItem } from "./MenuItem";
import { Group } from "../store/groupsSlice";
import { SensorWorker } from "../Sensor/SensorWorker";
import styles from "./Components.module.scss";

export type ChannelVisible = {
    channelId: string;
    name: string;
    visible: boolean
}
export interface Props {
    group: Group;
    tareAccuracy: number;

    trackMaximum: boolean;
    avgRatio: number;
    speedPeriod: number;
    externalSpeedSensor: boolean;
    offset: number;
    absolute: boolean;
    invertion: boolean;
    visibleChannels: ChannelVisible[];
    minAvgRatio: number;

    onOffsetChanged: (value: number) => void;
    onExternalSpeedSensorChanged: (value: boolean) => void;
    onTrackMaximumChanged: (value: boolean) => void;
    onSpeedPeriodChanged: (value: number) => void;
    onVisibleChannelsChanged: (channelId: string, value: boolean) => void;
    onAvgChanged: (value: number) => void;
    onInvertionChanged: (value: boolean) => void;
    onAbsoluteChanged: (value: boolean) => void;
}

export const SensorParameters = (props: Props) => {

    return (
        <>
            <Space size={"small"}>
                {props.visibleChannels.map((vc, i) => (
                    <Checkbox 
                        key={i} 
                        defaultChecked={vc.visible} 
                        onChange={(e) => props.onVisibleChannelsChanged(vc.channelId, e.target.checked)}>
                        {vc.name}{" "}
                    </Checkbox>
                ))}
            </Space>

            <Divider type="horizontal" />
            <MenuItem label="Период измерения скорости(мс):" 
                        children={<InputNumber className={styles.vertical_align}
                                                min={1}
                                                max={5000} 
                                                step={1} 
                                                size="small" 
                                                style={{ height: "25px" }} 
                                                defaultValue={props.speedPeriod} 
                                                onChange={n => props.onSpeedPeriodChanged(n!)} />} />

            <MenuItem label="Коэффицент усреднения:" 
                        children={<InputNumber className={styles.vertical_align}
                                                min={props.minAvgRatio} 
                                                max={5000} 
                                                step={1} 
                                                size="small" 
                                                style={{ height: "25px" }} 
                                                defaultValue={props.avgRatio} 
                                                onChange={(n) => props.onAvgChanged(n!)} />} />

            <MenuItem label="Внешний датчик скорости:" 
                        children={<Checkbox checked={props.externalSpeedSensor} 
                                            onChange={c => props.onExternalSpeedSensorChanged(c.target.checked)} />} />

            <MenuItem label="Отслеживать максимум:" 
                        children={<Checkbox checked={props.trackMaximum} 
                                            onChange={c => props.onTrackMaximumChanged(c.target.checked)} />} />

            <MenuItem label="Инвертировать основную величину:" 
                        children={<Checkbox checked={props.invertion} 
                                            onChange={c => props.onInvertionChanged(c.target.checked)} />} />

            <MenuItem label="Абсолютное значение:" 
                        children={<Checkbox checked={props.absolute} 
                                            onChange={c => props.onAbsoluteChanged(c.target.checked)} />} />

            <MenuItem
                label="Тара:"
                children={
                    <div className={styles.baseline}>
                        <Button size="small" onClick={() => props.onOffsetChanged(0)}>
                            Сбросить
                        </Button>
                        <p className={styles.tare}>{props.offset.toFixed(props.tareAccuracy)}</p>
                    </div>
                }
            />
        </>
    )
}