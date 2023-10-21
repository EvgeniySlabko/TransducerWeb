import { Checkbox, Modal } from "antd";
import React, { HTMLAttributes, useState } from "react";
import usb, { WebUSBDevice } from "usb"
import { MenuItem } from "./MenuItem";

export interface Props extends HTMLAttributes<HTMLDivElement> {
    visible: boolean,
    devices: WebUSBDevice[],
    onClose: (device: usb.WebUSBDevice | undefined) => void
}

export const UsbSelector = ({devices, onClose, visible} : Props) => {

    const [device, setDevice] = useState<WebUSBDevice | undefined>();
    
    return (
        <Modal
            title="Usb устройства"
            onOk={() => {
                onClose(device)
            }}
            onCancel={() => onClose(undefined)}
            okText={"Выбрать"}
            cancelText={"Отмена"}
            centered={false}
            open={visible}
        >
            {
                devices.map(x =>
                    <MenuItem label={x.productName ?? ""} key={x.vendorId}>
                        <Checkbox
                            value={device}
                            checked={device === x} 
                            onChange={() => setDevice(x)} >  
                        </Checkbox>
                    </MenuItem>
                )
            }
        </Modal>
    )
}
