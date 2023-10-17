/**
 *
 * import the required external dependencies and modules
 *
 */
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import formatNumber from './utils/formatNumber';
dotenv.config();

/**
 *
 * initialize the provider
 *
 * @constructor
 * @param network: string
 * @param apiKey: string
 *
 */
const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
);


/**
 * Get the balance given an address
 * @param address: string
 *
 */


export async function fetchBalance(address:string): Promise<string> {
    if (validateAddress(address)){
        throw new Error("Invalid address");
    }

    let balance =  await provider.getBalance(address);
    let formattedBalance = await formatNumber(balance);
    return formattedBalance;
}


/**
 * Validate the address
 * @param address: string
 *
 */
const validateAddress = (address:string): boolean => {
    return ethers.isAddress(address);
}
