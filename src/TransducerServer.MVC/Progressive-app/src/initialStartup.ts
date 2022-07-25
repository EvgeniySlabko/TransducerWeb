import { ViewController as PlotViewController } from "./ViewsControllers/PlotViewController";
import { RecordController } from "./RecordController";
import { SensorController } from "./SensorController";
import { ParamsStorage } from "./Storage/Storage";
import * as fs from 'fs';




// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

export var plotViewController : PlotViewController;

export var recordController : RecordController = new RecordController();

export var storage : ParamsStorage = new ParamsStorage();