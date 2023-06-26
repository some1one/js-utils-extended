/** Capatalizes the first letter of a string */
export const capitalize = (string: string): string => {
    const firstLetter = string[0].toUpperCase();
    return firstLetter.concat(string.substring(1));
};