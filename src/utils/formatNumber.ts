/**
 *
 * format number to four significant figures
 *
 * @param num: string
 *
 * @returns formatted number Promise<string>
 */
export default async function formatNumber(num: string): Promise<string> {
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
}

