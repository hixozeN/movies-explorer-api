const movieRouter = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getSavedMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
