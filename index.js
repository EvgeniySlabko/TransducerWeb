const { app, BrowserWindow, ipcMain } = require('electron');
const usb = require('usb');
const WebUSB = require('usb');
const path = require('path');
var async = require('async');
var CircularBuffer = require("circular-buffer");
const { RingBuffer } = require('ring-buffer-ts');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const webusb = new usb.WebUSB({
  allowAllDevices: true
});

let devices = [];

let openedDevices = new Map();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  let counter = 0;
  //const ping = () => console.log(counter++)
  //const interval = setInterval(ping, 500); 

  async function sendDevices() {
    mainWindow.webContents.send('devices-updated', devices);
    console.log(devices);
  }

  async function sendDeviceClosed(device) {
    mainWindow.webContents.send('device-closed', device.vendorId, device.productId);
  }

  async function sendDeviceConnected(device) {
    mainWindow.webContents.send('device-connected', device.vendorId, device.productId);
  }
  
  ipcMain.handle("getDevices", async (event, args) => {
    devices = await webusb.getDevices();
    await sendDevices();
  });

  ipcMain.handle("transferOut", async (event, vendorId, productId, endpointNumber, data) => {
    const device = devices.find(d => d.vendorId == vendorId && d.productId == productId);
    await device?.transferOut(endpointNumber, data)
  });

  ipcMain.handle("openDevice", async (event, vendorId, productId) => {
    try
    {
      const device = devices.find(d => d.vendorId == vendorId && d.productId == productId);
      await device?.open()
      await device?.selectConfiguration(1);
      await device?.claimInterface(0); 
      openedDevices.set(vendorId + productId, {reader: new UsbReadingWrapper(device)});
    }
    catch(ex)
    {
      console.log(ex)
    }
  });

  ipcMain.handle("transferIn", async (event, vendorId, productId, endpointNumber, length) => {
    const context = openedDevices.get(vendorId + productId);
    if (context)
    {
      const result = await context.reader.Read();
      return result;
    }

    throw "device is not opened"
  });

  ipcMain.handle("device-opened", async (event, args) => {
    const device = devices.find(d => d.vendorId == args.vendorId && d.productId == args.productId);
    await device?.open();
    await device?.selectConfiguration(1);
    await device?.claimInterface(0); 

    mainWindow.webContents.send('device-opened', device);
  });
  
  webusb.addEventListener("disconnect", (event) =>{
    const key = event.vendorId + event.productId
    if (openedDevices.has(key))
        openedDevices.delete(key);

    sendDeviceClosed(event.device); 
  })

  webusb.addEventListener("connect", (event) =>{
    sendDeviceConnected(event.device); 
  })

  if (!process.env.SOURCE)
  {
    mainWindow.loadURL(path.join(__dirname, "dist/index.html"));
  }
  else
    mainWindow.loadURL(process.env.SOURCE);


  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
class UsbReadingWrapper
{
  device;
  buffer;
  constructor(device)
  {
    this.buffer = new CircularBuffer(2000);
    this.device = device
    this.readInternal().then();
  }

  async readInternal()
  {
    try{
      const result = await this.device.transferIn(1, 10000);
      if (result.status === "ok"){
          if (result.data?.byteLength != 0){
              this.buffer.enq(new Uint8Array(result.data.buffer));
          }
      }

      sleep(10);
      await this.readInternal();

      }
      catch(e)
      {
        throw e;
      }
   
      sleep(1);
  }

  async Read() {
    while(true)
    {
        let bufferLength = this.buffer.size();
        if (bufferLength > 0){
            //console.log(bufferLength);
            let data = this.buffer.toarray();
            this.buffer = new CircularBuffer(2000); 
            return data;
        }

        await sleep(10);
    }
  }
}