
/**
 *
 * format number to four significant figures
 *
 * @param num: stringscientific-to-decimal
 *
 * @returns formatted number Promise<string>
 */
export default async function formatNumber(num: string): Promise<string> {
  let numberStr = parseFloat(num);

  if (isNaN(numberStr)) {
    return '0';
  }
  if(num.includes('.')){
    let [integerPart, decimalPart] = num.split('.');
    let formatted = parseFloat(`${integerPart}.${decimalPart}`);
    if(integerPart.length < 4){
      if (integerPart==="0") {
        return formatFourSignificantFigures(formatted);
      }else if(num.length >= 6){
        return  formatFourSignificantFigures(formatted).replace(/0+$/, '')
      }
      let form = formatFourSignificantFigures(formatted)
      let res = form.replace(/0+$/, '');
      console.log("result", res);
      return res;
    }
    integerPart = parseFloat(`${integerPart}.${decimalPart}`).toFixed(2);
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    decimalPart = decimalPart.replace(/0+$/, '');

    return `${integerPart}.${decimalPart}`;
  }

return "0";
}


function formatFourSignificantFigures(number: number): string {
  // Round the number to 4 significant figures
  return number.toPrecision(4);

}

