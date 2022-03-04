export class RingBuffer{
    
    #pushIndex = 0;
    #popIndex = 0;
    #buff = [];
    #size;

    constructor(size)
    {
        if (size < 1)
        {
            throw "Неверный размер очереди";
        }

        this.size = size;
        this.buff = new Array(size);
        this.popIndex = 0;
        this.pushIndex = 0;
    }

    push(value)
    {
        var newIndex = this.incrementIndex(this.pushIndex);
        this.buff[this.pushIndex] = value;
        this.pushIndex = newIndex;
        if (newIndex == this.popIndex)
        console.log("Buffer owerflow!!!!!!!!");
    }

    pop()
    {
        if (this.pushIndex == this.popIndex)
        {
            return null;
        }
        else
        {
            var value = this.buff[this.popIndex];
            this.popIndex = this.incrementIndex(this.popIndex);
            return value;
        }
    }

    incrementIndex(index)
    {
        if (index == this.size - 1)
            return 0;
        return ++index;
    }

    clear()
    {
        this.popIndex = 0;
        this.pushIndex = 0;
    }
    
    dataCount()
    {
        return Math.abs(this.pushIndex - this.popIndex);
    }
}
