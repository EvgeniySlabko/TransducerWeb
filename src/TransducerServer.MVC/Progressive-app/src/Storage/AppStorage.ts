export class ParamsStorage {
    private InitScreenKey = "InitScreen";
    private RecordIntervalKey = "RecordInterval";
    private ComSpeedKey = "ComSpeed";
    private SoundKey = "Sound";
    private FpsKey = "Fps";

    private ComSpeeds = [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200];
    constructor() {
        this.SetIfNotExists(this.InitScreenKey, 5);
        this.SetIfNotExists(this.RecordIntervalKey, 999);
        this.SetIfNotExists(this.ComSpeedKey, 115200);
        this.SetIfNotExists(this.SoundKey, false);
        this.SetIfNotExists(this.FpsKey, false);
    }

    // InitialScreen
    get InitialScreen(): number { return this.GetParameter<number>(this.InitScreenKey); }
    set InitialScreen(value: number) { if (value < 999999 && value > 0.5) { this.Set(this.InitScreenKey, value); } }

    get RecInterval(): number { return this.GetParameter<number>(this.RecordIntervalKey); }
    set RecInterval(value: number) { if (value < 999999 && value > 0) { this.Set(this.RecordIntervalKey, value); } }

    get ComSpeed(): number { return this.GetParameter<number>(this.ComSpeedKey) };
    set ComSpeed(value: number) { if (this.ComSpeeds.find(v => v === value)) { this.Set(this.ComSpeedKey, value); } }

    get Sound(): boolean { return this.GetParameter<boolean>(this.SoundKey); }
    set Sound(value: boolean) { this.Set(this.SoundKey, value); }

    get Fps(): number { return this.GetParameter<number>(this.FpsKey); }
    set Fps(value: number) { if (value <= 60 && value >= 1) { this.Set(this.FpsKey, value); } }

    private Set = (key: string, value: any) => {
        let serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    }

    private SetIfNotExists = (key: string, value: any) => {
        if (!localStorage.getItem(key)) {
            let serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        }
    }

    private GetParameter<T>(key: string) {
        let strVal = localStorage.getItem(key)
        if (strVal) return <T>JSON.parse(strVal);
        else throw `Parameter ${key}`;
    }
}

