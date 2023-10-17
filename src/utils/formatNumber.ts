/**
 *
 * format number to four significant figures
 *
 * @param num: string
 *
 * @returns formatted number
 */
export default async function formatNumber(num: string): Promise<string> {
   // Check if the input is a string.
  if (typeof num !== 'string') {
    throw new Error('Invalid input');
  }

  // Convert the input to a number.
  let numberForm = parseFloat(num);

  // Split the number string into its integer and decimal parts.
  let [integerPart, decimalPart] = num.split('.');

  // Format the number parts.
  const formattedNumber = formatNumberParts(integerPart, decimalPart);

  // Return the formatted number.
  return formattedNumber;
}


function formatNumberParts(integerPart: string, decimalPart: string): string {
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
    decimalPart = decimalPart.substring(0, 4);
  }

  // Remove any trailing zeros after the decimal place.
  decimalPart = decimalPart.replace(/0+$/, '');

  // Return the formatted number.
  return `${integerPart}.${decimalPart}`;
}
