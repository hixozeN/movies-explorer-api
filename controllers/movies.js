const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;
const Movie = require('../models/movieSchema');
const BadRequest = require('../utils/responsesWithError/BadRequest');
const NotFound = require('../utils/responsesWithError/NotFound');
const Forbidden = require('../utils/responsesWithError/Forbidden');
const { STATUS_CREATE_SUCCESS, NOT_FOUND_ID_ERROR, FORBIDDEN_ERROR } = require('../utils/globalVariables');

const createMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.status(STATUS_CREATE_SUCCESS).send({ data: movie }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((foundMovie) => {
      if (!foundMovie.owner.equals(req.user._id)) return next(new Forbidden(FORBIDDEN_ERROR));
      return Movie.deleteOne(foundMovie)
        .then(() => res.send({ message: `Фильм "${foundMovie.nameRU}" успешно удалён.` }));
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getSavedMovies,
  deleteMovie,
};
