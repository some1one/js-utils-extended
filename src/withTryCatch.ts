import { AnyFunction, Void } from "typescript-util-types";
type WrappedFunction<T extends AnyFunction> = (...args: Parameters<T>) => ReturnType<T> | Void;

/**
 * Wraps a given operation into a try-catch block, invoking callback with error
 * if it was thrown.
 *
 * @param {Function} func function to wrap.
 * @param {Function} onCatch Error callback. Gets error as input parameter.
 * @returns {Function} Wrapped function.
 */
export function withTryCatch<T extends AnyFunction>(func: T, onCatch: (error: unknown) => void): WrappedFunction<T> {
    return ((...args: unknown[]) => {
        try {
            return func(...args);
        } catch (error) {
            onCatch(error);
        }

        return undefined;
    }) as WrappedFunction<T>;
}