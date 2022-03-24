"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSerial = exports.SerialWorker = void 0;
class SerialWorker {
    constructor(reader, writer) {
        this.chunk = new Uint8Array(0);
        this.readIndex = 0;
        this.reader = reader;
        this.writer = writer;
    }
    Read(count) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = new Uint8Array(count);
            let bytesRemains = this.chunk.length - this.readIndex - 1;
            while (true) {
                if (bytesRemains < count) {
                    let writeIndex = 0;
                    // дочитываем 
                    for (let i = 0; i < bytesRemains; i++) {
                        result[writeIndex + i] = this.chunk[this.readIndex + i];
                    }
                    //берем новый чанк
                    this.chunk = yield this.GetChunk();
                    this.readIndex = 0;
                }
                else {
                    for (let i = 0; i < count; i++) {
                        result[i] = this.chunk[this.readIndex + i];
                    }
                    this.readIndex += count;
                    break;
                }
            }
            var value = yield this.GetChunk();
            return value;
        });
    }
    GetChunk() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.GetChunkRecursive(10, 0);
            if (result == null) {
                throw new Error('ReadingError');
            }
            return result;
        });
    }
    GetChunkRecursive(totalAttempts, currentAttempt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (totalAttempts == currentAttempt)
                return null;
            var result = yield this.reader.read();
            if (!result.done) {
                return result.value;
            }
            else {
                yield this.timeout(10);
                return yield this.GetChunkRecursive(totalAttempts, currentAttempt + 1);
            }
        });
    }
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    write(bytes) {
        this.writer.write(bytes);
    }
}
exports.SerialWorker = SerialWorker;
function connectSerial() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let port = yield navigator.serial.requestPort();
            yield port.open({
                baudRate: 115200,
                bufferSize: 1024,
                dataBits: 8,
                flowControl: "none",
                parity: "none",
                stopBits: 1,
            });
            if (port.readable != null && port.writable != null) {
                var worker = new SerialWorker(port.readable.getReader(), port.writable.getWriter());
                return worker;
            }
            return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.connectSerial = connectSerial;
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
