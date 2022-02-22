
var selectPort = document.querySelector('.select');
var button = document.querySelector('.button');

navigator.serial.addEventListener('connect', (e) => {
    // Connect to `e.target` or add it to a list of available ports.
  });
  
  navigator.serial.addEventListener('disconnect', (e) => {
    // Remove `e.target` from the list of available ports.
  });

  navigator.serial.getPorts().then((ports) => {
      console.log(ports);
    // Initialize the list of available ports with `ports` on page load.
  });
  

  document.getElementById('button').addEventListener('click', () => {
    if (navigator.serial) {
      connectSerial();
    } else {
      alert('Web Serial API not supported.');
    }
  });
  

  async function connectSerial() {
    //const log = document.getElementById('target');
      
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      
      const decoder = new TextDecoderStream();
      
      port.readable.pipeTo(decoder.writable);
  
      const inputStream = decoder.readable;
      const reader = inputStream.getReader();
      
      while (true) {
        const { value, done } = await reader.read();
        if (value) {
          console.log(value);
        }
        if (done) {
          console.log('[readLoop] DONE', done);
          reader.releaseLock();
          break;
        }
      }
    
    } catch (error) {
      console.log(error);
    }
  }
