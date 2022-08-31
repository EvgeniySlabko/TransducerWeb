import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { sleep } from "./Common/Common";
import { App } from "./Components/App";
import { recordController, sensorService } from "./initialStartup";

require("../css/styles.css");
require("../css/grow.css");
require("../css/measureCell.css");
require("../css/uPlot.min.css");
ReactDOM.render(<App sensorService={sensorService} recordController={recordController} />, document.getElementById("root"));


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}