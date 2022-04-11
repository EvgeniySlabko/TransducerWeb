import { Queue } from "queue-typescript";
import { SerialWorker } from "./serial";

class SerialBufferedWorker 
{
    private queue: Queue<number>;
    private size: number;
    
    public baseWorker: SerialWorker;
    constructor(worker: SerialWorker, size : number = 10000)
    {
        if (worker == null) throw "Worker is null!";
        if (size <= 0) throw "Buffer size les thean 0!";

        this.baseWorker = worker;
        this.size = size;
        this.queue = new Queue<number>();
    }

    public async Read(count: number) : Promise<Uint8Array>{

        if (count > this.size)
            throw 'Too large count!. ${count}$';

        var result = new Uint8Array(count);
        var currentCount: number = 0;
        while(this.queue.length < count)
        {
            var chank = await this.baseWorker.GetChunk();
                for (let i = 0; i < chank.length; i++) {
                    this.queue.append(chank[i]);
                }
        }
            
        for (let i = 0; i < count; i++){
            result[currentCount++] = this.queue.dequeue();
        }
        
        return result;
    } 

    public async Write(data: Uint8Array)
    {
        await this.baseWorker.write(data);
    }

    public async Close(): Promise<void>
    {
        await this.baseWorker.Close();
    }
}

export default SerialBufferedWorker;