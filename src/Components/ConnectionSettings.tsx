import React, {  } from "react";
import { DecoderType } from "../store/uiSlice";
import { RS485Settings } from "../Containers/Modals/RS485Settings";
import { VCOMSettings } from "../Containers/Modals/VComSettings";
import { useAppSelector } from "../hooks/hook";
import styles from "./Components.module.scss";

export interface Props {
    onClose: () => void;
    decoderType: DecoderType;
}

export const ConnectionSettings = () => {
    const selectedDecoderType = useAppSelector(state => state.ui.selectedDecoderType);

    let settings: React.JSX.Element;
    switch (selectedDecoderType) {
        case "RS485": {
            settings = <RS485Settings/>;
            break;
        }
        case "VCOM": {
            settings = <VCOMSettings/>;
            break;
        }
        default: settings = <></>
    }
    return(<>{settings}</>)
}
