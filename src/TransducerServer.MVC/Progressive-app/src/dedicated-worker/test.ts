declare var self: DedicatedWorkerGlobalScope;
export {};

addEventListener("message", (message) => {
    self.postMessage("рудщ акщь цщклук");
    //console.log(device.deviceProtocol);
});

postMessage("ваы");