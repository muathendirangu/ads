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

import {
   Address,
   Balance,
   IsValidAddress
} from './balances.types';

dotenv.config();


/**
 *
 * Balance Service Class
 *
 */
export class BalanceService {

   private provider: ethers.AlchemyProvider;

   constructor() {
      this.provider = new ethers.AlchemyProvider(
         process.env.NETWORK,
         process.env.ALCHEMY_API_KEY
      );
   }

   /**
    * Get the balance given an address
    * @param address: Address
    *
    */
   async fetchBalance(address: Address): Promise<Balance> {
      let check = await this.validateAddress(address);
      if (!check) {
         logger.error(`Invalid address: ${address}`);
         return "Invalid address";
      }

      logger.info(`Fetching balance for address: ${address}`);
      let balance = await this.provider.getBalance(address);
      let formattedBalance = await formatNumber(ethers.formatEther(balance));

      return formattedBalance;
   }

   /**
    * Validate the address
    * @param address: Address
    *
    */
   private async validateAddress(address: Address): Promise <IsValidAddress> {
      if (address.includes(".")) {
         logger.info("Validating address given ENS: " + address);
         const ensAddress = await this.provider.resolveName(address)
         if (ensAddress) {
            return true;
         }
         return false;
      }
      logger.info("Validating address: " + address);
      return ethers.isAddress(address);
   }
}
