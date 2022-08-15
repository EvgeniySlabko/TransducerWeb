export declare class IReaderWriter {
  public Read(count: number): Promise<Uint8Array>;

  public Write(data: Uint8Array): Promise<void>;

  public Close(): Promise<void>;
}
