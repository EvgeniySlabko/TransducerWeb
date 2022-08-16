let key = "RS485Key";

export type BaudRate = 2400 | 4800 | 9600 | 14400 | 19200 | 38400 | 57600 | 115200;
export type StopBit = 1 | 2;
export type Parity = "addToEven" | "addToOdd" | "none";

export declare class RS485ConnectioParams {
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
    address: number;
}

export declare class VCOMConnectioParams {
    baudRate: BaudRate;
    parity: ParityType;
    stopBits: StopBit;
}
