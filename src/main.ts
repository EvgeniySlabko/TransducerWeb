require('./css/styles.css');
require('../src/css/css/bootstrap.min.css');
require('../src/css/js/bootstrap.bundle');
require('./UIHandlers');

import {Plot} from "./Plot/plot";
import { ViewController } from "./ViewController";


export var viewController : ViewController;


window.onload = async function()
  {
    var element = <HTMLElement>document.getElementById('gd');
    var plot = new Plot(element);
    await plot.DrawPlot();
    viewController = new ViewController(plot)
  }