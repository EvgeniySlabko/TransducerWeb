import { AlignedData } from "uplot";
import { PlotChannelStyle } from "../../Channel/ChannelStyle/PlotChannelStyle";
import { Snapshot } from "../../ReportListener/Snapshot";
import { MyUPlotBase } from "../PlotBase";
import { LogLevelBugger as LogLevelBuffer } from "./LogLevelBuffer";

export class MyUPlotViewer extends MyUPlotBase {
  private buffer?: LogLevelBuffer;


  constructor(element: HTMLElement) {
    super(element, {
      maxScreenSize: Infinity,
      pointsPerSecond: 50,
    });
    
    this.SetScale(0, this.params.screenSize());
  }

  protected GetData () : AlignedData  {
    if (!this.buffer) return [[],[]];
    
    this.params.pointsPerSecond = Math.floor(1 / this.buffer.Dt);   
    
    return this.buffer.Source;
  }

  public FromSnapshot(snapshot: Snapshot) {
    var trackData = snapshot.GetTrackData();

    this.buffer = new LogLevelBuffer(() => [this.params.range[0], this.params.range[1]]);
    this.buffer.FromSnapshot(snapshot);
    var styles = trackData.map(t => t.style);
    this.params.t0 = Math.min(...trackData.map(trackData => trackData.data).map(data => data.time.length > 0 ? data.time[0]: 0));
    this.params.th = Math.max(...trackData.map(trackData => trackData.data).map(data => data.time.length > 0 ? data.time[data.time.length - 1]: 100));
    this.BuildNewPlot(styles);
  }

  private BuildNewPlot = (styles: PlotChannelStyle[]) => {
    this.DestroyPlot();

    styles.forEach((s, i) => {
      this.AddSeries(s);
    });

    this.BuildPlot();
    this.SetScale(this.params.t0, this.params.th);
  }

  public Clear = () => {
    //To DO.
  }

  protected DbClick(e: any) {

    if (e.button == 0) {
      e.preventDefault();
      this.SetScale(this.params.t0, this.params.th);
    }
  }
}

