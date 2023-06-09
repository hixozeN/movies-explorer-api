const rateLimit = require('express-rate-limit');

const { NODE_ENV } = process.env;
const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const MONGO = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/bitfilmsdb';
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

const prodOrigins = [
  'https://diploma.hixozen.ru',
  'http://diploma.hixozen.ru',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
];

const devOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://diploma.hixozen.ru',
  'http://diploma.hixozen.ru',
];

const GLOBAL_CONFIG = {
  cors: {
    allowOrigins: NODE_ENV === 'production'
      ? prodOrigins
      : devOrigins,
  },
};

module.exports = {
  SECRET, MONGO, PORT, LIMITER, MONGO_OPTIONS, GLOBAL_CONFIG,
};
