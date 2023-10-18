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

// define the Types of Address and Balance
type Address = string;
type Balance = string;

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
 * @param address: Address
 *
 */
export async function fetchBalance(address: Address): Promise<Balance> {
   let check = await validateAddress(address);
   if (!check) {
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
 * @param address: Address
 *
 */
const validateAddress = async (address: Address): Promise < boolean> => {
   if (address.includes(".")) {
      logger.info("Validating address given ENS: " + address);
      const ensAddress = await provider.resolveName(address)
      if (ensAddress) {
         return true;
      }
      return false;
   }
   logger.info("Validating address: " + address);
   return ethers.isAddress(address);
}
