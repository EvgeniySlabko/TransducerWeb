
import { saveStaticDataToFile } from "./FileWorking/FileWork";
import { recordController, sensorService, viewController } from "./main";
import { Snapshot } from "./ReportListener/Snapshot";
import { Facker } from "./Sensor/SingleComponentSensor.ts/FackerSensor";
import { SensorController } from "./SensorController";
import { CreateSerialSensor } from "./SensorFactory";


var starthandler = async () =>
{
    await viewController?.StartAll();
    startStopButton.innerText = "Stop";
    startStop = true;
}

var stophandler = async () =>
{
  await viewController?.StopAll();
  startStopButton.innerText = "Start";
  startStop = false;
}

var startRecordingHandler = () =>
{
    let channels = viewController.GetExistsChannels();
    recordController.StartListening(channels);
    startRecordingButton.innerText = "Recording";
    recording = true;
}

var stopRecordingHandler = async () =>
{
  var snapshot = recordController.StopListening();
  startRecordingButton.innerText = "Rec";
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
        viewController.UploadSnapshot(snapshot);
      }
    } 
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  });

  var startStop: boolean = false;
  var recording: boolean = false;
  var startStopButton = <HTMLElement>document.getElementById('Start');
  var startRecordingButton = <HTMLElement>document.getElementById('StartRec');
  

  

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
  
  