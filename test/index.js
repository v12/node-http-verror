'use strict';

/* jshint mocha:true */

var errors = require('../lib'),
    expect = require('chai').expect;

describe('http-verror', function () {
    it('should return an object with error functions', function () {
        expect(errors).to.be.an('object');
    });

    it('should return wrapped error with status 400 (BadRequest) and default message', function () {
        var e = new errors.BadRequest();

        expect(e).to.have.all.keys('statusCode', 'message');

        expect(e.statusCode).to.equal(400);
        expect(e.message).to.equal('Invalid data was sent to the server');
    });

    it('should return Forbidden (403) error with preceding error', function () {
        var e = new errors.Forbidden(new Error('test error'), 'we don\'t show that it was test error');

        expect(e.statusCode).to.equal(403);
        expect(e.message).to.equal('we don\'t show that it was test error');

        expect(e.cause().message).to.equal('test error');
    });

    it('should return Forbidden (403) error with preceding error with default message', function () {
        var e = new errors.Forbidden(new Error('test error'));

        expect(e.statusCode).to.equal(403);
        expect(e.message).to.equal('You\'re not allowed to perform such action');

        expect(e.cause().message).to.equal('test error');
    });

    it('should be an instance of HttpError, which is publicly exposed', function () {
        expect(new errors.BadRequest()).to.be.an.instanceof(errors.HttpError);
        expect(new errors.NotFound()).to.be.an.instanceof(errors.HttpError);
    });
});
