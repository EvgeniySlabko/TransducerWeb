import uPlot, { AlignedData, Axis, Scale, Series } from "uplot";
import { Channel } from "../../Channel/Channel/Channel";
import { ChannelStyle } from "../../Channel/ChannelStyle/ChannelStyle";
import { Snapshot } from "../../ReportListener/Snapshot";
import { GetSeries } from "../ComponetFactory/ComponentFactory";
import { MyUPlotBase } from "../uPlotBase";
import { LogLevelBugger } from "./LogLevelBuffer";

export class MyUPlotViewer extends MyUPlotBase
{
  private buffer: LogLevelBugger;

  constructor(element: HTMLElement)
  {
    super(element); 
    this.buffer = new LogLevelBugger(() => [this.params.range[0], this.params.range[1]]);
    this.SetScale(0, this.params.screenSize());
  }


  protected get data() : uPlot.AlignedData
  {
    return this.buffer.Source;
  }

  public FromSnapshot(snapshot: Snapshot)
  {
    var trackData = snapshot.GetTrackData();
    this.buffer.FromSnapshot(snapshot);

    var styles = trackData.map(t => t.style);
    
    this.params.gridTicks = 5000;
    this.params.t0 = this.buffer.T0;
    this.params.th = this.buffer.TH;
    this.BuildNewPlot(styles);
  }

  private BuildNewPlot = (styles: ChannelStyle[]) =>
  {
    this.DestroyPlot();

    styles.forEach((s, i) => {
      this.AddSeries(s);
    });

    this.BuildPlot();
    this.SetScale(this.params.t0, this.params.th);
  }

  protected DbClick(e: any) {
    
    if (e.button == 0) {
      e.preventDefault();
      this.SetScale(this.params.t0, this.params.th);
    }
}
}

