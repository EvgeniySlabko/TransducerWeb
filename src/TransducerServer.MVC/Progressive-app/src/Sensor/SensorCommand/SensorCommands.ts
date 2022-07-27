export interface ISensorCommand {
    readonly Command: number;
    GetBytes(): Uint8Array
}

export class DefaultCommand implements ISensorCommand {
    public Command: number;
    private address: number;
    private value: number;

    constructor(command: number, address: number, value: number) {
        this.Command = command;
        this.address = address;
        this.value = value;
    }

    GetBytes(): Uint8Array {
        let reqest: Uint8Array = new Uint8Array(5);
        reqest[0] = this.Command;
        reqest[1] = (this.address & 0xFF);
        reqest[2] = ((this.address >> 8) & 0xFF);
        reqest[3] = (this.value & 0xFF);
        reqest[4] = ((this.value >> 8) & 0xFF);

        return reqest;
    }
}

export class SingleCommand implements ISensorCommand {
    readonly Command: number;

    constructor(Command: number) {
        this.Command = Command;
    }

    GetBytes(): Uint8Array {
        let reqest: Uint8Array = new Uint8Array(1);
        reqest[0] = this.Command;
        return reqest;
    }
}

export class MultipleCommand implements ISensorCommand {
    readonly Command: number;
    private bytes: Uint8Array
    private address: number

    constructor(command: number, address: number, bytes: Uint8Array) {
        this.Command = command;
        this.address = address;
        this.bytes = bytes;
    }

    GetBytes(): Uint8Array {
        let reqest: Uint8Array = new Uint8Array(4 + this.bytes.length);
        reqest[0] = this.Command;

        reqest[1] = (this.address & 0xFF);
        reqest[2] = ((this.address >> 8) & 0xFF);
        reqest[3] = this.bytes.length;
        for (let i = 0; i < this.bytes.length; i++) {
            reqest[i + 4] = this.bytes[i];
        }

        return reqest;
    }
}