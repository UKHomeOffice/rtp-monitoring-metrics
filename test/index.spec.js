'use strict';

const expect = require('chai').expect;
const index = require('./../index');

describe('index', function () {

  it('should export a function', function() {
    expect(index).to.be.a('function');
  });

  it('should add expected routes to the exported router function', function() {
    function routeExists(path) {
      return index.stack.some(function(routeEntry) {
        return routeEntry.route.path === path;
      });
    }
    expect(index.stack).to.be.length(3);
    expect(routeExists('/metrics')).to.be.true;
    expect(routeExists('/healthz')).to.be.true;
    expect(routeExists('/readiness')).to.be.true;
  });

});
