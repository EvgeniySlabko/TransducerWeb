export async function CreateTxtFileDialog(fileName?: string) {
    const result = await window.showSaveFilePicker({
        suggestedName: fileName ? fileName : "Report.txt",
        types: [
            {
                description: "Text file",
                accept: { "text/plain": [".txt"] },
            },
        ],
    });

    return result;
}

export async function CreateCsvFileDialog(fileName?: string) {
    const result = await window.showSaveFilePicker({
        suggestedName: fileName ? fileName : "Report.csv",
        types: [
            {
                description: "CSV file",
                accept: { "text/csv": [".csv"] },
            },
        ],
    });

    return result;
}

export class FileWorker {
    private file: FileSystemFileHandle | undefined;

    public get File(): FileSystemFileHandle | undefined {
        return this.file;
    }

    public OpenFile = async () => {
        this.file = await CreateTxtFileDialog();
    };
}
