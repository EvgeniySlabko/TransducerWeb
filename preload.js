// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld( 'electronApi', {
    getDevices: () => ipcRenderer.invoke("getDevices"),
    openDevice: (vendorId, productId) => ipcRenderer.invoke("openDevice", vendorId, productId),
    
    handleDevices: (callable) => ipcRenderer.on('devices-updated', callable),

    handleDeviceClosed: (callable) => ipcRenderer.on('devices-closed', callable),
    handleDeviceOpened: (callable) => ipcRenderer.on('device-opened', callable),

    transferIn: (vendorId, productId, endpointNumber, length) => ipcRenderer.invoke("transferIn", vendorId, productId, endpointNumber, length),
    transferOut: (vendorId, productId, endpointNumber, data) => ipcRenderer.invoke("transferOut", vendorId, productId, endpointNumber, data),
})