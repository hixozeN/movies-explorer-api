const router = require('express').Router();
const { getMovie, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovie);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
