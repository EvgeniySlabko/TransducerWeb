class RingBuffer{
    
    pushIndex: number = 0;
    popIndex: number = 0;
    buff: number[];
    size: number;
    dataBytes: number = 0;

    constructor(size: number)
    {
        if (size < 1)
        {
            throw "Неверный размер очереди";
        }

        this.size = size;
        this.buff = new Array(size);
        this.popIndex = 0;
        this.pushIndex = 0;
        this.dataBytes = 0;
    }

    public push(value: number)
    {
        var newIndex = this.incrementIndex(this.pushIndex);
        this.buff[this.pushIndex] = value;
        this.pushIndex = newIndex;
        this.dataBytes++;

        if (newIndex == this.popIndex)
        {
            console.log("Buffer owerflow!!!!!!!!");
            this.dataBytes = 0;
        }
    }

    public pop() : number | null
    {
        if (this.pushIndex == this.popIndex)
        {
            return 0;
        }
        else
        {
            var value = this.buff[this.popIndex];
            this.popIndex = this.incrementIndex(this.popIndex);
            this.dataBytes--;
            return value;
        }
    }

    public incrementIndex(index: number)
    {
        if (index == this.size - 1)
            return 0;
        return ++index;
    }

    public clear()
    {
        this.popIndex = 0;
        this.pushIndex = 0;
    }
    
    dataCount() : number
    {
        return this.dataBytes;
    }
}

export default RingBuffer;