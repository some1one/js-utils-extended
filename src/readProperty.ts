import { capitalize } from "./capitalize";

/**
 * Reads a given property from an object. Attempts to read directly by name, falling back to a camel cased getter. Returns undefined if neither exists.
 * 
 * @param {Object} object Object of interest.
 * @param {String} propName Property name.
 * @returns {*} Property value or undefined.
 */
export const readProperty = (object: Record<string, unknown>, propName: string): unknown => {
    let value = object[propName];

    if (!value) {
        const getterName = `get${capitalize(propName)}`;
        value = object[getterName];
        if (_.isFunction(value)) {
            value = value();
        }
    }

    return value;
};