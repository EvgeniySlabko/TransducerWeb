import { PlotsManager as PlotsManager } from "./uPlot/PlotManager";
import { RecordManager } from "./ReportListener/RecordManager";
import { SensorController } from "./Sensor/SensorsManager/SensorsManager";

// Хронить сернсоры. Дает себытия подключения отключения
export var sensorService: SensorController = new SensorController();

// manager for main plot
export var plotsManager: PlotsManager;

export var recordController: RecordManager = new RecordManager();
