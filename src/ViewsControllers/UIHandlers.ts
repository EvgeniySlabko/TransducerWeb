import { recordController, sensorService, plotViewController } from "../main";
import { Snapshot } from "../ReportListener/Snapshot";
import { Facker } from "../Sensor/SingleComponentSensor.ts/FackerSensor";
import { SensorController } from "../SensorController";
import { CreateSerialSensor } from "../SensorFactory";

var startStop: boolean = false;
var recording: boolean = false;
var startStopButton = <HTMLElement>document.getElementById('Start');
var startRecordingButton = <HTMLElement>document.getElementById('StartRec');
var fileInput = <HTMLElement>document.getElementById('file-input');
var fileInputButton = <HTMLElement>document.getElementById('file-input-button');

fileInputButton.addEventListener('click', function() {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = async () => {

    if(input.files && input.files?.length != 1) return;
    let file = input.files?.item(0);
    if (!file) return;
    
    var snapshot = new Snapshot();
    await snapshot.FromFile(file);
    plotViewController.UploadSnapshot(snapshot);
            
  };

  input.click();
});

var starthandler = async () =>
{
    let started = await sensorService.StartAll();
    if (!started) return;
    document.getElementById("StartStopSpan")?.classList.remove('glyphicon-play');
    document.getElementById("StartStopSpan")?.classList.add('glyphicon-pause');
    //document.getElementById("MyElement").classList.remove('MyClass');
    startStop = true;
}

var stophandler = async () =>
{
  document.getElementById("StartStopSpan")?.classList.remove('glyphicon-pause');
  document.getElementById("StartStopSpan")?.classList.add('glyphicon-play');
  await sensorService.StopAll();
  //setTimeout(async () =>{plotViewController.Clear()}, 500);
  
  startStop = false;
}

var startRecordingHandler = () =>
{
    let channels = plotViewController.GetExistsChannels();
    recordController.StartListening(channels);
    startRecordingButton.classList.remove("text-primary");
    startRecordingButton.classList.add("text-danger");
    recording = true;
}

var stopRecordingHandler = async () =>
{
  var snapshot = recordController.StopListening();
  startRecordingButton.classList.remove("text-danger");
    startRecordingButton.classList.add("text-primary");
  recording = false;

  snapshot.ToFile();
  //saveStaticDataToFile(snapshot);
}

document.getElementById('open')?.addEventListener('click', async () => {
  try
  {
      let port = await navigator.serial.requestPort();    //запрашиваем выбор порта у пользователя
      var sensor = await CreateSerialSensor(port);
      await sensorService.AddSensor(sensor);
      //await starthandler();
  }
  catch(error)
  {
    console.log(error)  
  }
  finally
  {
  }
});

  document.getElementById('drop_zone')?.addEventListener('dragover', async (ev: any) => {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  });
 
  document.getElementById('drop_zone')?.addEventListener('drop', async (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer?.items && event.dataTransfer.items.length && event.dataTransfer.items[0].kind === 'file') {
      var file = event.dataTransfer.items[0].getAsFile();
      if(file)
      {
        var snapshot = new Snapshot();
        await snapshot.FromFile(file);
        plotViewController.UploadSnapshot(snapshot);
      }
    } 
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  });

  
  document.getElementById('Facker')?.addEventListener('click', async () => {
    let facker = new Facker();
    await sensorService.AddSensor(facker);
  });

  startRecordingButton.addEventListener('click', async (event) => {
    recording ? await stopRecordingHandler() : startRecordingHandler();
  });

  startStopButton.addEventListener('click', async (event) => {
    startStop ? await stophandler() : await starthandler();
  });
  
  