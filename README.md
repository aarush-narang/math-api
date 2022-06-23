# GraphQL Math API

Created using NodeJS, this API has several math functions including operations such as solving quadratics and cubics to generating points around parameters.

## Installation

When cloned, run

```bash
npm i
```

to install all dependencies in the `package.json`

### Dependencies

- apollo-server
- cors
- dotenv
- express
- express-graphql
- graphql
- ml-regression-polynomial
- nodemon

## How to Use

To start the server, run

```bash
npm run dev
```

You can then go to `localhost:3001/graphql` to access the GraphQL GUI. To make requests, URL-encode a standard graphql request [(see)](https://graphql.org/learn/best-practices/) and insert it in the URL query parameter. Form: `localhost:3000/graphql?query=(YOUR URL-ENCODED QUERY HERE)`

Ex:

<u>Encoded:</u>
```
http://localhost:3001/graphql?query=query%20%7B%0A%20%20getStats(values%3A%20%5B1%2C%202%2C%203%2C%204%2C%205%5D)%20%7B%0A%20%20%20%20median%0A%20%20%7D%0A%7D
```

<u>Decoded:</u>
```
http://localhost:3001/graphql?query=query {
  getStats(values: [1, 2, 3, 4, 5]) {
    median
  }
}
```
Which includes the query:
```
query {
  getStats(values: [1, 2, 3, 4, 5]) {
    median
  }
}
```
[See other ways to create requests](https://graphql.org/learn/serving-over-http/)
