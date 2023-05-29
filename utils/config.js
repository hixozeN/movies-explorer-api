const rateLimit = require('express-rate-limit');

const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const MONGO = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/mestodb';
const PORT = process.env.PORT || 3000;
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
};
const LIMITER = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  SECRET, MONGO, PORT, LIMITER, MONGO_OPTIONS,
};
