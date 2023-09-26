import React, { HTMLAttributes } from "react";
import styles from "./MenuItem.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    label: string;
}

export const MenuItem = ({children, label, ...rest}: Props) => {
    return (
        <>
            <div {...rest} className={styles.menu_item}>
                <label className={styles.menu_item_label}>{label}</label>

                <div className={styles.menu_item_children}>
              
                        {children}
           
                </div>
            </div>
        </>
    );
    
}
