'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const proxyquire = require('proxyquire').noCallThru();

describe('metrics', function() {

  let metrics;
  let mockPidUsage;
  let req;
  let res;

  beforeEach(function() {
    mockPidUsage = {
      stat: sinon.stub()
    };
    metrics = proxyquire('./../../lib/metrics', {
      'pidusage': mockPidUsage
    });
    req = {};
    res = {
      status: sinon.stub(),
      json: sinon.spy()
    };
  });

  it('should export a function', function() {
    expect(metrics).to.be.a.function;
  });

  describe('when pidusage succeeds', function() {

    let originalProcessMemoryUsage;
    let cpu = 1.5;
    let memory = 1234567;

    before(function() {
      originalProcessMemoryUsage = process.memoryUsage;
    });

    beforeEach(function() {
      mockPidUsage.stat.yields(null, {cpu: cpu});
      process.memoryUsage = sinon.stub().returns(memory);
    });

    after(function() {
      process.memoryUsage = originalProcessMemoryUsage;
    });

    it('should send json response with stats', function() {
      const expectedStats = {
        cpu: cpu,
        memory: memory
      };
      metrics(req, res);
      expect(res.json).to.be.calledWith(expectedStats);
    });

  });

  describe('when pidusage errors', function() {

    let error = 'pidusage error';

    beforeEach(function() {
      mockPidUsage.stat.yields(error, null);
    });

    it('should response with 500 showing error', function() {
      const expected = {
        error: `Error occurred obtaining PID stats: ${error}`
      };
      metrics(req, res);
      expect(res.status).to.be.calledWith(500);
      expect(res.json).to.be.calledWith(expected);
    });

  });

});
