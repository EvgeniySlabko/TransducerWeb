import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import App from "./Containers/App";

import "../src/assets/uPlot.min.css"
require("../css/styles.css");

 

ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
, document.getElementById("root")
);
