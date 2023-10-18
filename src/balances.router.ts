/**
 * import the required external modules and interfaces
 */
import express, {
   Router,
   Request,
   Response
} from 'express';

/**
 *
 * import the logging middleware
 *
 */
import {
   logger
} from './middleware/logging.middleware';

/**
 *
 * import the validation utils
 *
 */
import {
   isArray,
   isEmpty,
   containsEmptyString,
} from './utils/validateRequest';

/**
 *
 * import the fetch balances controller
 *
 */
import {
   fetchAddressBalances
} from './balances.controller';


/**
 * Router Definition
 */
export const balancesRouter: Router = express.Router();


/**
 * request handler definition
 */
// GET balances

balancesRouter.get('/', async (req: Request, res: Response) => {
   try {
      const {
         addresses
      } = req.body;

      let validationErrors: string[] = [];

      if (!isArray(addresses)) {
         validationErrors.push("request payload should be an json object containing an array of addresses named addresses");
      }
      if (isEmpty(addresses)) {
         validationErrors.push("addresses array should be not be empty");
      }

      if (containsEmptyString(addresses)) {
         validationErrors.push("address values provided should not be empty strings");
      }

      if (validationErrors.length > 0) {
          const errorMessage = `Invalid addresses: ${validationErrors.join(', ')}`;
      logger.info(`status:${400} => GET balances request failed error: ${errorMessage}`);
      res.status(400).send({
         "error": errorMessage,
      });
      return;
       }
      const response = await fetchAddressBalances(addresses);
      logger.info(`status:${res.statusCode} => GET all balances request completed successfully`);
      res.status(200).send(response);
      return
   } catch (error) {
      logger.error(`status:${500} => GET all balances request failed with error:${error}`);
      res.status(500).send(error);
      return
   }
});
