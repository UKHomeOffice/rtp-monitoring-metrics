'use strict';

module.exports = (req, res, next) => {
  res.status(req.session ? 200 : 500);
  res.json({
    app: 'OK',
    session: req.session ? 'OK' : 'unavailable'
  });
};
