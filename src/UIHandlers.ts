
import { saveStaticDataToFile } from "./FileWorking/FileWork";
import { recordController, sensorService, viewController } from "./main";
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
  await viewController.StopAll();
  startStopButton.innerText = "Start";
  startStop = false;
}

var startRecordingHandler = async () =>
{
    recordController.StartListening(viewController.GetExistsChannels());
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

/*
  document.getElementById('drop_zone')?.addEventListener('drop', async (ev: DragEvent) => {

  ev.preventDefault();
    

  if (ev.dataTransfer?.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file?.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
  });
*/
  document.getElementById('drop_zone')?.addEventListener('dragover', async (ev: any) => {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  });
 
  var startStop: boolean = false;
  var recording: boolean = false;
  var startStopButton = <HTMLElement>document.getElementById('Start');
  var startRecordingButton = <HTMLElement>document.getElementById('StartRec');
  
  startRecordingButton.addEventListener('click', async () => {
    recording ? await stopRecordingHandler() : await startRecordingHandler();
  });

  startStopButton.addEventListener('click', async (event) => {
    startStop ? await stophandler() : await starthandler();
  });
  
  