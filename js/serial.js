
import {InitDevice} from './sensor.js';
import {RingBuffer} from './Buffer.js';

var reader;
var writer;
var buffer = new RingBuffer(512);
var intervalId;

function connectListener(e)
{
  //console.log(`${e} подключился!`);
}

function disconnectListener(e)
{
  //console.log(`${e} отключился!`);
}
  

document.getElementById('button').addEventListener('click', () => {
  if (navigator.serial) {
    connectSerial();
  } else {
    alert('Web Serial API not supported.');
  }
});
  

  async function GetBytes(count)
  {

    for (let i = 0; i < 10; i++) {
      var result = await tryGetBytesRecursive(count, 0);
      if (result === null)
      {
        throw("No Data!");
      }

      return result;
    }
    /*
    return await new Promise((resolve, reject) =>
    {
      for (let i = 0; i < 10; i++) {
        var result = tryGetBytes(count);
        if (result === null)
        {
          setTimeout(10);
          continue;
        }

        resolve(result);
      }

      reject();
    });
    */
  }

async function tryGetBytesRecursive(count, tries)
{
  if (tries > 10)
  {
    return null;
  }

  if (buffer.dataBytes >= count)
  {
    var data = new  Uint8Array(count);
      for (let i = 0; i < count; i++) {
        data[i] = buffer.pop();
      }

      return data
  }

  await timeout(1);
  return tryGetBytesRecursive(count, tries + 1);
}

  export 
  {
    GetBytes as GetBytes,
    WriteBytes as WriteBytes,
  }

  async function connectSerial() {
    //const log = document.getElementById('target');
      
    try {
      const port = await navigator.serial.requestPort();
      await port.open(
        {
          baudRate: 115200,
          bufferSize : 1024,
          dataBits : 8,
          flowControl :"none",
          parity : "none",
          stopBits : 1,
        });
      
      const decoder = new TextDecoderStream();
      
      port.addEventListener('connect', connectListener);
      port.addEventListener('disconnect', disconnectListener);

      reader = port.readable.getReader();
      writer = port.writable.getWriter();

      intervalId = setInterval(serialRead, 1);
      await InitDevice(GetBytes, WriteBytes);

    }
    catch(error)
    {
      console.log(error);
    }
  }

  function serialRead()
  {
    reader.read().then((value, done) =>
    {
      var len = value.value.length;
      //console.log(len);
      if (len != 0) {
        console.log("Read:", value);
        for (let i = 0; i < len; i++) {
          buffer.push(value.value[i]);
        }
      }
      if (done) {
        console.log('[readLoop] DONE', done);
        reader.releaseLock();
      }
    }).catch((error) =>{
      console.log(error);
    });
  }

  function WriteBytes(bytes)
  {
    if (writer)
    {
      writer.write(bytes)
    }
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
