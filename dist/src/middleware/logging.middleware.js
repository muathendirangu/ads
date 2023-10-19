"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/**
 * import the required external modules and interfaces
 */
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, json } = winston_1.default.format;
function createLogger(config) {
    return winston_1.default.createLogger({
        levels: config.levels,
        format: config.format,
        defaultMeta: config.defaultMeta,
        transports: config.transports,
        exceptionHandlers: config.exceptionHandlers,
    });
}
const loggerConfig = {
    levels: winston_1.default.config.syslog.levels,
    format: combine(timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }), json()),
    defaultMeta: { component: 'balance-service' },
    transports: [new winston_1.default.transports.Console()],
    exceptionHandlers: [
        new winston_1.default.transports.Console(),
    ]
};
exports.logger = createLogger(loggerConfig);
