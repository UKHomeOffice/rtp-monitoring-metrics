'use strict';

module.exports = (app, basePath) => {
  const base = basePath || '';
  app.use(`${base}/metrics`, require('./lib/metrics'));
  app.use(`${base}/healthz`, require('./lib/healthcheck'));
  app.use(`${base}/readiness`, require('./lib/healthcheck'));
};
