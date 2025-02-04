export interface ICachedMemory {
  getValue(key: string): Promise<string>;
  setValue(key: string, value: string): Promise<void>;
  closeConnection(): Promise<void>;
}
