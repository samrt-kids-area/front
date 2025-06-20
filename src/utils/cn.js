// src/utils/cn.js

/**
 * Combines multiple class names into a single string.
 * Filters out falsy values.
 * @param {...(string|undefined|null|false)} inputs - Class names to combine.
 * @returns {string} A string of combined class names.
 */
export function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}