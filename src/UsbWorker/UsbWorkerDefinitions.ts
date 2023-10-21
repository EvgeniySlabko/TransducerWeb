export enum WorkerCommandType{
    Open,
    Read,
    Write,
    Close,
    Error,
}

//------------------------------
export declare class WorkerMessage{
    command: WorkerCommandType;
    args: any;
}

//------------------------------
export declare class OpenWorkerArgs{
    vendorId: number;
    productId: number;
};

export declare class ReadWorkerArgs{
    
};

export declare class WriteWorkerArgs{
    data: Uint8Array;
};

export declare class ErrorWorkerArgs{
    errorCommand: WorkerCommandType;
    error: Error;
};

export declare class DataWorkerArgs{
    data: Uint8Array[];
};