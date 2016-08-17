'use strict';

const router = require('express').Router();

function createRouter() {
  router.get('/metrics', require('./lib/metrics'));
  router.get('/healthz', require('./lib/healthcheck'));
  router.get('/readiness', require('./lib/healthcheck'));
  return router;
}

module.exports = createRouter();
