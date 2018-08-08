/**
 * This function is used to ensure exhaustive checking.  See
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html .
 *
 * This function never throws and does no work, it's meant to only
 * provide a static compile time check.
 */
export declare function staticAssertNever(_x: never): void;
