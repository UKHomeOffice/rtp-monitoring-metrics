'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const index = require('./../index');

describe('index', function () {

  let app;

  beforeEach(function() {
    app = {
      use: sinon.stub()
    };
  });

  it('should set middleware functions on app', function() {
    index(app);
    expect(app.use).to.be.calledWith('/metrics', require('./../lib/metrics'));
    expect(app.use).to.be.calledWith('/healthz', require('./../lib/healthcheck'));
    expect(app.use).to.be.calledWith('/readiness', require('./../lib/healthcheck'));
  });

  it('should use the base path if specified', function() {
    let basePath = '/my-base';
    index(app, basePath);
    expect(app.use).to.be.calledWith(`${basePath}/metrics`);
    expect(app.use).to.be.calledWith(`${basePath}/healthz`);
    expect(app.use).to.be.calledWith(`${basePath}/readiness`);
  });

});
