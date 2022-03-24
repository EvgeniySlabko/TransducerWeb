export class SerialWorker
{
    constructor(reader: ReadableStreamDefaultReader<Uint8Array>, writer: WritableStreamDefaultWriter<Uint8Array>) {
      this.reader = reader;
      this.writer = writer;
    }
    
    private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
    private readonly writer: WritableStreamDefaultWriter<Uint8Array>;   


    private chunk: Uint8Array = new Uint8Array(0);
    private readIndex: number = 0;
     

    public async Read(count: number) : Promise<Uint8Array> {
      
      let result = new Uint8Array(count);
      let bytesRemains = this.chunk.length - this.readIndex - 1;

      while(true)
      {
        if (bytesRemains < count)
        {
          let writeIndex = 0;
          // дочитываем 
          for (let i = 0; i < bytesRemains; i++) {
            result[writeIndex + i] = this.chunk[this.readIndex + i];
          }

          //берем новый чанк
          this.chunk = await this.GetChunk();
          this.readIndex = 0;
        }
        else
        {
          for (let i = 0; i < count; i++) {
            result[i] = this.chunk[this.readIndex + i];
          }

          this.readIndex += count;
          break;
        }
    }

      var value = await this.GetChunk();
      return value;
    }

    private async GetChunk() : Promise<Uint8Array>
    {
      let result = await this.GetChunkRecursive(10, 0);
      if (result == null)
      {
        throw new Error('ReadingError');
      }

      return result;
    }

    private async GetChunkRecursive(totalAttempts: number, currentAttempt: number) : Promise<Uint8Array | null>
    {
      if (totalAttempts == currentAttempt)
        return null;

      var result = await this.reader.read();
      if (!result.done)
      {
        return result.value;
      }
      else
      {
        await this.timeout(10);
        return await this.GetChunkRecursive(totalAttempts, currentAttempt + 1);
      }
    }
    

  private timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
    
  public write(bytes: Uint8Array) : void  {
    this.writer.write(bytes);
  }
}

export async function connectSerial() : Promise<SerialWorker | null> {    
    try {
      let port = await navigator.serial.requestPort();
      await port.open(
      {
          baudRate: 115200,
          bufferSize : 1024,
          dataBits : 8,
          flowControl :"none",
          parity : "none",
          stopBits : 1,
      });

      if (port.readable != null && port.writable != null)
      {
          var worker =  new SerialWorker(port.readable.getReader(), port.writable.getWriter());
          return worker;
      }

      return null;
    }
    catch(error)
    {
      console.log(error);
      return null;
    }
}


/*

  function serialRead()
  {
    reader.read().then((value, done) =>
    {
      var len = value.value.length;
      //console.log(len);
      if (len != 0) {
        //console.log("Read:", value);
        for (let i = 0; i < len; i++) {
          buffer.push(value.value[i]);
        }
      }
      if (done) {
        //console.log('[readLoop] DONE', done);
        reader.releaseLock();
      }
    }).catch((error) =>{
      console.log(error);
    });
  }

  function WriteBytes(bytes)
  {
    if (writer)
    {
      writer.write(bytes)
    }
  }

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

*/