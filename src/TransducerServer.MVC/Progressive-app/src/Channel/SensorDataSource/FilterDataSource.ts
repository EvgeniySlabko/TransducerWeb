import { EventDispatcher, IEvent } from "strongly-typed-events";
import { ISingleComponentSensor } from "../../Sensor/SingleComponentSensor.ts/ISingleComponentSensor";
import { SensorData, SensorMessage, SensorMessageEventArgs, SetAvgEventArgs } from "../../Sensor/SensorDefinitions";
import { FilterParameters, FilterType } from "../../Storage/ChannelsDataStorage";
import { ISensorDataProvider } from "./ISensorDataProvider";

var Fili = require("fili");

export class FilterDataSource implements ISensorDataProvider {
    private _onData = new EventDispatcher<ISingleComponentSensor, SensorData>();
    private _onMessage = new EventDispatcher<ISingleComponentSensor, SensorMessageEventArgs>();
    private _onClose = new EventDispatcher<ISingleComponentSensor, string>();

    private avgRatio: number = 1;
    private fc: number = 100;
    private enabled: boolean = true;
    private order: number = 3;
    private filterType: FilterType = "butterworth";
    private filter?: any;

    constructor(baseSource: ISensorDataProvider) {
        baseSource.onClose.sub((sender, args) => {
            this._onClose.dispatch(sender, args);
        });

        baseSource.onMessage.sub((sender, args) => {
            if (args.msgType === SensorMessage.SetAvg) {
                let avgArgs = args as SetAvgEventArgs;
                this.avgRatio = avgArgs.avg;
                this.createFilter();
            }

            this._onMessage.dispatch(sender, args);
        });

        baseSource.onData.sub((sender, data) => {
            if (!this.enabled) {
                this._onData.dispatch(sender, {
                    time: data.time,
                    data: data.data,
                });

                return;
            }

            let filtered = this.filter.multiStep(data.data);
            this._onData.dispatch(sender, {
                time: data.time,
                data: filtered,
            });
        });

        this.createFilter();
    }

    public SetFilterParams = (filterParams: FilterParameters) => {
        this.fc = filterParams.fc;
        this.enabled = filterParams.enabled;
        this.filterType = filterParams.filterType;
        this.order = filterParams.order;
        this.createFilter();
    };

    public get FilterParams() {
        let filterParams: FilterParameters = {
            filterType: this.filterType,
            enabled: this.enabled,
            fc: this.fc,
            order: this.order,
        };

        return filterParams;
    }

    private createFilter = () => {
        //  Instance of a filter coefficient calculator
        let iirCalculator = new Fili.CalcCascades();

        // calculate filter coefficients
        let samples = 5000 / this.avgRatio;
        var iirFilterCoeffs = iirCalculator.lowpass({
            order: this.order, // cascade 3 biquad filters (max: 12)
            characteristic: this.filterType,
            Fs: samples, // sampling frequency
            Fc: this.fc, // cutoff frequency / center frequency for bandpass, bandstop, peak
            BW: 1, // bandwidth only for bandstop and bandpass filters - optional
            gain: 0, // gain for peak, lowshelf and highshelf
            preGain: false, // adds one constant multiplication for highpass and lowpass
            // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
        });

        this.filter = new Fili.IirFilter(iirFilterCoeffs);
    };

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
