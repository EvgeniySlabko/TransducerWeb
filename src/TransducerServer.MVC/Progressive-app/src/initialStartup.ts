import { PlotsManager as PlotsManager } from "./uPlot/PlotManager";
import { RecordManager } from "./ReportListener/RecordManager";
import { SensorController } from "./Sensor/SensorsManager/SensorsManager";

// Хронить сернсоры. Дает себытия подключения отключения
export let sensorService: SensorController = new SensorController();

// manager for main plot
export let plotsManager: PlotsManager;

export let recordController: RecordManager = new RecordManager();
