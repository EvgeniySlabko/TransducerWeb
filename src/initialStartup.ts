import { RecordManager } from "./ReportListener/RecordManager";
import { RegistreServiceWorker } from "./ServiceWorker";

export let recordController: RecordManager = new RecordManager();

RegistreServiceWorker();