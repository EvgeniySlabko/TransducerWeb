import { WebUSBDevice } from "usb";

export declare global {
    interface Window { electronApi: ElectronApi; }
}

window.electronApi = window.electronApi || {};

export interface ElectronApi
{
    getDevices: () => Promise<Device[]>
    openDevice: (vendorId: number, productId: number) => Promise<void>
    handleDeviceClosed: (handler: (vendorId: number, productId: number) => void) => void
    handleDevices: (callable) => void
    handleDeviceOpened: (callable) => void

    transferIn: (vendorId: number, productId: number, endpointNumber: number, length: number) => Promise<Uint8Array[]>;
    transferOut: (vendorId: number, productId: number, endpointNumber: number, data: Uint8Array) => Promise<USBOutTransferResult>;
    close: (vendorId: number, productId: number) => Promise<void>;
    open: (vendorId: number, productId: number) => Promise<void>;
    send(channel: string, data: any)
}