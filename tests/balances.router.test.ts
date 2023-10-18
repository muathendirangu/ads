
import { getAddressesBalance } from "./testUtils";

describe("Fetch Balances Router module tests", () => {
  describe("Retrieve balances successfully", () => {
    it("should return balances for valid address", async () => {
      const balances = await getAddressesBalance(["0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d"]);

      balances.should.be.a("object");
      balances.should.contain({ "0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d": "18.8519" });
    });
  });

  describe("Retrieve balances unsuccessfully", () => {
    it("should return error for invalid address", async () => {
      const balances = await getAddressesBalance(["0xd8dA6BF26964334aF9D7eEd9e03E53415D37aA96045"]);

      balances.should.be.a("object");
      balances.should.contain({ "0xd8dA6BF26964334aF9D7eEd9e03E53415D37aA96045-is-an-invalid-address": "0" });
    });

    it("should return error for invalid ENS name", async () => {
      const balances = await getAddressesBalance(["charles.etfsddfh"]);

      balances.should.be.a("object");
      balances.should.contain({ "charles.etfsddfh-is-an-invalid-address": "0" });
    });

    it("should return error for empty addresses array", async () => {
      const balances = await getAddressesBalance([]);

      balances.should.be.a("object");
      balances.should.contain({ error: "Invalid addresses: addresses array should be not be empty" });
    });

    it("should return error for addresses array containing empty string values", async () => {
      const balances = await getAddressesBalance([""]);

      balances.should.be.a("object");
      balances.should.contain({ error: "Invalid addresses: address values provided should not be empty strings" });
    });
  });
});


