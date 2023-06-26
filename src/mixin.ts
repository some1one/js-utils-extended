import type { Constructor, WithPrototype } from "typescript-util-types";

/**
 * Mixes one class into another. That is, copies properties from a
 * prototype of a mixin class to a prototype of a given class.
 *
 * @param {Constructor<A>} ClassA Class to extend.
 * @param {Constructor<B>} ClassB Mixin class.
 * @returns {*} A new extended class
 */
export function mixin<A extends WithPrototype<Constructor<A>, A>, B extends Constructor<B>>(ClassA: A, ClassB: B): A & B {
    class MixedClass extends ClassA { }
    return _.extend<A, B>(MixedClass.prototype, ClassB.prototype);
}