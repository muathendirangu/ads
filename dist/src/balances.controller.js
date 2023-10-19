"use strict";
/**
 * import the required external modules and interfaces
 */
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
exports.fetchAddressBalances = void 0;
const balances_service_1 = require("./balances.service");
const balanceService = new balances_service_1.BalanceService();
function fetchAddressBalances(addresses) {
    return __awaiter(this, void 0, void 0, function* () {
        const balancePromises = addresses.map((address) => balanceService.fetchBalance(address));
        const balances = yield Promise.all(balancePromises);
        const balanceMap = {};
        for (const [index, balance] of balances.entries()) {
            if (balance === 'Invalid address') {
                balanceMap[`${addresses[index]}-is-an-invalid-address`] = "0";
            }
            else {
                balanceMap[addresses[index]] = balance;
            }
        }
        return balanceMap;
    });
}
exports.fetchAddressBalances = fetchAddressBalances;
