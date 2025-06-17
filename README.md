# My Node API

This project is a simple Node.js API that retrieves address information based on Brazilian postal codes (CEPs) using the ViaCEP API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-node-api.git
   ```

2. Navigate to the project directory:
   ```
   cd my-node-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoint

To retrieve address information by CEP, send a GET request to the following endpoint:

```
GET /cep/:cep
```

Replace `:cep` with the desired postal code. For example:
```
GET /cep/01001-000
```

The response will contain the address information in JSON format.

## License

This project is licensed under the MIT License.