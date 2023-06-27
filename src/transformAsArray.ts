/**
 * Transforms an input array or object (prop values) to a new array, possibly filtering
 * out some elements and changing existing elements.
 *
 * @param {Array|Object} iterable Iterable (array or object).
 * @param {Function} iter Iterator function. Receives a current value and key as input parameters.
 * Returns either a new value, that is pushed to output array, or undefined or false,
 * meaning that the element should be skipped.
 * @returns {Array} Resulting array.
 */
export function transformAsArray<T = unknown, O = unknown>(
    iterable: Array<T> | Record<string, T>,
    iter: (value: T, key: string | number) => O,
): Array<O> {
    const ret: Array<O> = [];
    const iter0 = (value: T, key: string | number) => {
        const res = iter(value, key);
        (res || res === 0) && ret.push(res);
    };

    if (_.isArray(iterable)) {
        iterable.forEach(iter0);
    } else {
        _.each(iterable, iter0);
    }

    return ret;
}