/**
 * import the required external modules and interfaces
 */

import {
    fetchBalance
 } from "./balances.service";


 export async function fetchAddressBalances(addresses: string[]): Promise < Record < string, string >> {
    const balancePromises = addresses.map((address: string) => fetchBalance(address));
    const balances = await Promise.all(balancePromises);

    const balanceMap: Record < string, string > = {};
    for (const [index, balance] of balances.entries()) {
       if (balance === 'Invalid address') {
          balanceMap[`${addresses[index]}-is-an-invalid-address`] = "0";
       } else {
          balanceMap[addresses[index]] = balance;
       }
    }

    return balanceMap;
 }
