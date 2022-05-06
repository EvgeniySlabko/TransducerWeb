
import { ISingleComponentSensor } from "../Sensor/SingleComponentSensor.ts/ISensor";
import {SensorController, SensorControllerArgs} from "../SensorController"
export class SensorPanelControllers
{
    private container: HTMLElement;

    constructor(container: HTMLElement, sensorController: SensorController)
    {
        this.container = container;
        sensorController.onDispatch.addListener("Add", this.AddSensorHandler);
        sensorController.onDispatch.addListener("Add", this.RemoveHandler);
    }

    private AddSensorHandler(args: SensorControllerArgs)
    {
        
    }

    private RemoveHandler(args: SensorControllerArgs)
    {

    }
}