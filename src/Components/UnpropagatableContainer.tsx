import React, { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement>{

}

export const UnpropagatableContainer = ({children}: Props) => {
    return(
        <div onClick={e => e.stopPropagation()}>
            {children}
        </div>
    )
}