require('../css/styles.css');
//require('../css/css/bootstrap.min.css');
//require('../css/js/bootstrap.bundle');
require('./UIHandlers');
require('./uPlot/uPlot');
require('../dist/uPlot.iife');
require('../dist/uPlot.min.css');

import 'bootstrap/dist/css/bootstrap.min.css';

import { MyUPlot } from "./uPlot/uPlot";
import { ViewController } from "./ViewController";
import { RecordController } from "./RecordController";
import { SensorController } from "./SensorController";

export var viewController : ViewController;
export var recordController : RecordController = new RecordController();
export var sensorService: SensorController = new SensorController();

window.onload = async function()
{
  var myUplot = new MyUPlot(<HTMLElement>document.getElementById('gd'));
  viewController = new ViewController(myUplot, sensorService);
}