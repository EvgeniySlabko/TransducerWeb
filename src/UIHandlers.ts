import { viewController } from "./main";
import { CreateSerialSensor } from "./SensorFactory";




document.getElementById('open')?.addEventListener('click', async () => {
    try
    {
        let port = await navigator.serial.requestPort();    //запрашиваем выбор порта у пользователя
        var sensor = await CreateSerialSensor(port);
        await viewController.AddSensor(sensor);
        await viewController.SyncTime();
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
      viewController?.StartStreaming();
  });

  
  
    
  