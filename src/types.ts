export interface ILogger {
    log(message: string): void;
    error(message: string): void;
    info(message: string): void;
    warn(message: string): void;
}

export type SerializablePrimitives = string | number | boolean | null | undefined;
export type SerializableArray = Array<SerializablePrimitives>;
export type SerializableData =
    | SerializablePrimitives
    | SerializableArray
    | Record<string, SerializablePrimitives | SerializableArray>;
export interface ISerializable {
    serialize(): Record<string, SerializableData>;
}

export interface DataProvider {
    getAll(): Promise<Record<string | number, SerializableData> | SerializableData[]>;
    get<T extends SerializableData = SerializableData>(key: string | number): Promise<T>;
    writeAll(data: Record<string | number, SerializableData> | SerializableData[]): Promise<void>;
    delete(key: string | number): Promise<void>;
    patch(key: string | number, data: Partial<SerializableData>): Promise<void>;
}

export interface IEventEmitter {
    on(event: string, listener: (...args: any[]) => void): this;
    once(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): boolean;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
}

export interface IDirectoryOperations {
    readFile(path: string): Promise<string | number[]>;
    writeFile(path: string, data: string | number[]): Promise<void>;
    deleteFile(path: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    getInfo(path: string): Promise<Record<string, any>>;
    list(path: string): Promise<string[]>;
    createDirectory(path: string): Promise<void>;
    removeDirectory(path: string, recursive?: boolean): Promise<void>;
    rename(oldPath: string, newPath: string): Promise<void>;
    copy(oldPath: string, newPath: string): Promise<void>;
    move(oldPath: string, newPath: string): Promise<void>;
    create(path: string, content?: string | number[]): Promise<void>;
    append(path: string, data: string | number[]): Promise<void>;
    watch(path: string, options: Record<string, any>, callback: (event: string, filename: string) => void): void;
}