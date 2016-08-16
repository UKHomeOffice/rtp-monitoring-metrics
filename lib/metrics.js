'use strict';

const pidusage = require('pidusage');

module.exports = (req, res, next) => {
  pidusage.stat(process.pid, (err, stat) => {
    if (err) {
      res.status(500);
      return res.json({error: `Error occurred obtaining PID stats: ${err}`});
    }
    res.json({
      cpu: stat.cpu,
      memory: process.memoryUsage()
    });
  });
};
