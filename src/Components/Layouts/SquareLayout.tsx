import Split from "@uiw/react-split";
import React from "react";
import { HTMLAttributes } from "react";
import { InvisibleContainer } from "../InvisibleContainer";
import styles from "./SquareLayot.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    childrens: React.ReactNode[]
}

export const SquareLayout = ({childrens}: Props) =>{
  return (
    <>
        <InvisibleContainer visible={childrens.length === 1}>
            {childrens[0]}
        </InvisibleContainer>

        <InvisibleContainer visible={childrens.length === 2}>
            <Split mode="vertical" className={styles.split}>
                { childrens }
            </Split>
        </InvisibleContainer>

        <InvisibleContainer visible={childrens.length === 3}>
            <Split mode="horizontal" className={styles.split}>
                <Split mode="vertical" style={{width: "50%"}}>
                    <div style={{height: "50%"}}>
                        {childrens[0]}
                    </div>
                    <div style={{height: "50%"}}>
                        {childrens[1]}
                    </div>
          
                </Split>
                
                <div style={{width: "50%"}}>
                    {childrens[2]}
                </div>
                

            </Split>
        </InvisibleContainer>

        <InvisibleContainer visible={childrens.length === 4}>

            <Split mode="horizontal" className={styles.split}>
                <Split mode="vertical" style={{width: "50%"}}>
                    <div style={{height: "50%"}}>
                        {childrens[0]}
                    </div>
                    <div style={{height: "50%"}}>
                        {childrens[1]}
                    </div>
                </Split>
                <Split mode="vertical" style={{width: "50%"}}>
                    <div style={{height: "50%"}}>
                        {childrens[2]}
                    </div>
                    <div style={{height: "50%"}}>
                        {childrens[3]}
                    </div>
                </Split>
            </Split>
        </InvisibleContainer>
    </>    
  );
};
