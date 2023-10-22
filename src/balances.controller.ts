/**
 * import the required external modules and interfaces
 */

import {
   BalanceService
 } from "./balances.service";
import {
   Address,
   Balance
} from "./balances.types";

 const balanceService = new BalanceService();

 export async function fetchAddressBalances(addresses: Address[]): Promise <Record <Address, Balance>> {
    const balancePromises = addresses.map((address: Address) => balanceService.fetchBalance(address));
    const balances = await Promise.all(balancePromises);

    const balanceMap: Record <Address, Balance> = {};
    for (const [index, balance] of balances.entries()) {
       if (balance === 'Invalid address') {
          balanceMap[`${addresses[index]}-is-an-invalid-address`] = "0";
       } else {
          balanceMap[addresses[index]] = balance;
       }
    }
    return balanceMap;
 }
