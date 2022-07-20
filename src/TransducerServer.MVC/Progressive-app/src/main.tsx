require('../css/styles.css');
require('../css/cellStyles.css');
require('../css/grow.css');
require('../css/measureCell.css');

require('../uPlot/uPlot.iife');
require('../uPlot/uPlot.min.css');
require('../src/initialStartup');

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import { recordController, sensorService, storage } from './initialStartup';
import 'antd/dist/antd.css';



ReactDOM.render(<App sensorService={sensorService} 
                     recordController={recordController}
                     storage = {storage}
                     ></App>, document.getElementById("root"));