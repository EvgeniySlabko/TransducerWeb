import { ISimpleEvent } from "strongly-typed-events";

// TO DO Reconect.
export declare class ISensorIOWorker
{
    Close() : Promise<void>;
    OnDisconnect : ISimpleEvent<ISensorIOWorker>;
}