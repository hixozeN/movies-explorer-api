require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const responseHandler = require('./middlewares/responseHandler');

const router = require('./routes');
const {
  MONGO,
  PORT,
  LIMITER,
  MONGO_OPTIONS,
} = require('./utils/config');

const app = express();
app.use(cors);
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, MONGO_OPTIONS);

// защита
app.use(LIMITER);
app.use(helmet());
// логи реквестов
app.use(requestLogger);
// маршруты
app.use(router);
// логи ошибок
app.use(errorLogger);
// обработка ошибок
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => console.log('Server started on port:', PORT));
