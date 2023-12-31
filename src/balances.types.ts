/**
 * Types used to represent addresses, balances, and validation errors.
 *
 * - `Address`: A string representing an Ethereum address.
 * - `Balance`: A string representing the balance of an Ethereum address in Ether.
 * - `IsValidAddress`: A boolean value indicating whether an Ethereum address is valid.
 * - `ValidationErrors`: An interface representing the validation errors for a given input.
 *
 *
 */

export type Address = string;
export type Balance = string;
export type IsValidAddress = boolean;

export interface ValidationErrors {
    errors: string[];
}

