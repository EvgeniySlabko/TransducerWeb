import React from 'react';
import { Navbar } from './navbar';
import { CellContainer } from './CellContainer';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { SensorContainer } from './SensorContainer';
import { RecordController } from '../RecordController';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { CreateAllChannels } from '../Channel/AllChannelsFactory';
import { CellChannel, ChannelCloseArgs } from '../Channel/Channel/CellChannel';
import { Channel } from '../Channel/Channel/Channel';
import { ISingleComponentSensor } from '../Sensor/SingleComponentSensor.ts/ISensor';
import { FullSensorInfo } from '../Sensor/SingleComponentSensor.ts/SensorDefinitions';
import { SensorWorker } from '../Sensor/SensorWorker';


export interface Props {
    sensorService: SensorController;
    recordController: RecordController;
}

export interface SensorNode{
    sensor: ISingleComponentSensor,
    fullSensorInfo: FullSensorInfo
    worker: SensorWorker,
    setOffset: (offset: number) => void,
    setCurrentOffsetValue: () => void,
}

interface IState {
    plotViewController: ViewController | null;
    cellChannels: CellChannel[];
    savingChannels: Channel[];
    plotChannels: Channel[];
    sensorsNodes: SensorNode[];
}

export class App extends React.Component<Props, IState>
{
    //private plotViewController: ViewController | undefined;

    constructor(props: Props)
    {
        super(props);

        this.state = {

            plotViewController: null,
            cellChannels: [],
            plotChannels: [],
            savingChannels: [],
            sensorsNodes: []
        }
        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.sensorManualCloseHandler = this.sensorManualCloseHandler.bind(this);
        this.props.sensorService.onDispatch.addListener("Add", this.NewSensorHandler)
    }

    componentDidMount() {
        this.setState((prev, props) => ({
            plotViewController: new ViewController(document.getElementById('gd')),
        }));
      }

    cellChannelCloseHandler = (channel: CellChannel, channelCloseArgs: ChannelCloseArgs)=>
    {
      let index = this.state.cellChannels.findIndex(c => c === channel);
      this.state.cellChannels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    plotChannelCloseHandler = (channel: Channel, channelCloseArgs: ChannelCloseArgs)=>
    {
      let index = this.state.plotChannels.findIndex(c => c === channel);
      this.state.plotChannels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    savingChannelCloseHandler = (channel: Channel, channelCloseArgs: ChannelCloseArgs) =>
    {
      let index = this.state.savingChannels.findIndex(c => c == channel);
      this.state.savingChannels.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    sensorCloseHandler = (channel: ISingleComponentSensor, args: string) =>
    {
      let index = this.state.sensorsNodes.findIndex(c => c.sensor == channel);
      this.state.sensorsNodes.splice(index, 1);
      this.setState((prev, props) => ({
      }));
    }

    sensorManualCloseHandler = async (sensor: ISingleComponentSensor) =>
    {
        sensor.onClose.unsub(this.sensorCloseHandler);
        await sensor.CloseConnection()
        let index = this.state.sensorsNodes.findIndex(c => c.sensor == sensor);
        this.state.sensorsNodes.splice(index, 1);
        this.setState((prev, props) => ({
        }));
    }

    NewSensorHandler = (args: SensorControllerArgs) =>
    {
        if (this.state.plotViewController)
        {
            let allChannelsInfo = CreateAllChannels(args.sensor, args.fullSensorInfo);
            //let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.setState((prev, props) => ({
                cellChannels: this.state.cellChannels.concat(allChannelsInfo.cellChannels),
                plotChannels: this.state.plotChannels.concat(allChannelsInfo.plotChannels),
                savingChannels: this.state.savingChannels.concat(allChannelsInfo.savingChannels),
                sensorsNodes: this.state.sensorsNodes.concat(
                    {
                        fullSensorInfo: args.fullSensorInfo,
                        sensor: args.sensor,
                        worker: args.worker,
                        setCurrentOffsetValue: allChannelsInfo.currentValueOffsetSetter,
                        setOffset: allChannelsInfo.offsetSetter
                    }
                ),
            }));

            this.state.plotViewController.AddChannels(allChannelsInfo.plotChannels);

            this.props.recordController.SetChannels(allChannelsInfo.savingChannels);

            allChannelsInfo.plotChannels.forEach(channel =>  { channel.onClose.sub(this.plotChannelCloseHandler);});
            allChannelsInfo.savingChannels.forEach(channel =>  { channel.onClose.sub(this.savingChannelCloseHandler) ;});
            allChannelsInfo.cellChannels.forEach(channel =>  { channel.onClose.sub(this.cellChannelCloseHandler);});
            
            args.sensor.onClose.sub(this.sensorCloseHandler);

            this.props.recordController.SetChannels(this.state.savingChannels);
        }
    }
    
    render(){
        return [
            <Navbar key = {1} sensorService={this.props.sensorService} 
                    recordController={this.props.recordController}
                    plotViewController={() => this.state.plotViewController}></Navbar>,
                    
            <div key = {2} className = "all">
                <div className="middle-container">
                    <div className="left-container">
                        <CellContainer dataCells={this.state.cellChannels} />
                        <SensorContainer sensorsNodes={this.state.sensorsNodes} 
                                         RemoveSensor={this.sensorManualCloseHandler}></SensorContainer>
                    </div>
                    <div id="gd" className="plot"></div>
                </div>
            </div>
        ]
    }
}
