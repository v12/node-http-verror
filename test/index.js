'use strict';

var expect = require('expect.js'),
    errors = require('../lib');

describe('General', function () {
    it('should return an object with error functions', function () {

    });

    it('should return wrapped error with status 400 (BadRequest) and default message', function () {
        var e = new errors.BadRequest();

        expect(e.statusCode).to.be.equal(400);
        expect(e.message).to.be.equal('Invalid data was sent to the server');
    });

    it('should return Forbidden (403) error with preceding error', function () {
        var e = new errors.Forbidden(new Error('test error'), 'we don\'t show that it was test error');

        expect(e.statusCode).to.be.equal(403);
        expect(e.message).to.be.equal('we don\'t show that it was test error');
        expect(e.cause().message).to.be.equal('test error');
    });
});