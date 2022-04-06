import { ColorsDefs } from "../Common/Colors";
import { ChannelStyle } from "./ChannelStyle";

export function CreateDefaultStyle() : ChannelStyle{
    return new ChannelStyle();
}

export function CreateTorqueStyle() : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Torque";
    style.yAxeStyle.color = ColorsDefs.green;
    style.yAxeStyle.tickcolor = ColorsDefs.green;
    style.yAxeStyle.tickcolor = ColorsDefs.green;
    style.yAxeStyle.ticklen = 10;
    return style;
}

export function CreateSpeedStyle() : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Speed";
    style.yAxeStyle.color = ColorsDefs.blue;
    style.yAxeStyle.tickcolor = ColorsDefs.blue;
    style.yAxeStyle.tickcolor = ColorsDefs.blue;
    style.yAxeStyle.ticklen = 10;
    style.traceStyle.line ={
        width: 3,
        dash: "dashdot",
    };
    

    return style;
}

export function CreatetemperatureStyle() : ChannelStyle{
    var style = new ChannelStyle();
    style.traceStyle.name = "Tmp";
    style.yAxeStyle.color = ColorsDefs.red;
    style.yAxeStyle.tickcolor = ColorsDefs.red;
    style.yAxeStyle.tickcolor = ColorsDefs.red;
    style.yAxeStyle.ticklen = 10;
    return style;
}