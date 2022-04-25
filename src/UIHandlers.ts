
import { myUplot, viewController } from "./main";
import { CreateSerialSensor } from "./SensorFactory";




document.getElementById('open')?.addEventListener('click', async () => {
    try
    {
        let port = await navigator.serial.requestPort();    //запрашиваем выбор порта у пользователя
        var sensor = await CreateSerialSensor(port);
        await viewController.AddSensor(sensor);
    }
    catch(error)
    {
      console.log(error)  
    }
    finally
    {
        
    }
  });
 
  document.getElementById('Sync')?.addEventListener('click', async () => {
    viewController?.rrr();
  });

  document.getElementById('Start')?.addEventListener('click', async () => {
    viewController?.StartAll();
  });
  
  document.getElementById('Stop')?.addEventListener('click', async () => {
    viewController?.StopAll();
  });

  document.getElementById('removeDataset')?.addEventListener('click', async () => {
    viewController.hide();
});
document.getElementById('Center')?.addEventListener('click', async () => {
  myUplot.SetDefault();
});
  