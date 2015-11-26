## DEPRECATED
> Please note that this package has been deprecated in favour of [boom](https://github.com/hapijs/boom)
>
> It means that current repository is no longer being maintained

<hr>

# http-verror - VError adaptation for usage with Express.js

[![Build Status](https://travis-ci.org/v12/node-http-verror.svg)](https://travis-ci.org/v12/node-http-verror) [![Test Coverage](https://codeclimate.com/github/v12/node-http-verror/badges/coverage.svg)](https://codeclimate.com/github/v12/node-http-verror) [![Dependency Status](https://david-dm.org/v12/node-http-verror.svg)](https://david-dm.org/v12/node-http-verror)

## Installation
```npm install http-verror --save```

## Usage
http-verror instance inherits all properties of [WError](https://github.com/davepacheco/node-verror#werror-wrap-layered-errors). In other words, http-verror is a WError but with `statusCode` property being equal to the HTTP status code of the error you created.

### Example
```javascript
var errors = require('http-verror');

var err = new errors.Forbidden();

console.log(err.statusCode); // 403
console.log(err.message); // You're not allowed to perform such action

var err2 = new errors.InternalError(new Error('Some preceding error with internal data'), 'Brief error desc');

console.log(err2.statusCode); // 500
console.log(err2.message); // Brief error desc
console.log(err2.cause().message); // Some preceding error with internal data
console.log(err2.toString()); // HttpError: Brief error desc; caused by Error: Some preceding error with internal data
```

### Errors
| Status code | Name                   |
| :---------: | ---------------------- |
| 400         | BadRequest             |
| 401         | Unauthorized           |
| 402         | PaymentRequired        |
| 403         | Forbidden              |
| 404         | NotFound               |
| 405         | MethodNotAllowed       |
| 406         | NotAcceptable          |
| 408         | RequestTimeout         |
| 409         | Conflict               |
| 412         | PreconditionFailed     |
| 415         | UnsupportedMediaType   |
| 500         | InternalError          |
| 501         | NotImplemented         |
| 502         | BadGateway             |
| 503         | ServiceUnavailable     |
| 504         | GatewayTimeout         |
