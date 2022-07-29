import { CreateTxtFileDialog } from "../Common/Common";

export class FileWorker
{
    private file: FileSystemFileHandle | undefined;

    public get File() : FileSystemFileHandle | undefined
    {
        return this.file
    }
    
    public OpenFile = async () => {
        this.file = await CreateTxtFileDialog();
    }
}