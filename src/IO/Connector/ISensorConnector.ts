import { ISimpleEvent } from "strongly-typed-events";

// TO DO Reconect.
export declare class ISensorConnector {
    Close(): Promise<void>;
    OnDisconnect: ISimpleEvent<ISensorConnector>;
}
