
import {InitDevice} from './sensor.js' 

var selectPort = document.querySelector('.select');
var button = document.querySelector('.button');

const MaxBufferLength = 10;

var reader;
var writer;
var buffer = [];

function connectListener(e)
{
  console.log(`${e} подключился!`);
}

function disconnectListener(e)
{
  console.log(`${e} отключился!`);
}
  

document.getElementById('button').addEventListener('click', () => {
  if (navigator.serial) {
    connectSerial();
  } else {
    alert('Web Serial API not supported.');
  }
});
  

  function GetBytes(count)
  {
      if (buffer.length < count)
      {
        var length = buffer.length - 1;
        var deleted = buffer.splice(0, length);
        return {bytes : deleted, count : length};
      }
      else
      {
        var deleted = buffer.splice(0, count);
        return {bytes : deleted, count : count};
      }
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

      InitDevice(GetBytes, WriteBytes);

      serialReader();
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async function  serialReader()
  {
    try
    {
      while (true) {
        const { value, done } = await reader.read()

        if (value) {
          buffer.push(value);
          console.log(value);
        }
        if (done) {
          console.log('[readLoop] DONE', done);
          reader.releaseLock();
          break;
        }
      }
    } 
    catch (error) {
    console.log(error);
    }
    finally {}
  }

  function WriteBytes(bytes)
  {
    if (writer)
    {
      writer.write(bytes)
    }
  }


  function PushValueToBuffer(value)
  {
    if(values.length > MaxBufferLength)
    {
      values.shift();
    }

    values.push(value);
  }
