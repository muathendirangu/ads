# address-balance
A web server to fetch address balances either via an address or an ENS(Ethereum Name Service) domain name.

# You can test application in the following ways
   1. Using Postman
   2. Running locally and testing vial curl.
   3. Import postman.json to directly to postman(contained in the root folder of the repo).
   4. There is also an openapi.yaml file that can be imported too other HTTP clients like Insomnia by making HTTP requests to the API endpoints described in the OpenAPI specification.

## 1. Using Postman
    - If you have postman installed locally you can click the button below to open the collection in Postman
        [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3655747-ab738743-c5bd-434e-9c3d-73793725aa4c?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D3655747-ab738743-c5bd-434e-9c3d-73793725aa4c%26entityType%3Dcollection%26workspaceId%3D179387e0-c762-408d-9697-3e37633b91ca#?env%5Bbalance%20service%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL2FkZHJlc3MtYmFsYW5jZS1wcm9kdWN0aW9uLnVwLnJhaWx3YXkuYXBwLyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9hZGRyZXNzLWJhbGFuY2UtcHJvZHVjdGlvbi51cC5yYWlsd2F5LmFwcC8iLCJzZXNzaW9uSW5kZXgiOjB9XQ==)


## 2. Running locally and testing via curl

To get started:

1. first clone the repo using `git clone https://github.com/muathendirangu/address-balance.git`.
2. access directory `cd address-balance`.
3. Install dependencies `npm install`
4. Start the server `npm start`

The API will be running on port 9000 by default. You can access the API in your browser using the following URL:

http://localhost:9000

# Endpoints

The API has one endpoints:

1. `/api/balances` - Get a map containing address balances given a list of addresses.


# Testing via curl

The following example shows how to get all balances belonging to a list of addresses provided:

> ** Sample Request
```
curl --location 'http://localhost:9000/api/balances'
```

```
{
    "addresses": [
        "james.eth",
        "kevin.eth",
        "sam.eth",
        "keneth",
        "455656",
         "0xd8dA6BF26964334aF9D7eEd9e03E53415D37aA96045",
        "vitalik.eth",
        "0x4687466ac9bD165cA3bF2F6b6446822560b9fC3d",
        "michael.eth",
        "12"
    ]
}

```
> **Response

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

# To run Integration Tests
To run test run the command
> Run the following command on the terminal: `npm test`

## Technologies used
 1. TypeScript - for type safety and compile-time type checking
 1. Node.js runtime
 2. Express.js - for running the web server
 3. Winston library - for logging
 4. Chai and ChaiHTTP for integration testing of the endpoints.
 5. Ethers js library together with Alchemy as a provider for interacting with Ethereum blockchain like fetching balances from addresses.
 6. Github Actions for continuous integration and deployment to Railway
 7. Railway for hosting the web server

