
import {InitDevice} from './sensor.js' 
import {RingBuffer} from './Buffer.js';

var selectPort = document.querySelector('.select');
var button = document.querySelector('.button');

var reader;
var writer;
var buffer = new RingBuffer(100);

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
      var bytes = [];
      var actualBytes = 0;

      for (var i = 0; i < count; i++)
      {
        var value = buffer.pop();
        if (value != null){
            actualBytes++;
            bytes.push(value);
        }
        else {
          break;
        }
      }

      return {bytes : bytes, count : actualBytes}
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

      serialReader();
      await InitDevice(GetBytes, WriteBytes);

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

        if (value.length != 0) {
          //value.forEach(byte => 
            //{
              //buffer.push(byte);
              //console.log(byte);
              const event = new CustomEvent('serialData', {
                detail: {
                  data: value,
                }
              });

            document.dispatchEvent(event);
              
            //});
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


