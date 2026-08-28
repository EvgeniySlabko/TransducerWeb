import { Checkbox, Collapse, InputNumber, Select } from "antd";
import React from "react";
import { FilterType } from "../Storage/ChannelsDataStorage";
import { MenuItem } from "./MenuItem";
import styles from "./Components.module.scss";
const { Option } = Select;

export interface Props {
    enabled: boolean;
    fc: number;
    filterType: FilterType;
    order: number;

    onFilterEnabledChanged: (value: boolean) => void;
    onFilterFcChanged: (value: number) => void;
    onFilterTypeChanged: (value: FilterType) => void;
    onFilterOrderChanged: (value: number) => void;
}

export const FilterSettings = ({enabled, fc, filterType, order,
                                onFilterEnabledChanged, onFilterFcChanged, onFilterTypeChanged, onFilterOrderChanged} : Props) => {
    return (
        <>
            <MenuItem label="Фильтр нижних частот:" 
                      children={<Checkbox defaultChecked={enabled} 
                                          onChange={(c) => onFilterEnabledChanged(c.target.checked)}></Checkbox>} />

            {
                !enabled ? <></> : 
                <>
                    <MenuItem
                        children={
                            <Select defaultValue={filterType} style={{ width: 120 }} onChange={onFilterTypeChanged}>
                                <Option value="butterworth">Баттерворта</Option>
                                <Option value="bessel">Бесселя</Option>
                            </Select>
                        }
                        label="Тип фильтра:"
                    />

                    <MenuItem children={<InputNumber size="middle" 
                                                        step={1} 
                                                        min={1} 
                                                        max={12} 
                                                        defaultValue={order} 
                                                        onChange={n => onFilterOrderChanged(n!)} />} 
                                                        label="Порядок фильтра:" />

                    <MenuItem children={<InputNumber size="middle" 
                                                        step={0.1} 
                                                        min={0.1} 
                                                        max={20000} 
                                                        title="Частота среза" 
                                                        defaultValue={fc} 
                                                        onChange={(n) => onFilterFcChanged(n!)} />} 
                                                        label="Частота среза(Гц):" />
                </>
            }
        </>
    )
}
