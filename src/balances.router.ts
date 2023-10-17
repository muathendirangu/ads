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
 import {
    fetchBalance
 } from './balances.service';

 /**
  * Router Definition
  */
 export const balancesRouter: Router = express.Router();
 /**
  * request handlers definitions
  */
 // GET balances

 balancesRouter.get('/', async (req: Request, res: Response) => {
    try {
       const balanceMap: Record < string, string > = {};
       const {
          addresses
       } = req.body;
       if (!Array.isArray(addresses) && addresses.length != 0) {
          logger.info(`status:${400} => GET balances request failed error: Kindly provide at least one address as an array`);
          res.status(400).send({
             "error": "Kindly provide at least one address as an array"
          });
          return

       } else {
          addresses.forEach(async (address: string) => {
             const balance = await fetchBalance(address);
             balanceMap[address] = balance;
          });
       }
       logger.info(`status:${res.statusCode} => GET all balances request completed successfully`);
       res.status(200).send(balanceMap);
       return
    } catch (error) {
       logger.error(`status:${res.statusCode} => GET all balances request failed with error:${error}`);
       res.status(500).send(error);
       return
    }
 });
