import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./Components/App";
import './index.css';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";


require("../css/styles.css");
require("../css/grow.css");
require("../css/measureCell.css");
require("../css/uPlot.min.css");
 

ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
, document.getElementById("root")
);
