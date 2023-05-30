const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');
const { LOGIN_ERROR, VALIDATION_EMAIL_ERROR } = require('../utils/globalVariables');

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: VALIDATION_EMAIL_ERROR,
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function checkPasswordOnLogin(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauthorized(LOGIN_ERROR));
      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(new Unauthorized(LOGIN_ERROR));
        return user;
      });
    });
};

module.exports = model('user', userSchema);
