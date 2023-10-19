"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * format number to four significant figures
 *
 * @param num: string
 *
 * @returns formatted number Promise<string>
 */
function formatNumber(num) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert the input string to a number
        let number = parseFloat(num);
        if (isNaN(number)) {
            // If the input is not a valid number, return '0'
            return '0';
        }
        // Ensure at least 2 decimal places and 4 significant figures
        const formattedNumber = number.toFixed(4);
        // Use a comma for the thousands separator
        const [integerPart, decimalPart] = formattedNumber.split('.');
        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Remove any trailing zeros after the decimal place
        const trimmedNumber = decimalPart.replace(/0+$/, '');
        return trimmedNumber.length > 0 ? `${integerWithCommas}.${trimmedNumber}` : integerWithCommas;
    });
}
exports.default = formatNumber;
