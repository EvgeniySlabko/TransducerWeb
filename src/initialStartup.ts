import { ViewController as PlotViewController } from "./ViewsControllers/PlotViewController";
import { RecordController } from "./RecordController";
import { SensorController } from "./SensorController";


// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

export var plotViewController : PlotViewController;

export var recordController : RecordController = new RecordController();

