require('../css/styles.css');
require('../css/cellStyles.css');
require('../bootstrap-5/css/bootstrap.min.css');
require('../bootstrap-5/js/bootstrap.bundle.min.js');

require('./ViewsControllers/UIHandlers');
require('./uPlot/uPlot');
require('../dist/uPlot.iife');
require('../dist/uPlot.min.css');

import 'bootstrap/dist/css/bootstrap.min.css';

import { MyUPlot } from "./uPlot/uPlot";
import { ViewController as PlotViewController } from "./ViewsControllers/PlotViewController";
import { RecordController } from "./RecordController";
import { SensorController, SensorControllerArgs } from "./SensorController";
import { SensorPanelControllers as SensorPanelViewControllers } from './ViewsControllers/SensorsPannelController';
import { DataCellsController } from './ViewsControllers/CellsPannelController';
import { CreateAllSensorChannels as CreateAllSensorPlotChannels } from "./Channel/Channel/ChannelFactory";
import { SensorWorker } from './Sensor/SensorWorker';
import { CreateAllSensorCellChannels } from './Channel/Channel/CellChannelFactory';

// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

// График
export var plotViewController : PlotViewController;
// Левая нижняя панель с датчиками
export var sensorPanelController: SensorPanelViewControllers;
// Панель ячеек с данными.
export var cellsDataController: DataCellsController;


export var recordController : RecordController = new RecordController();

window.onload = async function()
{
  // Создаем UI компоненты
  let cellsContainer = <HTMLElement>document.getElementById("cell-container");
  cellsDataController = new DataCellsController(<any>cellsContainer);

  let myUplot = new MyUPlot(<HTMLElement>document.getElementById('gd'));
  plotViewController = new PlotViewController(myUplot);

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
    plotViewController.AddSensorHandler(plotChannels);
  });
  
  sensorPanelController.onSensorClose.sub((panel, args) =>{
    sensorService.RemoveSensor(args.sensor);
  })
}