/**
 * import the required external modules and interfaces
 */
import express, {
    Router,
    Request,
    Response
} from 'express';
import {
    v4 as uuidv4,
} from 'uuid';

import {
    Balance
} from './balance.interface';

/**
 *
 * import the logging middleware
 *
 */
import {
    logger
} from './middleware/logging.middleware';

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

        logger.info(`status:${res.statusCode} => GET all balances request completed successfully`);
        res.status(200).send({
            "balance":12
        });
        return
    } catch (error) {
        logger.error(`status:${res.statusCode} => GET all balances request failed with error:${error}`);
        res.status(500).send(error);
        return
    }
});
