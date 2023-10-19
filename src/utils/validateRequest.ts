import { Address } from "../balances.types";

 export function isArray(array: any): boolean {
    return Array.isArray(array);
 }

 export function isEmpty(array: Address[]): boolean {
    return array.length === 0;
 }
 export function containsEmptyString(array: Address[]): boolean {
    return array.some((item) => item === '');
 }


