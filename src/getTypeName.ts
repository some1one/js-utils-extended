import type { AnyFunction, Constructor } from "typescript-util-types";

type TypedConstructor<T extends Function = AnyFunction> = Constructor<T> & { typeName?: string | (() => string) };

/**
 * Will return the type name of a class or an object describing a class.
 * 
 * If a class is given, it will return the static typeName property if it exists, otherwise it will return the built in name property.
 * 
 * If an object is given, it will run the same logic on the constructor property of the object.
 * @param definition a class or an object describing a class
 * @returns string
 */
export const getTypeName = (definition: TypedConstructor | { constructor: TypedConstructor }): string | undefined => {
    if (isTypedConstructor(definition)) 
    {
        return _.result(definition.constructor, 'typeName') || definition.constructor.name;
    }

    return getTypeName(definition.constructor);
};

const isTypedConstructor = (definition: Parameters<typeof getTypeName>[0]): definition is TypedConstructor  => {
    return _.isFunction(definition);
}