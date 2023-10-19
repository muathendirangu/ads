"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsEmptyString = exports.isEmpty = exports.isArray = void 0;
function isArray(array) {
    return Array.isArray(array);
}
exports.isArray = isArray;
function isEmpty(array) {
    return array.length === 0;
}
exports.isEmpty = isEmpty;
function containsEmptyString(array) {
    return array.some((item) => item === '');
}
exports.containsEmptyString = containsEmptyString;
