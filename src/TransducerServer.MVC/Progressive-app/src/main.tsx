import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Components/App";
import { recordController, sensorService } from "./initialStartup";

import { CRC16MODBUS } from "./IO/CRC-16";

require("../css/styles.css");
require("../css/grow.css");
require("../css/measureCell.css");
require("../css/uPlot.min.css");
require("../src/initialStartup");

ReactDOM.render(
  <App sensorService={sensorService} recordController={recordController} />,
  document.getElementById("root")
);
