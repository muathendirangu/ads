
 export function isArray(array: any[]): boolean {
    return Array.isArray(array);
 }

 export function isEmpty(array: any[]): boolean {
    return array.length === 0;
 }
 export function containsEmptyString(array: any[]): boolean {
    return array.some((item) => item === '');
 }


