/**
 * Deeply extends target object with source object.
 *
 * @param {Object} target Target object to extend.
 * @param {Object} source Object with new properties.
 * @returns {*|{}} Extended target object.
 */
export function deepExtend<TV = unknown, SV = unknown>(
    target: Record<string, TV>,
    source: Record<string, SV>,
): Record<PropertyKey, TV | SV> {
    const combined = (target || {}) as Record<PropertyKey, TV | SV>;
    source = source || {};
    const keys = Object.keys(source);

    for (let prop = 0; prop < keys.length; prop++) {
        const value = source[keys[prop]];

        if (_.isObject(value) && !_.isArray(value)) {
            combined[keys[prop]] = deepExtend(combined[keys[prop]] as Record<PropertyKey, unknown>, value) as TV | SV;
        } else {
            combined[keys[prop]] = value;
        }
    }

    return combined;
}
