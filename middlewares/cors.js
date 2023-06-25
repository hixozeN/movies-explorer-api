const config = require('../utils/config');

function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (config.cors.allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', config.cors.allowMethods.join(','));
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
}

module.exports = cors;
