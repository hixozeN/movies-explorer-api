const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный email',
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
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
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
      if (!user) return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
        return user;
      });
    });
};

module.exports = model('user', userSchema);
