'use strict';

/* jshint mocha:true */

var assert = require('assert'),
    errors = require('../lib');

describe('General', function () {
    it('should return an object with error functions', function () {

    });

    it('should return wrapped error with status 400 (BadRequest) and default message', function () {
        var e = new errors.BadRequest();

        assert.strictEqual(e.statusCode, 400);
        assert.strictEqual(e.message, 'Invalid data was sent to the server');
    });

    it('should return Forbidden (403) error with preceding error', function () {
        var e = new errors.Forbidden(new Error('test error'), 'we don\'t show that it was test error');

        assert.strictEqual(e.statusCode, 403);
        assert.strictEqual(e.message, 'we don\'t show that it was test error');
        assert.strictEqual(e.cause().message, 'test error');
    });
});