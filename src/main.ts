require('./css/styles.css');
require('../src/css/css/bootstrap.min.css');
require('../src/css/js/bootstrap.bundle');
require('./UIHandlers');
require('./uPlot/uPlot');


require('../dist/uPlot.iife');
require('../dist/uPlot.min.css');
import { MyUPlot } from "./uPlot/uPlot";
import {Plot} from "./Plotly/plot";
import { ViewController } from "./ViewController";

export var myUplot = new MyUPlot(<HTMLElement>document.getElementById('gd'));
export var viewController : ViewController;


window.onload = async function()
  {


    //var element = <HTMLElement>document.getElementById('gd');
    //var plot = new Plot(element);
    //await plot.DrawPlot();


    viewController = new ViewController(myUplot);
  }