import { ViewController as PlotViewController } from "./ViewsControllers/PlotViewController";
import { RecordController } from "./RecordController";
import { SensorController, SensorControllerArgs } from "./SensorController";
import { SensorPanelControllers as SensorPanelViewControllers } from './ViewsControllers/SensorsPannelController';
import { DataCells } from './ViewsControllers/DataCells';


// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

// График
export var plotViewController : PlotViewController;
// Левая нижняя панель с датчиками
//export var sensorPanelController: SensorPanelViewControllers;
// Панель ячеек с данными.
//export var cellsDataController: DataCellsController;


export var recordController : RecordController = new RecordController();




window.onload = async function()
{
  // Создаем UI компоненты
  //plotViewController = new PlotViewController(<HTMLElement>document.getElementById('gd'));
  /*
  let cellsContainer = <HTMLElement>document.getElementById("cell-container");
  cellsDataController = new DataCellsController(<any>cellsContainer);
  
  
  let sensorContainer = <HTMLElement>document.getElementById("sensor-container");
  sensorPanelController = new SensorPanelViewControllers(sensorContainer);


  sensorService.onDispatch.addListener("Add", async (args: SensorControllerArgs) => 
  {
    let plotChannels = CreateAllSensorPlotChannels(args.sensor, args.fullSensorInfo);
    let cellChannels = CreateAllSensorCellChannels(args.sensor, args.fullSensorInfo);
    

    
    sensorPanelController.AddSensorHandler(
      {
        sensor: args.sensor,
        info: args.fullSensorInfo,
      }
      );
      

    cellsDataController.PushChannels(cellChannels);
    plotViewController.AddChannels(plotChannels);
  });
  
  
  sensorPanelController.onSensorClose.sub((panel, args) =>{
    sensorService.RemoveSensor(args.sensor);
  })
  */
}