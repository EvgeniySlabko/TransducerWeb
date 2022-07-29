import { Queue } from "queue-typescript";
import { IReaderWriter } from "./IReaderWriter";
import { SerialWorker } from "./SerialWorker";

export class SerialBufferedWorker implements IReaderWriter {
    private queue: Queue<number>;
    public baseWorker: SerialWorker;

    constructor(worker: SerialWorker) {
        this.baseWorker = worker;
        this.queue = new Queue<number>();
    }

    public async Read(count: number): Promise<Uint8Array> {
        var result = new Uint8Array(count);
        var currentCount: number = 0;
        while (this.queue.length < count) {
            var chank = await this.baseWorker.GetChunk();
            for (let i = 0; i < chank.length; i++) {
                this.queue.append(chank[i]);
            }
        }

        for (let i = 0; i < count; i++) {
            result[currentCount++] = this.queue.dequeue();
        }

        return result;
    }

    public async Write(data: Uint8Array) {
        await this.baseWorker.write(data);
    }

    public async Close(): Promise<void> {
        await this.baseWorker.Close();
    }
}