import { SimpleEventDispatcher } from 'strongly-typed-events';
import { ValueType } from './StyleCommon';


export class ChannelStyle{  
    sensorId: number = 0;      
    color: string = "green";
    grid: boolean = false;
    unitName: string = "Nm";
    valueType: ValueType = "torque";
    yTitle: string = "Torque";
    axisColor: string = "green";
    legendTitle: string = "Torque";
    range: number[] = [-50, 50];
    line: "dash" | "solid" = "solid";
    yAxeSide: "right" | "left" = "right";
    rescaleRationTop: number = 0.3;
    rescaleRationBottom: number = 0.3;
    visible: boolean = true;
    width: number = 1;
    legendValueAcurency: number = 2;
}

