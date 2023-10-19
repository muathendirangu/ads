"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balancesRouter = void 0;
/**
 * import the required external modules and interfaces
 */
const express_1 = __importDefault(require("express"));
/**
 *
 * import the logging middleware
 *
 */
const logging_middleware_1 = require("./middleware/logging.middleware");
/**
 *
 * import the validation utils
 *
 */
const validateRequest_1 = require("./utils/validateRequest");
/**
 *
 * import the fetch balances controller
 *
 */
const balances_controller_1 = require("./balances.controller");
/**
 * Router Definition
 */
exports.balancesRouter = express_1.default.Router();
/**
 * request handler definition
 */
// GET balances
exports.balancesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { addresses } = req.body;
        let validationErrors = { errors: [] };
        if (!(0, validateRequest_1.isArray)(addresses)) {
            validationErrors.errors.push("request payload should be an json object containing an array of addresses named addresses");
        }
        if ((0, validateRequest_1.isEmpty)(addresses)) {
            validationErrors.errors.push("addresses array should be not be empty");
        }
        if ((0, validateRequest_1.containsEmptyString)(addresses)) {
            validationErrors.errors.push("address values provided should not be empty strings");
        }
        if (validationErrors.errors.length > 0) {
            const errorMessage = `Invalid addresses: ${validationErrors.errors.join(', ')}`;
            logging_middleware_1.logger.info(`status:${400} => GET balances request failed error: ${errorMessage}`);
            res.status(400).send({
                "error": errorMessage,
            });
            return;
        }
        const response = yield (0, balances_controller_1.fetchAddressBalances)(addresses);
        logging_middleware_1.logger.info(`status:${res.statusCode} => GET all balances request completed successfully`);
        res.status(200).send(response);
        return;
    }
    catch (error) {
        logging_middleware_1.logger.error(`status:${500} => GET all balances request failed with error:${error}`);
        res.status(500).send(error);
        return;
    }
}));
