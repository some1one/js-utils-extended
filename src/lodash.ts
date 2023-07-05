import "lodash";
import type { UnknownObject, WithPrototype, AnyFunction } from "typescript-util-types";
declare module "lodash" {
    export interface LoDashStatic {
        /**
         * Checks if value is a plain object, that is, an object created by the Object constructor or one with a
         * [[Prototype]] of null.
         *
         * Note: This method assumes objects created by the Object constructor have no inherited enumerable properties.
         *
         * @param value The value to check.
         * @return Returns true if value is a plain object, else false.
         */
        isPlainObject(value: any): value is UnknownObject ;

        /**
         * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0),
         * and new String(''))
         *
         * @param value The value to check.
         * @return Returns true if value is an object, else false.
         */
        isObject(value: any): value is UnknownObject & AnyFunction & WithPrototype<UnknownObject & AnyFunction>;

        /**
         * Checks if `value` is object-like. A value is object-like if it's not `null`
         * and has a `typeof` result of "object".
         *
         * @category Lang
         * @param value The value to check.
         * @returns Returns `true` if `value` is object-like, else `false`.
         * @example
         *
         * _.isObjectLike({});
         * // => true
         *
         * _.isObjectLike([1, 2, 3]);
         * // => true
         *
         * _.isObjectLike(_.noop);
         * // => false
         *
         * _.isObjectLike(null);
         * // => false
         */
        isObjectLike(value: any): value is UnknownObject;
    }
}