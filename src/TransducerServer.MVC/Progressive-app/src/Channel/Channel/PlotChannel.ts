import { PlotChannelStyle as PlotChannelStyle } from "../ChannelStyle/PlotChannelStyle";
import { ISensorDataProvider } from "../SensorDataSource/ISensorDataProvider";
import { EventDispatcher } from "strongly-typed-events";
import {
  SensorData,
  SensorMessageEventArgs,
} from "../../Sensor/SensorDefinitions";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
//import { CreateDefaultStyle } from "./ChannelStyleFactory";

export type PlotChannelDataArgs = {
  sensor: ISingleComponentSensor;
  data: SensorData;
};

export type PlotChannelMessageArgs = {
  sensor: ISingleComponentSensor;
  sensorMsgArgs: SensorMessageEventArgs;
};

export type PlotChannelCloseArgs = {
  sensor: ISingleComponentSensor;
  msg: string;
};

// Содержит информацию для отображения на графике.
export class PlotChannel {
  private style: PlotChannelStyle;

  private _onData = new EventDispatcher<PlotChannel, PlotChannelDataArgs>();
  private _onMessage = new EventDispatcher<
    PlotChannel,
    PlotChannelMessageArgs
  >();
  private _onClose = new EventDispatcher<PlotChannel, PlotChannelCloseArgs>();

  public constructor(dataSource: ISensorDataProvider, style: PlotChannelStyle) {
    this.style = style;
    dataSource.onData?.sub((sensor, args) => {
      this._onData.dispatch(this, {
        data: args,
        sensor: sensor,
      });
    });

    dataSource.onClose?.sub((sensor, args) => {
      this._onClose.dispatch(this, {
        sensor: sensor,
        msg: args,
      });
    });

    dataSource.onMessage?.sub((sensor, args) => {
      this._onMessage.dispatch(this, {
        sensorMsgArgs: args,
        sensor: sensor,
      });
    });
  }

  public get Style() {
    return this.style;
  }

  public get onData() {
    return this._onData.asEvent();
  }

  public get onMessage() {
    return this._onMessage.asEvent();
  }

  public get onClose() {
    return this._onClose.asEvent();
  }
}
