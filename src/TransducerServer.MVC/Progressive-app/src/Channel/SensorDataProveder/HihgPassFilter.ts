import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessage, SensorMessageEventArgs } from "../../Sensor/SingleComponentSensor.ts/SensorDefinitions";
import { ISensorDataProvider } from "./ISensorDataProvider";

var Fili = require('fili');

//буферизирует данные
export class HihgPassFilter implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private filter: any;
    constructor(baseSource: ISensorDataProvider) {

        //  Instance of a filter coefficient calculator
        let iirCalculator = new Fili.CalcCascades();

        // get available filters
        let availableFilters = iirCalculator.available();

        // calculate filter coefficients
        var iirFilterCoeffs = iirCalculator.lowpass({
            order: 3, // cascade 3 biquad filters (max: 12)
            characteristic: 'butterworth',
            Fs: 5000, // sampling frequency
            Fc: 1, // cutoff frequency / center frequency for bandpass, bandstop, peak
            BW: 1, // bandwidth only for bandstop and bandpass filters - optional
            gain: 0, // gain for peak, lowshelf and highshelf
            preGain: false // adds one constant multiplication for highpass and lowpass
            // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
        });

        // create a filter instance from the calculated coeffs
        this.filter = new Fili.IirFilter(iirFilterCoeffs);

        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sender, data) => {
            let filtered = this.filter.multiStep(data.data)
            this._onData.dispatch(sender, {
                time: data.time,
                data: filtered,
            }); 
        });
    }

    get onData(): IEvent<ISingleComponentSensor, SensorData> {
        return this._onData.asEvent();
    }
    get onClose(): IEvent<ISingleComponentSensor, string> {
        return this._onClose.asEvent();
    }
    get onMessage(): IEvent<ISingleComponentSensor, SensorMessageEventArgs> {
        return this._onMessage.asEvent();
    }
}