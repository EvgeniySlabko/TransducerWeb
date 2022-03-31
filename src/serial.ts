import { SimpleEventDispatcher } from "strongly-typed-events";

export class SerialWorker
{
  public readAttempts: number = 10;
  public delaybetweenAttempts: number = 10;

  private _onDisconnect = new SimpleEventDispatcher<SerialWorker>();
  private _onConnect = new SimpleEventDispatcher<SerialWorker>();
  
  private readonly port : SerialPort;
  private reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  private writer: WritableStreamDefaultWriter<Uint8Array> | undefined;   
  
  constructor(port: SerialPort) {
    if (port == null)
      throw "Port is null";

    this.port = port
    port.onconnect = (event: Event) => {
      console.log("connect");
      this._onConnect.dispatch(this);
    }

    port.ondisconnect = (event: Event) =>{
      console.log("disconnect");
      this._onDisconnect.dispatch(this);
    }
  }

  public async OpenPort()
  {
    await this.port.open(
    {
        baudRate: 115200,
        bufferSize : 2048,
        dataBits : 8,
        flowControl :"none",
        parity : "none",
        stopBits : 1,
    });

    if (this.port.readable != null && this.port.writable != null)
    {
      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter();
    }
    else
    {
      await this.port.close();
      throw "Port unreadable or unwritable.";
    }
  }

  public get IsConnected() : boolean
  {
    return this.port.readable != null && this.port.writable != null;
  }

  public get onDisconnect() {
    return this._onDisconnect.asEvent();
  }

  public get onConnect() {
    return this._onConnect.asEvent();
  }

  public async GetChunk() : Promise<Uint8Array>
  {
    if (this.reader == undefined || this.reader == null) throw "Reader undefined";

    let result = await this.reader.read();

    if (!result.done)
    {
      return result.value;
    }
    else
    {
      console.log("no data");
      throw "no data";
    }
  }
    
  public async write(bytes: Uint8Array) : Promise<void>  {
    if (this.writer == undefined || this.writer == null) throw "Writer undefined";

    await this.writer.write(bytes);
  }

  public async Close(): Promise<void>{
    this.reader?.releaseLock();
    this.writer?.releaseLock();
    //await this.port.writable?.cancel();
    await this.port.close();
  }
}

export async function connectSerial() : Promise<SerialWorker> {    
    let port = await navigator.serial.requestPort();
    return new SerialWorker(port);
}
