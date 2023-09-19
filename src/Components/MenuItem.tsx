import { Collapse } from "antd";
import React, { HTMLAttributes } from "react";
import styles from "./Components.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    label: string;
}

export const MenuItem = ({children, label}: Props) => {
    return (
        <>
            <div className={styles.flex}>
                <label className={`${styles.padding_10} ${styles.vertical_align}`}>{label}</label>
                <div className={`${styles.padding_10} ${styles.horizontal_flex}`} style={{ marginLeft: "auto", order: 2 }}>
                    {children}
                </div>
            </div>
        </>
    );
    
}
