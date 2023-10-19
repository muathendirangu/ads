"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.BalanceService = void 0;
/**
 *
 * import the required external dependencies and modules
 *
 */
const dotenv = __importStar(require("dotenv"));
const ethers_1 = require("ethers");
const logging_middleware_1 = require("./middleware/logging.middleware");
const formatNumber_1 = __importDefault(require("./utils/formatNumber"));
dotenv.config();
/**
 *
 * Balance Service Class
 *
 */
class BalanceService {
    constructor() {
        this.provider = new ethers_1.ethers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_API_KEY);
    }
    /**
     * Get the balance given an address
     * @param address: Address
     *
     */
    fetchBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.validateAddress(address);
            if (!check) {
                logging_middleware_1.logger.error(`Invalid address: ${address}`);
                return "Invalid address";
            }
            logging_middleware_1.logger.info(`Fetching balance for address: ${address}`);
            let balance = yield this.provider.getBalance(address);
            let formattedBalance = yield (0, formatNumber_1.default)(ethers_1.ethers.formatEther(balance));
            return formattedBalance;
        });
    }
    /**
     * Validate the address
     * @param address: Address
     *
     */
    validateAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address.includes(".")) {
                logging_middleware_1.logger.info("Validating address given ENS: " + address);
                const ensAddress = yield this.provider.resolveName(address);
                if (ensAddress) {
                    return true;
                }
                return false;
            }
            logging_middleware_1.logger.info("Validating address: " + address);
            return ethers_1.ethers.isAddress(address);
        });
    }
}
exports.BalanceService = BalanceService;
