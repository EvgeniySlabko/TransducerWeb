import React, { HTMLAttributes } from "react";
import styles from "./Components.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    fontColor: string;
    fontSize: number;
}

export const CellValue = ({value, fontSize, fontColor, ...rest}: Props) => {
    return(
        <div {...rest}>
            <div className={styles.horizontal_flex}>
                <div
                    className={styles.cell_value}
                    style={{
                        color: fontColor,
                        fontSize: `${fontSize.toString()}px`,
                    }}>
                    {value}
                </div>
            </div>
        </div>
    )
}
