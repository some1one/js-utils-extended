export type KeyFunction<T> = (key: string, obj: Record<string, T>) => string;
export type FilterFunction<T> = (key: string, obj: Record<string, T>) => boolean;

/** 
 * @param {number | undefined} [depth] Recursion depth.
 * @param {KeyFunction<T> | undefined} [keyFunction] Function for key generation.
 * @param {FilterFunction<T> | undefined} [filter] Function for key filtering.
 * @param {Boolean | undefined} [parseJson] Whether to parse nested JSON.
 */
export interface FlattenObjectOptions<T = unknown> {
    depth?: number;
    keyFunction?: KeyFunction<T>;
    filter?: FilterFunction<T>;
    parseStringsAsJson?: boolean;
}


/**
 * Flattens an object, converting any nested objects
 * into fields.
 *
 * @param {Record<string, T>} obj Object to flatten.
 * @param {FlattenObjectOptions<T>} [options] Flattening options.
 * @returns {Record<string, T>} Flattened object or undefined if input was undefined.
 */
export function deepFlattenObject<T = unknown>(obj: Record<string, T>, options?: FlattenObjectOptions<T>): Record<string, T> {
    const keyFunc = options && options.keyFunction;
    const filter = options && options.filter;
    const depth = options && options.depth;
    const parseJson = options && options.parseStringsAsJson;

    if (depth && depth <= 0) return obj;

    return recursiveFlatten<T>(
        obj,
        undefined,
        undefined,
        depth && depth > 0 ? depth - 1 : undefined,
        parseJson,
        keyFunc,
        filter,
    );
}

function recursiveFlatten<T = unknown>(
    obj: Record<string, T>,
    out: Record<string, T> = {},
    path?: string,
    depth?: number,
    parseJson?: boolean,
    keyFunc?: (key: string, obj: Record<string, T>) => string,
    filter?: (key: string, obj: Record<string, T>) => boolean,
) {
    Object.keys(obj).forEach(function (key) {
        let value = obj[key];
        const key0 = (keyFunc && keyFunc(key, obj)) || key;
        const path0 = path ? path + '.' + key0 : '' + key0;

        if (value === undefined || value === null) return;

        if (parseJson && typeof value === 'string') {
            try {
                value = JSON.parse(value);
            } catch (e) {
                // Ignore
            }
        }

        const valueIsObject = (value: unknown): value is Record<string, T> => typeof value === 'object';

        if (value === null || !valueIsObject(value) || (depth && depth <= 0)) {
            if (!filter || filter(key, obj)) {
                out[path0] = value;
            }
        } else if (depth && depth > 0) {
            recursiveFlatten<T>(value, out, path0, depth - 1);
        } else {
            recursiveFlatten<T>(value, out, path0);
        }
    });

    return out;
}