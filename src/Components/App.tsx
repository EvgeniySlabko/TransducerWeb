
import React from 'react';
import { Navbar } from './navbar';
import { CellContainer } from './CellContainer';
import { SensorController, SensorControllerArgs } from '../SensorController';
import { SensorContainer } from './SensorContainer';
import { RecordController } from '../RecordController';
import { ViewController } from '../ViewsControllers/PlotViewController';
import { sensorService } from '../initialStartup';
import { CreateAllSensorChannelsForPlot } from '../Channel/Channel/ChannelFactory';


export interface Props {
    sensorService: SensorController;
    recordController: RecordController;
}

interface IState {
    plotViewController: ViewController | null;
}

export class App extends React.Component<Props, IState>
{
    //private plotViewController: ViewController | undefined;

    constructor(props: Props)
    {
        super(props);

        this.state = {

            plotViewController: null
        }
        //this.plotViewController = new ViewController(document.getElementById('gd'));
        this.props.sensorService.onDispatch.addListener("Add", this.NewSensorHandler)
    }

    componentDidMount() {
        this.setState((prev, props) => ({
            plotViewController: new ViewController(document.getElementById('gd')),
        }));
      }

    NewSensorHandler = (args: SensorControllerArgs) =>
    {
        if (this.state.plotViewController)
        {
            let plotChannels = CreateAllSensorChannelsForPlot(args.sensor, args.fullSensorInfo);
            this.state.plotViewController.AddChannels(plotChannels);
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
                        <CellContainer sensorController={sensorService} />
                        <SensorContainer sensorService={this.props.sensorService}></SensorContainer>
                    </div>
                    <div id="gd" className="plot"></div>
                </div>
            </div>
        ]
    }
}
