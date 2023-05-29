require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { errors } = require('celebrate');
const responseHandler = require('./middlewares/responseHandler');

const router = require('./routes');
const { MONGO, PORT } = require('./utils/config');

const app = express();
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(express.json());

app.use(router);

app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => console.log('Server started on port:', PORT));
