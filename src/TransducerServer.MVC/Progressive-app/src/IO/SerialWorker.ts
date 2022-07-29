import { SimpleEventDispatcher } from "strongly-typed-events";

export class SerialWorker {

  private readonly port: SerialPort;
  private _onDisconnect = new SimpleEventDispatcher<SerialWorker>();
  private _onConnect = new SimpleEventDispatcher<SerialWorker>();

  private reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  private writer: WritableStreamDefaultWriter<Uint8Array> | undefined;

  constructor(port: SerialPort) {
    this.port = port
    port.onconnect = () => {
      // console.log("connect");
      this._onConnect.dispatch(this);
    }

    port.ondisconnect = () => {
      // console.log("disconnect");
      this._onDisconnect.dispatch(this);
    }
  }

  public async OpenPort() {
    await this.port.open(
      {
        baudRate: 115200,
        bufferSize: 50000,
        dataBits: 8,
        flowControl: "none",
        parity: "none",
        stopBits: 1,
      });

    if (this.port.readable != null && this.port.writable != null) {
      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter();

      await this.writer.ready;
    }
    else {
      await this.port.close();
      throw "Port unreadable or unwritable.";
    }
  }

  public get IsConnected(): boolean {
    return this.port.readable != null && this.port.writable != null;
  }

  public get onDisconnect() {
    return this._onDisconnect.asEvent();
  }

  public get onConnect() {
    return this._onConnect.asEvent();
  }

  public async GetChunk(): Promise<Uint8Array> {
    let result = await this.reader!.read();

    if (!result.done)
      return result.value;
      
    throw "No data";
  }

  public async write(bytes: Uint8Array): Promise<void> {
    await this.writer!.write(bytes);
  }

  public async Close(): Promise<void> {
    this.reader?.cancel();
    this.reader?.releaseLock();
    this.writer?.releaseLock();
    await this.port.close();
  }
}

