import Sensor from "../Sensor/sensor";
import { Channel } from "./Channel";
import { CreateDefaultStyle } from "./ChannelStyleFactory";

export function CreateMainValueChannel(sensor: Sensor) : Channel
{
    return new Channel(sensor.onData, CreateDefaultStyle());
}

export function CreateSpeedChannel(sensor: Sensor) : Channel
{
    return new Channel(sensor.onSpeed, CreateDefaultStyle());
}

export function CreateTemperatureChannel(sensor: Sensor) : Channel
{
    return new Channel(sensor.onTmp, CreateDefaultStyle());
}

export function CreateAllSensorChannels(sensor: Sensor) : Channel[]
{
    var channels : Channel[] = [];

    channels.push(CreateMainValueChannel(sensor));
    channels.push(CreateSpeedChannel(sensor));
    channels.push(CreateTemperatureChannel(sensor));
    return channels;
}