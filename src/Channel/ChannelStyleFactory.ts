import { ColorsDefs } from "../Common/Colors";
import { FullSensorInfo } from "../Sensor/SensorDefinitions";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultStyle() : ChannelStyle{
    return new ChannelStyle();
}

export function CreateTorqueStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Torque";
    style.yAxeStyle.color = ColorsDefs.torqueGreen;
    style.yAxeStyle.tickcolor = ColorsDefs.torqueGreen;
    //style.yAxeStyle.ticklen = 1;
    //style.yAxeStyle.dtick = 0.1 * sensorInfo.MaxValue;   //gap
    //style.yAxeStyle.tickmode = 'auto';
    style.yAxeStyle.range = [sensorInfo.MinValue - (0.1 * sensorInfo.MinValue), sensorInfo.MaxValue + (0.1 * sensorInfo.MaxValue)];
    //style.yAxeStyle.ticklen = 10,
    //style.yAxeStyle.nticks = 20,
    
    style.traceStyle.line = {
        smoothing: 1,
        color: ColorsDefs.torqueGreen,
        shape: "linear",
        simplify: false,
        width: 3,
        dash: "solid",
    };

    return style;
}

export function CreateSpeedStyle(sensorInfo: FullSensorInfo) : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Speed";
    style.yAxeStyle.color = ColorsDefs.speedBlue;
    style.yAxeStyle.tickcolor = ColorsDefs.speedBlue;
    //style.yAxeStyle.ticklen = 10;
    style.yAxeStyle.range = [0, sensorInfo.MaxSpeed + 0.1 * sensorInfo.MaxSpeed];
    style.traceStyle.line ={
        smoothing: 1,
        color: ColorsDefs.speedBlue,
        shape: "linear",
        simplify: false,
        width: 3,
        dash: "solid",
    };

    return style;
}

export function CreatetemperatureStyle() : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Tmp";
    style.yAxeStyle.color = ColorsDefs.temperatureRed;
    style.yAxeStyle.tickcolor = ColorsDefs.temperatureRed;
    //style.yAxeStyle.ticklen = 10;
    style.traceStyle.line ={
        smoothing: 1,
        color: ColorsDefs.temperatureRed,
        shape: "linear",
        simplify: false,
        width: 3,
        dash: "longdash",
    };

    return style;
}