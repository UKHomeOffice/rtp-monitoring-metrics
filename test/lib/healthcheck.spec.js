'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const healthcheck = require('./../../lib/healthcheck');

describe('healthcheck', function() {

  let req;
  let res;

  beforeEach(function() {
    req = {};
    res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
  });

  it('should export a function', function() {
    expect(healthcheck).to.be.a.function;
  });

  describe('when session is ok', function() {

    beforeEach(function() {
      req.session = 'defined';
    });

    it('should send json response with healthcheck', function() {
      const expectedHealthcheck = {
        app: 'OK',
        session: 'OK'
      };
      healthcheck(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(res.json).to.be.calledWith(expectedHealthcheck);
    });

  });

  describe('when session is unavailable', function() {
    const expectedHealthcheck = {
      app: 'OK',
      session: 'unavailable'
    };
    it('should send json response with healthcheck', function() {
      healthcheck(req, res);
      expect(res.status).to.be.calledWith(503);
      expect(res.json).to.be.calledWith(expectedHealthcheck);
    });

  });

});
