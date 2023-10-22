# address-balance
A web server to fetch address balances either via an address or an ENS(Ethereum Name Service) domain name.

## You can run and test application in the following ways
   1. Testing locally via curl
   2. Testing via postman
   3. Running integration tests

### 1. Testing locally via curl

To get started:

1. first clone the repo using `git clone https://github.com/muathendirangu/address-balance.git`.
2. access directory `cd address-balance`.
3. Rename `.env.example` to .`.env` and update the environment variables(for the network you can default to `homestead` but for the API key you need to create an alchemy app and grab the API key from the settings section and update on the `.env` file)
4. Install dependencies `npm install`
5. Start the server `npm start`


##### base url
   1. http://localhost:9000 (testing when the web server is running locally)
   2.  https://address-balance-production.up.railway.app (testing using hosted web server)

#### Endpoints

The API has one endpoints:

1. `/api/balances` - Get a map containing address balances given a list of addresses.


#### Sample Request via curl

The following example shows how to get all balances belonging to a list of addresses provided:

##### Request
```
curl --location --request GET 'http://localhost:9000/api/balances' \
--data '{
    "addresses": [
        "james.eth",
        "kevin.eth",
        "sam.eth",
        "keneth",
        "455656",
         "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "vitalik.eth",
        "0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d",
        "michael.eth",
        "12"
    ]
}'

```
 ##### Response

```
{
    "james.eth": "1.543",
    "kevin.eth": "0.7371",
    "sam.eth": "0.0084",
    "keneth-is-an-invalid-address": "0",
    "455656-is-an-invalid-address": "0",
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": "935.143",
    "vitalik.eth": "935.143",
    "0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d": "18.8519",
    "michael.eth": "18.8519",
    "12-is-an-invalid-address": "0"
}
```
### 2. Testing via postman
 1. Import API collection json file(postman.json) to directly to postman(The file is in the root folder)
 2. Once the collection is successfully imported, you can test the API using the collection in Postman.
 3. Just replace the `{{url}}` bit with `https://address-balance-production.up.railway.app` to point to the server hosted on Railway.


### 3. Running integration tests

> Run the following command on the terminal: `npm test`

#### Technologies used
 1. `TypeScript` - for type safety and compile-time type checking
 1. `Node.js` runtime
 2. `Express.js` - for running the web server
 3. `Winston` library - for logging
 4. `Chai` and `ChaiHTTP` for integration testing of the endpoints.
 5. `Ethers js` library together with `Alchemy` as a provider for interacting with Ethereum blockchain.
 6. `Github Actions` for continuous integration and deployment to Railway
 7. `Railway` for hosting the web server

