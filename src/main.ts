require('../css/styles.css');
require('../bootstrap-5/css/bootstrap.min.css');
require('../bootstrap-5/js/bootstrap.bundle.min.js');

require('./Views/UIHandlers');
require('./uPlot/uPlot');
require('../dist/uPlot.iife');
require('../dist/uPlot.min.css');

import 'bootstrap/dist/css/bootstrap.min.css';

import { MyUPlot } from "./uPlot/uPlot";
import { ViewController } from "./Views/ViewController";
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