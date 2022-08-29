import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Components/App";
import { recordController, sensorService } from "./initialStartup";

require("../../manifest.json");
require("../../css/styles.css");
require("../../css/grow.css");
require("../../css/measureCell.css");
require("../../css/uPlot.min.css");
ReactDOM.render(<App sensorService={sensorService} recordController={recordController} />, document.getElementById("root"));
