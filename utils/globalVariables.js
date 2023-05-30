// статусы
const STATUS_CREATE_SUCCESS = 201;
const STATUS_DUBLICATE = 11000;
// ответы
const NOT_FOUND_ERROR = 'Указанный эндпоинт не найден.';
const NOT_FOUND_ID_ERROR = 'Ресурс с таким ID не найден.';
const DUBLICATED_USER_ERROR = 'Пользователь с таким email уже зарегистрирован';
const FORBIDDEN_ERROR = 'Недостаточно прав.';
const TOKEN_ERROR = 'С токеном что-то не так...';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка.';
const LOGIN_ERROR = 'Неправильная почта или пароль';
const VALIDATION_URL_ERROR = 'Некорректный URL';
const VALIDATION_EMAIL_ERROR = 'Некорректный email';

module.exports = {
  STATUS_CREATE_SUCCESS,
  STATUS_DUBLICATE,
  NOT_FOUND_ERROR,
  NOT_FOUND_ID_ERROR,
  DUBLICATED_USER_ERROR,
  FORBIDDEN_ERROR,
  TOKEN_ERROR,
  INTERNAL_SERVER_ERROR,
  LOGIN_ERROR,
  VALIDATION_URL_ERROR,
  VALIDATION_EMAIL_ERROR,
};
