import { RecordManager } from "./ReportListener/RecordManager";
import { SensorController } from "./Sensor/SensorsManager/SensorsManager";
import { PlotsManager } from "./uPlot/PlotManager";


// Хронить сернсоры. Дает себытия подключения отключения
export let sensorService: SensorController = new SensorController();

// manager for main plot
export let plotsManager: PlotsManager;

export let recordController: RecordManager = new RecordManager();
