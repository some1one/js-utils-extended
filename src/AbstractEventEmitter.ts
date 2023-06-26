import { IEventEmitter } from "./types";

export abstract class AbsractEventEmitter implements IEventEmitter {
    constructor(maxListeners?: number) {
        this.setMaxListeners(maxListeners || Number.MAX_SAFE_INTEGER);
    }

    public abstract on(event: string, listener: (...args: any[]) => void): this;
    public abstract once(event: string, listener: (...args: any[]) => void): this;
    public abstract off(event: string, listener: (...args: any[]) => void): this;
    public abstract emit(event: string, ...args: any[]): boolean;
    public abstract removeAllListeners(event?: string | symbol): this;
    public abstract setMaxListeners(n: number): this;
    public abstract getMaxListeners(): number;
}