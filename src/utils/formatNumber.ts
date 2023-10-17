/**
 *
 * format number to four significant figures
 *
 * @param bigNumber
 *
 * @returns Promise<string>
 */
export default async function formatNumber(bigNumber: BigInt): Promise<string> {
    //convert bigInt to number
    let num = await convertBigIntToNumber(bigNumber);
    // Check if the number is NaN or Infinity.
    if (isNaN(num) || !isFinite(num)) {
      return num.toString();
    }

    // Convert the number to a string.
    let numberString = num.toString();

    // Remove any leading zeros.
    numberString = numberString.replace(/^0+/, '');

    // If the number is a whole number, add a decimal point and two trailing zeros.
    if (!numberString.includes('.')) {
      numberString += '.00';
    }

    // Split the number string into its integer and decimal parts.
    let [integerPart, decimalPart] = numberString.split('.');

    // Check if the integer part is greater than or equal to 10,000.
    // If it is, we need to add a leading zero to the decimal part.
    if (integerPart.length >= 5) {
      decimalPart = '0' + decimalPart;
    }

    // Check if the decimal part has at least 2 digits.
    // If it doesn't, we need to add trailing zeros.
    if (decimalPart.length < 2) {
      decimalPart += '0'.repeat(2 - decimalPart.length);
    }

    // Check if the decimal part has more than 4 significant digits.
    // If it does, we need to round the number.
    if (decimalPart.length > 4) {
      num = Number(num.toFixed(4));
      numberString = num.toString();
      [integerPart, decimalPart] = numberString.split('.');
    }

    // Remove any trailing zeros after the decimal place.
    decimalPart = decimalPart.replace(/0+$/, '');

    // Return the formatted number.
    return `${integerPart}.${decimalPart}`;
}
/**
 *
 * convert Big Integer to Number
 *
 * @param bigInt
 * @returns Promise<number>
 */
async function convertBigIntToNumber(bigInt: BigInt): Promise<number> {
    if (Number(bigInt) > Number.MAX_SAFE_INTEGER || Number(bigInt) < Number.MIN_SAFE_INTEGER) {
      throw new Error('BigInt is outside the safe integer range');
    }

    return  Number(bigInt);
}
