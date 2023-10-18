import { app } from "../src";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

export async function getAddressesBalance(addresses: any) {
    const response = await chai.request(app).get("/api/balances").send({ addresses });
    return response.body;
  }
