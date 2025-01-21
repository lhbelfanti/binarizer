// Camelize converts a snake_case string to camelCase
export type Camelize<S extends string> = S extends `id_${infer Rest}`
    ? `id${Capitalize<Camelize<Rest>>}` // If the string starts with id_, maintain as lowerCase
    : S extends `${infer Prefix}_id`
        ? `${Camelize<Prefix>}ID` // If the string ends with _id, convert it to ID
        : S extends `${infer Prefix}_id_${infer Rest}`
            ? `${Camelize<Prefix>}ID${Capitalize<Camelize<Rest>>}` // If the string contains id, convert it to ID
            : S extends `${infer Prefix}_${infer Rest}`
                ? `${Camelize<Prefix>}${Capitalize<Camelize<Rest>>}` // Otherwise camelCase the string
                : S; // Otherwise return the string as is

// CamelizeKeys converts a snake_case object to camelCase
export type CamelizeKeys<T> = T extends object
    ? {
        // For each key in T, convert it to camelCase
        [K in keyof T as Camelize<string & K>]: T[K] extends (infer U)[]
            ? CamelizeKeys<U>[] // If the value is an array, recursively convert each element
            : T[K] extends object
                ? CamelizeKeys<T[K]> // If the value is an object, recursively convert it
                : T[K]; // Otherwise camelCase the key
    }
    : T;


// recursiveToCamel converts a snake_case object to camelCase
export const recursiveToCamel = <T>(item: T): CamelizeKeys<T> => {
    if (Array.isArray(item)) {
        // If the item is an array, recursively convert each element
        return item.map((el) => recursiveToCamel(el)) as unknown as CamelizeKeys<T>;
    } else if (typeof item === 'function' || item !== Object(item)) {
        // If the item is a function or not an object, return it as is
        return item as unknown as CamelizeKeys<T>;
    }

    return Object.fromEntries(
        // Extract the key-value pairs from the object
        Object.entries(item as Record<string, unknown>) // Convert the object to an array of key-value pairs
            .map(([key, value]: [string, unknown]) => [
                key
                    .replace(/(_id)/g, 'ID') // Replace id with ID only if is not the first word
                    .replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, '')), // Convert snake_case to camelCase
                recursiveToCamel(value),
            ])
    ) as unknown as CamelizeKeys<T>;
};