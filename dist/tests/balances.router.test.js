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
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("./testUtils");
describe("Fetch Balances Router module tests", () => {
    describe("Retrieve balances successfully", () => {
        it("should return balances for valid address", () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield (0, testUtils_1.getAddressesBalance)(["0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d"]);
            balances.should.be.a("object");
            balances.should.contain({ "0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d": "18.8519" });
        }));
    });
    describe("Retrieve balances unsuccessfully", () => {
        it("should return error for invalid address", () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield (0, testUtils_1.getAddressesBalance)(["0xd8dA6BF26964334aF9D7eEd9e03E53415D37aA96045"]);
            balances.should.be.a("object");
            balances.should.contain({ "0xd8dA6BF26964334aF9D7eEd9e03E53415D37aA96045-is-an-invalid-address": "0" });
        }));
        it("should return error for invalid ENS name", () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield (0, testUtils_1.getAddressesBalance)(["charles.etfsddfh"]);
            balances.should.be.a("object");
            balances.should.contain({ "charles.etfsddfh-is-an-invalid-address": "0" });
        }));
        it("should return error for empty addresses array", () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield (0, testUtils_1.getAddressesBalance)([]);
            balances.should.be.a("object");
            balances.should.contain({ error: "Invalid addresses: addresses array should be not be empty" });
        }));
        it("should return error for addresses array containing empty string values", () => __awaiter(void 0, void 0, void 0, function* () {
            const balances = yield (0, testUtils_1.getAddressesBalance)([""]);
            balances.should.be.a("object");
            balances.should.contain({ error: "Invalid addresses: address values provided should not be empty strings" });
        }));
    });
});
