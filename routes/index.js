const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../utils/responsesWithError/NotFound');
const { validateLogin, validateRegister } = require('../utils/validationConfig');

router.use('/users', auth, require('./userRouter'));
router.use('/movies', auth, require('./movieRouter'));

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegister, createUser);

router.use('*', auth, (req, res, next) => next(new NotFound('Указанный эндпоинт не найден.')));

module.exports = router;
