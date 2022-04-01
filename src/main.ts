require('./css/styles.css');
require('./plot');
import {connectSerial, SerialWorker} from "./serial"
import {dataEventArgs, Sensor} from "./Sensor/sensor"
import SerialBufferedWorker from "./serialBuffer";

import {Plot} from "./Plot/plot";

//import * as Plotly from 'plotly.js';

var plot: Plot;
var sensor: Sensor;
//import  "plotly.js";
//import a from "./tss"

//import "https://cdn.plot.ly/plotly-2.11.1.min.js"
//import Plotly from "plotly.js";
//var Plotly = require('plotly.js/lib/index-basic.js');


///import { Plot } from "./plot";


//var time = new Date();
//var olderTime = time.setMinutes(time.getMinutes() - 1);
//var futureTime = time.setMinutes(time.getMinutes() + 1);




document.getElementById('Start')?.addEventListener('click', async () => {
  if (sensor != null)
  {
    sensor.StartStreaming();
  }
});

var traceId: any;
var traceId1: any;
var traceId2: any;
document.getElementById('button')?.addEventListener('click', async () => {
  try
  {
    if (navigator.serial) {
            
      var serialWorker = await connectSerial();
      
      if (serialWorker != null)
      {
        let bufferedWorker = new SerialBufferedWorker(serialWorker, 100);
        sensor = new Sensor(bufferedWorker);

        //traceId = await plot.AddTrace(new PlotTrace("y", "x"));
        //traceId1 = await plot.AddTrace(new PlotTrace("y2", "x2"));
        //traceId2 = await plot.AddTrace(new PlotTrace("y2"));

        SubscribeSensor(sensor);
        
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
  sensor.onTmp.sub(async (args: dataEventArgs)  => 
  {
    var time = new Date();

    var update = {
    x:  [[args.time]],
    y: [[args.data]]
    }

    plot.AddData(update, 0);
    //Plotly.extendTraces('gd', update, [0])

  });
  

  sensor.onSpeed.sub(async (args: dataEventArgs)  => 
  {
    var time = new Date();

    var update = {
    x:  [[args.time]],
    y: [[args.data]]
    }

    plot.AddData(update, 1);
  
    //Plotly.extendTraces('gd', update, [0])

  });

  sensor.onError.sub(async () =>{
    var time = new Date();
    /*
    var update = {
      x:  [[]],
      y: [[undefined]]
      }
*/
     // await plot.AddData(update, 2);
  });

  sensor.onData.sub(async (args: dataEventArgs)  => 
  {
    var time = new Date();

    var update = {
    x:  [[args.time]],
    y: [[args.data]]
    }

    plot.AddData(update, 2);
    
    //plot.AddData(update, traceId2);
    //Plotly.extendTraces('gd', update, [0])

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
      /*
      document.querySelector('gd')?.addEventListener('wheel', () =>
    {
      alert("1");
      var minuteView = {
        xaxis: {
        type: 'date',
        range: [olderTime + 1,futureTime + 1]
        }
      };

      Plotly.relayout('gd', minuteView);
    });
    */
    }
    
    window.addEventListener("resize", function() {
      //plot.Uppdate();
  });