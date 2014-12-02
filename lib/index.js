/**
 * @file http-verror
 * @copyright Dr. Evil <dr.evil@krtn.eu> - 21/11/2014
 */

'use strict';

var WError = require('verror').WError,
    util   = require('util');

function HttpError (code) {
    this.statusCode = code;

    if (arguments.length < 2)
        WError.call(this, errors[this.statusCode].description);
    else {
        WError.apply(this, Array.prototype.slice.call(arguments, 1));
    }

    return this;
}
util.inherits(HttpError, WError);

function E (code) {
    return HttpError.bind(this, code);
}

var errors = {
    400: { name: 'BadRequest', description: 'Invalid data was sent to the server' },
    401: { name: 'Unauthenticated', description: 'You\'re not authorized to perform such action' },
    403: { name: 'Forbidden', description: 'You\'re not allowed to perform such action' },
    404: { name: 'NotFound', description: 'Resource was not found' },
    409: { name: 'Conflict', description: 'Item exists or dependency absent' },
    500: { name: 'InternalError', description: 'Unexpected internal error' },
    502: { name: 'BadGateway', description: 'Bad gateway' },
    503: { name: 'Unavailable', description: 'Not available' },
    504: { name: 'GatewayTimeout', description: 'Gateway time-out' }
}, exports = {};

Object.keys(errors).forEach(function (errorCode) {
    var error = errors[errorCode];
    exports[error.name] = new E(+errorCode);
});

module.exports = exports;