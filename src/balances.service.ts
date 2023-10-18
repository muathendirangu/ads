/**
 *
 * import the required external dependencies and modules
 *
 */
import * as dotenv from 'dotenv';
import {
   ethers,
} from 'ethers';

import {
   logger
} from './middleware/logging.middleware';
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
export async function fetchBalance(address: string): Promise < string > {
   if (!validateAddress(address)) {
         logger.error(`Invalid address: ${address}`);
         return "Invalid address";
   }

   logger.info(`Fetching balance for address: ${address}`);
   let balance = await provider.getBalance(address);
   let formattedBalance = await formatNumber(ethers.formatEther(balance));

   return formattedBalance;
}


/**
 * Validate the address
 * @param address: string
 *
 */
const validateAddress = async (address: string): Promise < boolean > => {
   logger.info("Validating address: " + address);
   return ethers.isAddress(address);
}


