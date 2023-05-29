const movieRouter = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateNewMovie } = require('../utils/validationConfig');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', validateNewMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
