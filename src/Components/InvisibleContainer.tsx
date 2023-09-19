import React from "react";
import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement>{
    visible: boolean;
}

export const InvisibleContainer = ({visible, children, ...rest}: Props) => {
    return <>{visible && children ? children : <></>}</>    
}