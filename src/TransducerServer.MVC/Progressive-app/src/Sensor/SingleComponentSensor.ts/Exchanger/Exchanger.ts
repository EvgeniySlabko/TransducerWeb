import { DataParams, ExchangerArgs, ExchangerMessage, StartReadingParams } from "./ExchangerArgs";

addEventListener('message', (message) => {
    let args = message as unknown as ExchangerArgs;
    switch (args.Message) {
        case ExchangerMessage.Start:
            console.error('Worker start.');
            Reading(args.args as StartReadingParams);
            break;
        case ExchangerMessage.Stop:
            console.debug('Worker stop.');
            stopReadingRequire = true;
            break;

        default:
            break;
    }
});

let stopReadingRequire = true;
function Reading(startReadingParams: StartReadingParams)
{
    setInterval(() => Read(startReadingParams), startReadingParams.intervalReading);
}

async function Read(startReadingParams: StartReadingParams) {
    let currentTime = Date.now();
    try {
      let inputValues = await startReadingParams.sensor.ReadInputComplex();
      postMessage({
        args: 
        {
            data: inputValues,
            time: currentTime,
        } as DataParams,
        Message: ExchangerMessage.Data
      } as ExchangerArgs);
    } catch {
      stopReadingRequire = true;
      postMessage({
        Message: ExchangerMessage.Data
      } as ExchangerArgs);
      console.warn("Error while exchanging.");
    }
  }