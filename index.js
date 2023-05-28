require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGO, PORT } = require('./utils/config');

mongoose.set('strictQuery', false);
mongoose.connect(MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

const app = express();
app.use(cors);

app.use(express.json());

app.listen(PORT, () => console.log('Server started on port:', PORT));
