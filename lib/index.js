/**
 * @file http-verror
 * @module http-verror
 * @copyright Dr. Evil <dr.evil@krtn.eu> - 21/11/2014
 */

'use strict';

var WError = require('verror').WError,
    util   = require('util');

var httpErrors = {
    /**
     * HTTP status code 400
     *
     * @constructor
     * @name BadRequest
     * @memberOf errors
     */
    400: {
        name:        'BadRequest',
        description: 'Invalid data was sent to the server'
    },

    /**
     * HTTP status code 401
     *
     * @constructor
     * @name Unauthorized
     * @memberOf errors
     */
    401: {
        name:        'Unauthorized',
        description: 'You\'re not authorized to perform such action'
    },


    /**
     * HTTP status code 402
     *
     * @constructor
     * @name PaymentRequired
     * @memberOf errors
     */
    402: {
        name:        'PaymentRequired',
        description: ''
    },

    /**
     * HTTP status code 403
     *
     * @static
     * @name Forbidden
     * @memberOf errors
     */
    403: {
        name:        'Forbidden',
        description: 'You\'re not allowed to perform such action'
    },

    /**
     * HTTP status code 404
     *
     * @constructor
     * @name NotFound
     * @memberOf errors
     */
    404: {
        name:        'NotFound',
        description: 'Resource was not found'
    },

    /**
     * HTTP status code 405
     *
     * @constructor
     * @name MethodNotAllowed
     * @memberOf errors
     */
    405: {
        name:        'MethodNotAllowed',
        description: 'The method specified is not allowed for the requested resource'
    },

    /**
     * HTTP status code 406
     *
     * @constructor
     * @name NotAcceptable
     * @memberOf errors
     */
    406: {
        name:        'NotAcceptable',
        description: 'The resource identified by the request is only capable of generating response entities which' +
                     ' have content characteristics not acceptable according to the accept headers sent in the request.'
    },

    /**
     * HTTP status code 408
     *
     * @constructor
     * @name RequestTimeout
     * @memberOf errors
     */
    408: {
        name:        'RequestTimeout',
        description: 'The client did not produce a request within the time that the server was prepared to wait.'
    },

    /**
     * HTTP status code 409
     *
     * @constructor
     * @name Conflict
     * @memberOf errors
     */
    409: {
        name:        'Conflict',
        description: 'The request could not be completed due to a conflict with the current state of the resource.'
    },

    /**
     * HTTP status code 412
     *
     * @constructor
     * @name PreconditionFailed
     * @memberOf errors
     */
    412: {
        name:        'PreconditionFailed',
        description: 'The precondition given in one or more of the request-header fields evaluated to false when it' +
                     ' was tested on the server.'
    },

    /**
     * HTTP status code 415
     *
     * @constructor
     * @name UnsupportedMediaType
     * @memberOf errors
     */
    415: {
        name:        'UnsupportedMediaType',
        description: 'The server is refusing to service the request because the entity of the request is in a format' +
                     ' not supported by the requested resource for the requested method.'
    },

    /**
     * HTTP status code 500
     *
     * @constructor
     * @name InternalError
     * @memberOf errors
     */
    500: {
        name:        'InternalError',
        description: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    },

    /**
     * HTTP status code 501
     *
     * @constructor
     * @name NotImplemented
     * @memberOf errors
     */
    501: {
        name:        'NotImplemented',
        description: 'The server does not support the functionality required to fulfill the request.'
    },

    /**
     * HTTP status code 502
     *
     * @constructor
     * @name BadGateway
     * @memberOf errors
     */
    502: {
        name:        'BadGateway',
        description: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream' +
                     ' server it accessed in attempting to fulfill the request.'
    },

    /**
     * HTTP status code 503
     *
     * @constructor
     * @name ServiceUnavailable
     * @memberOf errors
     */
    503: {
        name:        'ServiceUnavailable',
        description: 'The server is currently unable to handle the request due to a temporary overloading or' +
                     ' maintenance of the server.'
    },

    /**
     * HTTP status code 504
     *
     * @constructor
     * @name GatewayTimeout
     * @memberOf errors
     */
    504: {
        name:        'GatewayTimeout',
        description: 'The server did not receive a timely response from the upstream server.'
    }
};

/**
 * @private
 * @constructor
 * @name HttpError
 * @augments WError
 *
 * @param {Number} code
 *
 * @returns {HttpError}
 */
function HttpError (code) {
    this.statusCode = code;

    if (arguments.length < 2)
        WError.call(this, httpErrors[this.statusCode].description);
    else
        WError.apply(this, Array.prototype.slice.call(arguments, 1));

    return this;
}
util.inherits(HttpError, WError);

/**
 * @private
 * @class
 * @name E
 * @param {Number} code HTTP status code
 * @returns {HttpError}
 * @constructor
 */
function E (code) {
    return HttpError.bind(this, code);
}

/**
 * @class errors
 * @name errors
 */
var errors = {};

Object.keys(httpErrors).forEach(function (errorCode) {
    var error = httpErrors[errorCode];
    errors[error.name] = new E(+errorCode);
});

errors.HttpError = HttpError;

module.exports = exports = errors;