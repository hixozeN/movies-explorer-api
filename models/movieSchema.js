const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {},
    duration: {},
    year: {},
    description: {},
    image: {},
    trailerLink: {},
    thumbnail: {},
    owner: {},
    movieId: {},
    nameRU: {},
    nameEN: {},
  },
);

module.exports = model('movie', movieSchema);
