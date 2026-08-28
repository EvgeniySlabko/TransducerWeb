import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { CeateSensorWorker } from "../Sensor/WebSensorFactory";
import { SensorWorker } from "../Sensor/SensorWorker";
import { DecoderType, setDecoderType, toggleSensorScreenModal } from "../store/uiSlice";
import { useAppDispatch, useAppSelector, useSensorsService } from "../hooks/hook";
import { ConnectionSettings } from "../Components/ConnectionSettings";
import { InvisibleContainer } from "../Components/InvisibleContainer";
import { Device, WebUSBDevice } from "usb";
import { UsbSelector } from "../Components/UsbSelector";
import { CeateUsbNativeSensorWorker } from "../Sensor/NativeSensorFactory";


const { Option } = Select;



export interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const AddSensor = ({...rest}: Props) => {
    const [sensorService] = useSensorsService();
    const [usbDevices, setUsbDevices] = useState<WebUSBDevice[]>([]);
    const [showDevicesSelector, setShowDevicesSelector] = useState<boolean>(false);

    const onDeviceSelected = async (webUsbDevice: WebUSBDevice) =>{
        //window.electronApi?.handleDevices((e: any, args: WebUSBDevice[]) =>{
        //    setUsbDevices(args)
        //})

        try {
            if (webUsbDevice){
                await window.electronApi?.openDevice(webUsbDevice.vendorId, webUsbDevice.productId);
                const sensorWorker = CeateUsbNativeSensorWorker(webUsbDevice);
                await sensorService.AddSensor(sensorWorker);
            }
        } catch(ex) {
            console.warn("Failed to create SensorWorker.", ex);
            return;
        }

        setShowDevicesSelector(false)
    }

    useEffect(() => {
        window.electronApi?.handleDevices((e: any, args: WebUSBDevice[]) =>{
            setUsbDevices(args)
        })

        window.electronApi?.handleDeviceOpened(async (e: any, device: WebUSBDevice) =>{
            try {
                const sensorWorker = await CeateUsbNativeSensorWorker(device);
                await sensorService.AddSensor(sensorWorker);
            } catch(ex) {
                console.warn("Failed to create SensorWorker.", ex);
                return;
            }
        })

        return () => {}
    }, []);

    console.log(process.env.ENV == "ELECTRON")
    {
        console.log("ELECTRON app")
    }
    //const version = window.electron
    
    const {showSensorsSettings, streaming, viewingReport, selectedDecoderType } = useAppSelector(state => state.ui);
    const enabled = useMemo(() => !(streaming || viewingReport), [streaming, viewingReport]);
    
    const dispatch = useAppDispatch();
    
    const getDevicesNative = async () => {
        await window.electronApi?.getDevices();
        setShowDevicesSelector(true);
    }

    const handleAddWeb = async () => {
        let sensorWorker: SensorWorker;
        try {
            sensorWorker = await CeateSensorWorker(selectedDecoderType);
        } catch(ex) {
            console.warn("Failed to create SensorWorker.", ex);
            return;
        }

        try {
            await sensorService.AddSensor(sensorWorker);
        } catch(ex) {
            console.warn("Failed to add sensor.", ex);
        }
    }

    const onSelect = (decoderType: DecoderType) => dispatch(setDecoderType(decoderType))
    
    const onSettingsClick = () => dispatch(toggleSensorScreenModal())

    const handleAddClick = async () =>{
        console.log(process.env);
        if (process.env.ENV == "WEB")
        await handleAddWeb();
            else
        await getDevicesNative();
    }       

    return (
        <div {...rest}>
            <Select defaultValue={selectedDecoderType} 
                    size={"large"}
                    style={{ width: 100 }}
                    onChange={onSelect} 
                    disabled={!enabled}>
                <Option value="VCOM">VCOM</Option>
                <Option value="RS485">RS485</Option>
                <Option value="USB">USB</Option>
                <Option value="Faker">Faker</Option>
            </Select>
            <Button title="Настройки."
                    disabled={!enabled} 
                    size="large" 
                    id="settings"
                    shape="default"
                    icon={<SettingOutlined />} 
                    onClick={onSettingsClick} />

            <Button title="Добавить датчик. (A)"
                    disabled={!enabled}
                    size="large"
                    id="open"
                    shape="default"
                    icon={<PlusCircleOutlined />}
                    onClick={handleAddClick} />

            <InvisibleContainer visible={showSensorsSettings}>
                <ConnectionSettings/>
            </InvisibleContainer>

            <UsbSelector 
                devices={usbDevices}
                onClose={(d) => onDeviceSelected(d!)}
                visible={showDevicesSelector}
            ></UsbSelector>
        </div>
    );
}

