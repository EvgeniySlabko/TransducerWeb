import { PlotsManager as PlotsManager } from "./uPlot/PlotsManager";
import { RecordManager } from "./ReportListener/RecordManager";
import { SensorController } from "./Sensor/SensorsManager/SensorsManager";
import { ParamsStorage } from "./Storage/AppStorage";

// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

// manager for main plot
export var plotsManager: PlotsManager;

export var recordController: RecordManager = new RecordManager();

export var storage: ParamsStorage = new ParamsStorage();