const userRouter = require('express').Router();
const { getCurrentUser, updateCurrentUser, } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateCurrentUser);

module.exports = userRouter;
