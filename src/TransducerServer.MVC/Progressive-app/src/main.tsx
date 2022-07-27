import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import { recordController, sensorService, storage } from './initialStartup';

require('../css/styles.css');
require('../css/grow.css');
require('../css/measureCell.css');
require('../css/uPlot.min.css');
require('../src/initialStartup');


ReactDOM.render(<App 
    sensorService={sensorService}
    recordController={recordController}
    storage={storage}/>, document.getElementById("root"));