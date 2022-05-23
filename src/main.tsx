require('../css/styles.css');
require('../css/cellStyles.css');
require('../css/grow.css');
require('../css/measureCell.css');
require('../css/cellPanel.css');
require('../bootstrap-5/css/bootstrap.min.css');
require('../bootstrap-5/js/bootstrap.bundle.min.js');
//require('./ViewsControllers/UIHandlers');
require('../dist/uPlot.iife');
require('../dist/uPlot.min.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('../src/initialStartup');
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import { plotViewController, recordController, sensorService } from './initialStartup';
//import Demo from './Components/SensorContainer';

ReactDOM.render(<App sensorService={sensorService} 
                     recordController={recordController}
                     ></App>, document.body);