const userRouter = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUpdatedUserData } = require('../utils/validationConfig');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUpdatedUserData, updateCurrentUser);

module.exports = userRouter;
