const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const { ValidationError } = mongoose.Error;
const User = require('../models/userSchema');
const NotFound = require('../utils/responsesWithError/NotFound');
const BadRequest = require('../utils/responsesWithError/BadRequest');
const Dublicate = require('../utils/responsesWithError/Duplicate');
const { NOT_FOUND_ID_ERROR, STATUS_CREATE_SUCCESS, DUBLICATED_USER_ERROR } = require('../utils/globalVariables');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(STATUS_CREATE_SUCCESS).send({ email, name }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Dublicate(DUBLICATED_USER_ERROR));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((userData) => res.send({ data: userData }))
    .catch((err) => next(err));
};

const updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, getCurrentUser, login, updateCurrentUser,
};
