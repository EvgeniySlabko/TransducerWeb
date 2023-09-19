import { SaveOutlined } from "@ant-design/icons";
import { Button, Collapse, Input } from "antd";
import React, { useState } from "react";
import styles from "./Components.module.scss"

export interface Props {
    label: string;
    placeHolder: string;
    defaultName?: string;
    download: (fileName: string) => void;
}

export const SaveModalItem = ({label, placeHolder, defaultName, download} : Props) => {

    const [reportNameState, setReportNameState] = useState("Report.txt");
    
    return (
        <div className={`${styles.vertical_flex} ${styles.padding_10}`}>
            <label className={`${styles.vertical_flex} ${styles.vertical_align}`}>{label}</label>
            <div className={styles.flex}>
                <Input className={styles.padding_10} 
                        style={{ height: "32px" }} 
                        defaultValue={defaultName ? defaultName : "Report.txt"} 
                        onChange={(e) => setReportNameState(e.target.value)} 
                        placeholder={placeHolder} />

                <Button onClick={() => download(reportNameState)} icon={<SaveOutlined />} />
            </div>
        </div>
    );
}
