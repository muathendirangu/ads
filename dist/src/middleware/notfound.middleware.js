"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
/**
*  define the notfoundHandler function
* @param request
* @param response
* @param next
*/
const notFoundHandler = (request, response, next) => {
    response.status(404).send({ "error": "Resource not found" });
};
exports.notFoundHandler = notFoundHandler;
