require('./css/styles.css');
import {connectSerial} from "./serial";
import {Sensor} from "./Sensor/sensor";
import * as Defs from "./Sensor/SensorDefinitions";
import SerialBufferedWorker from "./serialBuffer";
import {Plot} from "./Plot/plot";
import { CreateAllSensorChannels } from "./Channel/ChannelFactory";

var plot: Plot;
var sensor: Sensor;

document.getElementById('Start')?.addEventListener('click', async () => {
  if (sensor != null)
  {
    sensor.StartStreaming();
  }
});


document.getElementById('button')?.addEventListener('click', async () => {
  try
  {
    if (navigator.serial) {
            
      var serialWorker = await connectSerial();
      
      if (serialWorker != null)
      {
        let bufferedWorker = new SerialBufferedWorker(serialWorker, 100);
        sensor = new Sensor(bufferedWorker);

        await SubscribeSensor(sensor);
        
        await sensor.StartReading();
        await sensor.StartStreaming();
      }
      
      else {
      alert('Web Serial API not supported.');
      }
    }
  }
  catch(error)
  {
    console.log(error)
  }
  finally
  {

  }
});

function SubscribeSensor(sensor: Sensor)
{
  var channels = CreateAllSensorChannels(sensor);
  channels.forEach(async (channel) =>
  {
    await channel.AttachToPlot(plot);
  });
}

document.getElementById('Sync')?.addEventListener('click', async () => {
  if (sensor != null)
  {
    sensor.SynchronizeCurrentTime();
  }
});

document.getElementById('Stop')?.addEventListener('click', async () => {
  if (sensor != null)
  {
    sensor.StopStreaming();
  }
});

  
  window.onload = async function()
  {
    var element = <HTMLElement>document.getElementById('gd');
    plot = new Plot(element);
    await plot.DrawPlot();
  }

  window.addEventListener("resize", function() {
    //plot.Uppdate();
  });