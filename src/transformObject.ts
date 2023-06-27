import { transformAsArray } from "./transformAsArray";

/**
 * Transforms an object into another object. Runs a transformation function over the
 * input object key-value pairs and either modifies a value of a key-value pair, removes
 * the key-value pair, or substitutes it with the provided one.
 *
 * @param {Object} input Input object.
 * @param {Function} transformer Iterator (transformation) function. Iterates through object key-value pairs.
 * Receives a value as a first argument and a key as a second argument. Possible return values:
 * - true: Leave key-value pair unchanged (will be copied verbatim to resulting object).
 * - Array[2]: Use new key-value pair for original one.
 * - false|undefined: Skip this key-value pair (won't be present in resulting object).
 * - any other value: Use original key with a new value.
 * @returns {Object} Resulting object.
 */
export function transformObject<T extends Record<string, unknown> = Record<string, unknown>>(
    input: Record<string, unknown>,
    transformer: (value: unknown, key: string) => unknown,
): T {
    return _transformObject<T>(input, transformer);
}

/**
 * Transforms an object into another object. Runs a transformation function over the
 * input object key-value pairs and either modifies a value of a key-value pair, removes
 * the key-value pair, or substitutes it with the provided one.
 *
 * @param {Object} input Input object.
 * @param {Function} transformer Iterator (transformation) function. Iterates through object key-value pairs.
 * Receives a value as a first argument and a key as a second argument. Possible return values:
 * - true: Leave key-value pair unchanged (will be copied verbatim to resulting object).
 * - Array[2]: Use new key-value pair for original one.
 * - false|undefined: Skip this key-value pair (won't be present in resulting object).
 * - any other value: Use original key with a new value.
 * @param {Object} [thisContext] Iterator function context (this object).
 * @returns {Object} Resulting object.
 */
function _transformObject<T extends Record<string, unknown> = Record<string, unknown>>(
    this: unknown,
    input: Record<string, unknown>,
    transformer: (value: unknown, key: string, index?: number) => unknown,
    thisContext?: unknown,
): T {
    const ret: Record<string, unknown> = {};

    Object.keys(input).forEach(function (this: unknown, key, idx) {
        const res = transformer.call(this, input[key], key, idx);

        if (res === true) {
            // Leave key-value pair unchanged.
            ret[key] = input[key];
        } else if (res instanceof Array && res.length == 2) {
            // Convert to another key-value pair.
            ret[res[0]] = res[1];
        } else if (res !== false && res !== undefined) {
            // Use new value with original key.
            ret[key] = res;
        }
    }, thisContext || this);

    return ret as T;
}

/**
 * Similar to transformObject(), but runs the transformation recursively on
 * object and array values.
 *
  * @param {Object} input Input object.
 * @param {Function} transformer Iterator (transformation) function. Iterates through object key-value pairs.
 * Receives a value as a first argument and a key as a second argument. Possible return values:
 * - true: Leave key-value pair unchanged (will be copied verbatim to resulting object).
 * - Array[2]: Use new key-value pair for original one.
 * - false|undefined: Skip this key-value pair (won't be present in resulting object).
 * - any other value: Use original key with a new value.
 * @returns {Object} Resulting object.
 */
export function deepTransformObject<T extends Record<string, unknown> = Record<string, unknown>>(
    input: Record<string, unknown>,
    iter: (value: unknown, key: string | number, index?: number) => unknown,
): T {
    return _deepTransformObject<T>(input, iter);
}

/**
 * Similar to transformObject(), but runs the transformation recursively on
 * object and array values.
 *
 * @param {Object} obj Input object.
 * @param {Function} iter Iterator (transformation) function. See transformObject() for details.
 * @param {Object} [thisContext]  Iterator function context (this object).
 * @param {Boolean} transform_arrays If false - won't recurse into arrays.
 * @returns {Object} Resulting object.
 */
export function _deepTransformObject<T extends Record<string, unknown> = Record<string, unknown>>(
    obj: Record<string, unknown>,
    iter: (value: unknown, key: string | number, index?: number) => unknown,
    thisContext?: unknown,
    transform_arrays = false,
): T {
    return _transformObject(
        obj,
        function (value: unknown, key: string, idx?: number) {
            if (_.isPlainObject(value)) {
                return _deepTransformObject(value, iter, thisContext, transform_arrays);
            }

            if (Array.isArray(value) && transform_arrays !== false) {
                const value0 = transformAsArray(value, function (value, key) {
                    if (_.isPlainObject(value)) {
                        return _deepTransformObject(value, iter, thisContext, transform_arrays);
                    }

                    const value1 = iter.call(thisContext, value, key, key as number);

                    if (value1 === true) return value;

                    return value1;
                });

                return [key, value0];
            }

            return iter.call(thisContext, value, key, idx);
        },
        thisContext,
    );
}