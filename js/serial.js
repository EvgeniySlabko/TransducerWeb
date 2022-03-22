"use strict";
//import { RingBuffer } from "./Buffer";
//import {InitDevice} from './sensor.js';
//import {RingBuffer} from './Buffer.js';
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
//var reader : function(): number;
//var writer : function(number): void;
//var buffer = new RingBuffer(512);
//var intervalId;
//function connectListener(e)
//{
//console.log(`${e} подключился!`);
//}
//function disconnectListener(e)
//{
//console.log(`${e} отключился!`);
//}
/*
async function GetBytes(count)
{

for (let i = 0; i < 10; i++) {
    var result = await tryGetBytesRecursive(count, 0);
    if (result === null)
    {
    throw("No Data!");
    }

    return result;
}

return await new Promise((resolve, reject) =>
{
    for (let i = 0; i < 10; i++) {
    var result = tryGetBytes(count);
    if (result === null)
    {
        setTimeout(10);
        continue;
    }

    resolve(result);
    }

    reject();
});
*/
//}
/*
async function tryGetBytesRecursive(count, tries)
{
  if (tries > 10)
  {
    return null;
  }

  if (buffer.dataBytes >= count)
  {
    var data = new  Uint8Array(count);
      for (let i = 0; i < count; i++) {
        data[i] = buffer.pop();
      }

      return data
  }

  await timeout(1);
  return tryGetBytesRecursive(count, tries + 1);
}
*/
/*
  export
  {
    GetBytes as GetBytes,
    WriteBytes as WriteBytes,
  }
*/
class SerialWorker {
    constructor(reader, writer) {
        this.reader = reader;
        this.writer = writer;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            var value = yield this.reader.read();
            return value.done ? value.value : null;
        });
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
