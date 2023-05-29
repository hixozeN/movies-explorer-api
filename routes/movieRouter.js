const movieRouter = require('express').Router();
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovie);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
