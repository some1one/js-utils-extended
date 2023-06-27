/**
 * Generates a key-value pair object.
 *
 * @param {*} key Key.
 * @param {*} value Value.
 * @returns {Object} Key-value pair object.
 */
export function pair<K extends symbol | string | number, V>(key: K, value: V): Record<K, V> {
    const o = {} as Record<K, V>;
    o[key] = value;

    return o;
}