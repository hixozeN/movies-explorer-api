const router = require('express').Router();
const NotFound = require('../utils/responsesWithError/NotFound');

router.use('/users', require('./userRouter'));
router.use('/movies', require('./movieRouter'));

router.use('*', (req, res, next) => next(new NotFound('Указанный эндпоинт не найден.')));

module.exports = router;
